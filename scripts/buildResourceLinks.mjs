#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '../src/data/resource-directory.raw.json');
const outputPath = path.join(__dirname, '../src/data/resource-links.json');

// Read raw data
const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Transform and clean
const cleaned = rawData
  .filter(row => row.status === 'active')
  .filter(row => row.slug && row.title && row.org_name)
  .map(row => ({
    slug: row.slug,
    title: row.title,
    category: row.category,
    org_name: row.org_name,
    url: row.org_website && /^https?:\/\//.test(row.org_website) ? row.org_website : null,
    coverage: computeCoverage(row),
    summary: normalizeSummary(row.summary || row.details),
    verification: row.verification,
    last_verified_at: row.last_verified_at
  }));

// Sort by category, org_name, title
cleaned.sort((a, b) => {
  const catCmp = (a.category || '').localeCompare(b.category || '');
  if (catCmp !== 0) return catCmp;
  const orgCmp = a.org_name.localeCompare(b.org_name);
  if (orgCmp !== 0) return orgCmp;
  return a.title.localeCompare(b.title);
});

// Write output
fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2) + '\n');
console.log(`Wrote ${cleaned.length} entries to src/data/resource-links.json`);

// --- Helpers ---

function computeCoverage(row) {
  if (row.is_national) {
    return 'National';
  }

  const zips = row.zips || [];
  const states = row.state_codes || [];

  if (zips.length > 0) {
    const stateLabel = states.length > 0 ? states[0] : 'Multi-State';
    const zipList = zips.slice(0, 3).join(', ');
    const ellipsis = zips.length > 3 ? ', …' : '';
    return `${stateLabel} • ZIP ${zipList}${ellipsis}`;
  }

  if (states.length > 0) {
    const stateList = states.slice(0, 6).join(', ');
    const ellipsis = states.length > 6 ? ', …' : '';
    return `${stateList}${ellipsis}`;
  }

  const serviceAreas = row.service_areas || [];
  if (serviceAreas.length > 0) {
    const sa = serviceAreas[0];
    const parts = [];
    if (sa.city_name) parts.push(sa.city_name);
    if (sa.state_code) parts.push(sa.state_code);
    if (sa.zip) parts.push(sa.zip);
    if (parts.length > 0) {
      return parts.join(' • ');
    }
  }

  return 'Local (unspecified)';
}

function normalizeSummary(text) {
  if (!text) return null;
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= 140) return normalized;
  return normalized.slice(0, 140).trim() + '…';
}
