/**
 * Sitemap XML Generator
 * 
 * Generates public/sitemap.xml from route registry
 * - Only includes routes with status: 'live'
 * - Excludes routes requiring authentication
 * - Excludes reserved namespaces (/admin, /portal, /draft)
 * - Sets reasonable priority and lastmod values
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Import route registry (using dynamic import requires transpiling .tsx)
// Instead, we'll define a minimal route list for the generator
const DOMAIN = 'https://thefathersalliance.org';

// Route definitions for sitemap (must match routeRegistry)
// Note: auth-required routes (family-portal, provider-portal, portal, support-portal, login)
// and redirect-only routes are automatically excluded by the filter
const routes = [
  { path: '/', title: 'Home', priority: 1.0, status: 'live' },
  { path: '/who-we-serve', title: 'Who We Serve', priority: 0.9, status: 'live' },
  { path: '/how-we-help', title: 'How We Help', priority: 0.9, status: 'live' },
  { path: '/about', title: 'About', priority: 0.8, status: 'live' },
  { path: '/programs', title: 'Programs', priority: 0.9, status: 'live' },
  { path: '/programs/mobility-stabilization', title: 'Mobility Stabilization', priority: 0.8, status: 'live' },
  { path: '/programs/fsip', title: 'FSIP', priority: 0.9, status: 'live' },
  { path: '/fsip/resource-hub', title: 'FSIP Resource Hub', priority: 0.7, status: 'live' },
  { path: '/fsip/crisis-navigation', title: 'Crisis Navigation', priority: 0.7, status: 'live' },
  { path: '/fsip/family-repair', title: 'Family Repair', priority: 0.7, status: 'live' },
  { path: '/fsip/provider-network', title: 'Provider Network', priority: 0.7, status: 'live' },
  { path: '/providers', title: 'For Providers', priority: 0.8, status: 'live' },
  { path: '/resources', title: 'Resources & Tools', priority: 0.8, status: 'live' },
  { path: '/resources/directory', title: 'Resource Directory', priority: 0.8, status: 'live' },
  { path: '/portals', title: 'Portals', priority: 0.7, status: 'live' },
  { path: '/get-involved', title: 'Get Involved', priority: 0.8, status: 'live' },
  { path: '/transparency', title: 'Transparency', priority: 0.7, status: 'live' },
  { path: '/privacy-policy', title: 'Privacy Policy', priority: 0.5, status: 'live' },
  { path: '/terms-of-service', title: 'Terms of Service', priority: 0.5, status: 'live' },
];

function generateSitemap() {
  // Filter routes: live status, public only (no auth required)
  // Excludes:
  // - /family-portal and /provider-portal (auth required)
  // - /login (auth page)
  // - Legacy redirects: /portal, /support-portal (redirect-only, no auth)
  // - /admin, /draft (reserved namespaces)
  const publicRoutes = routes.filter(
    (route) => route.status === 'live' &&
    route.path !== '/family-portal' &&
    route.path !== '/provider-portal' &&
    route.path !== '/login' &&
    route.path !== '/portal' &&
    route.path !== '/support-portal' &&
    !route.path.startsWith('/admin') &&
    !route.path.startsWith('/draft')
  );

  // De-duplicate by path (first occurrence wins)
  const seenPaths = new Set();
  const deduplicatedRoutes = publicRoutes.filter((route) => {
    if (seenPaths.has(route.path)) {
      return false;
    }
    seenPaths.add(route.path);
    return true;
  });

  // Generate XML
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const urls = deduplicatedRoutes
    .map(
      (route) => `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  // Write to public/sitemap.xml
  const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  
  console.log(`✅ Sitemap generated: ${sitemapPath}`);
  console.log(`   - ${deduplicatedRoutes.length} routes included`);
  console.log(`   - Last modified: ${now}`);
}

generateSitemap();
