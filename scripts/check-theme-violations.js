#!/usr/bin/env node

/**
 * Theme Violation Checker
 * 
 * Scans the codebase for:
 * 1. Hardcoded Tailwind palette utilities (text-gray-600, bg-blue-100, etc.)
 * 2. Hex color codes in source files (except index.css token blocks)
 * 
 * All colors must use semantic tokens defined in src/index.css
 * Exit code: 1 if violations found, 0 if clean
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

const cwd = process.cwd();

// Regex patterns
const TAILWIND_PALETTE_PATTERN = /(text|bg|border|ring|from|via|to|divide|outline|shadow|caret|accent|placeholder|stroke|fill)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(\d{2,3})/g;

const HEX_COLOR_PATTERN = /#[0-9a-fA-F]{3,8}/g;

// Token blocks that should contain hex colors
const INDEX_CSS_TOKEN_BLOCKS = [
  'CSS Variables',
  'OPS THEME',
  ':root',
  '[data-theme="ops"]',
];

let totalViolations = 0;
let filesWithViolations = new Set();

/**
 * Check for Tailwind palette utilities in TypeScript/TSX files
 */
function checkTailwindPaletteUtilities() {
  console.log(`\n${colors.cyan}[1/2] Checking for hardcoded Tailwind palette utilities...${colors.reset}`);
  
  const sourceFiles = globSync('src/**/*.{ts,tsx}', { cwd });
  let tailwindViolations = 0;

  sourceFiles.forEach((file) => {
    const content = fs.readFileSync(path.join(cwd, file), 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, lineIndex) => {
      const matches = [...line.matchAll(TAILWIND_PALETTE_PATTERN)];
      matches.forEach((match) => {
        tailwindViolations++;
        totalViolations++;
        filesWithViolations.add(file);

        console.log(`\n  ${colors.red}✖ ${file}:${lineIndex + 1}${colors.reset}`);
        console.log(`    ${line.trim()}`);
        console.log(`    ${' '.repeat(line.indexOf(match[0]))}${colors.red}${'^'.repeat(match[0].length)}${colors.reset}`);
        console.log(`    Hardcoded utility: ${colors.yellow}${match[0]}${colors.reset}`);
      });
    });
  });

  if (tailwindViolations === 0) {
    console.log(`  ${colors.green}✓ No hardcoded Tailwind palette utilities found${colors.reset}`);
  } else {
    console.log(`\n  ${colors.red}Found ${tailwindViolations} Tailwind palette violations${colors.reset}`);
  }

  return tailwindViolations;
}

/**
 * Check for hex colors in source files (excluding index.css token blocks)
 */
function checkHexColors() {
  console.log(`\n${colors.cyan}[2/2] Checking for hardcoded hex colors...${colors.reset}`);
  
  const sourceFiles = globSync('src/**/*.{ts,tsx,css}', { cwd });
  let hexViolations = 0;

  sourceFiles.forEach((file) => {
    // Skip index.css (token definitions are allowed there)
    if (file.endsWith('index.css')) {
      return;
    }

    const content = fs.readFileSync(path.join(cwd, file), 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, lineIndex) => {
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
        return;
      }

      const matches = [...line.matchAll(HEX_COLOR_PATTERN)];
      matches.forEach((match) => {
        hexViolations++;
        totalViolations++;
        filesWithViolations.add(file);

        console.log(`\n  ${colors.red}✖ ${file}:${lineIndex + 1}${colors.reset}`);
        console.log(`    ${line.trim()}`);
        console.log(`    ${' '.repeat(line.indexOf(match[0]))}${colors.red}${'^'.repeat(match[0].length)}${colors.reset}`);
        console.log(`    Hardcoded hex color: ${colors.yellow}${match[0]}${colors.reset}`);
      });
    });
  });

  if (hexViolations === 0) {
    console.log(`  ${colors.green}✓ No hardcoded hex colors found${colors.reset}`);
  } else {
    console.log(`\n  ${colors.red}Found ${hexViolations} hex color violations${colors.reset}`);
  }

  return hexViolations;
}

/**
 * Print summary and token reference
 */
function printSummary() {
  console.log(`\n${'='.repeat(70)}`);

  if (totalViolations === 0) {
    console.log(`${colors.green}✓ PASS: All colors use semantic tokens${colors.reset}`);
    console.log(`${'='.repeat(70)}\n`);
    return;
  }

  console.log(`${colors.red}✗ FAIL: ${totalViolations} theme violations found in ${filesWithViolations.size} file(s)${colors.reset}`);
  console.log(`${'='.repeat(70)}\n`);

  console.log(`${colors.yellow}SEMANTIC TOKEN REFERENCE:${colors.reset}\n`);
  console.log('  Text Colors:');
  console.log('    • text-ink          (primary text)');
  console.log('    • text-muted        (secondary text)');
  console.log('    • text-ocean        (informational accent)');
  console.log('    • text-forest       (verification/positive)');
  console.log('    • text-danger       (warnings/errors)\n');

  console.log('  Background Colors:');
  console.log('    • bg-sand           (page background)');
  console.log('    • bg-surface        (card backgrounds)');
  console.log('    • bg-surface-muted  (secondary cards)');
  console.log('    • bg-danger-bg      (danger backgrounds)\n');

  console.log('  Border & Ring Colors:');
  console.log('    • border-border-soft   (light borders)');
  console.log('    • border-border-muted  (medium borders)');
  console.log('    • border-ocean, border-danger');
  console.log('    • ring-ocean, ring-danger\n');

  console.log('  Gradient Colors:');
  console.log('    • from-sand, via-surface, to-surface-muted');
  console.log('    • from-ocean, via-forest (accent gradients)\n');

  console.log(`  ${colors.cyan}See: docs/COLOR_TOKEN_SYSTEM.md${colors.reset}\n`);
}

/**
 * Main execution
 */
function main() {
  console.log(`${colors.cyan}Theme Violation Checker${colors.reset}`);
  console.log(`Scanning ${path.relative(process.cwd(), cwd)}/src\n`);

  checkTailwindPaletteUtilities();
  checkHexColors();
  printSummary();

  process.exit(totalViolations > 0 ? 1 : 0);
}

main();
