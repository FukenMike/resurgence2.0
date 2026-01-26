/**
 * SEO Utilities for The Father's Alliance website
 * Manages meta tags, titles, descriptions, and structured data
 * 
 * Philosophy: Minimal, accurate, nonprofit-focused SEO without marketing hype
 */

export interface SEOConfig {
  title: string;
  description: string;
  path: string;
  /** If true, page will not be indexed by search engines */
  noindex?: boolean;
  /** Custom canonical URL (defaults to path) */
  canonical?: string;
  /** Open Graph image URL (for social sharing) */
  ogImage?: string;
}

const DOMAIN = 'https://thefathersalliance.org';
const ORGANIZATION_NAME = "The Father's Alliance";
const DEFAULT_OG_IMAGE = `${DOMAIN}/og-image.png`;

/**
 * Site-wide constants for structured data
 */
export const SITE_CONFIG = {
  name: ORGANIZATION_NAME,
  url: DOMAIN,
  description:
    "The Father's Alliance provides supplemental, practical stability support to help households stay stable when traditional assistance is delayed, unavailable, or exhausted.",
  logo: `${DOMAIN}/logo.png`,
  sameAs: [
    // Add social media profiles as needed
  ],
  foundingDate: '2024',
};

/**
 * Update page title and meta description
 * Called in useEffect() hook of each page
 */
export function updatePageMeta(config: SEOConfig): void {
  // Update document title
  document.title = config.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', config.description);

  // Update or create robots meta tag for noindex pages
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (config.noindex) {
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');
  } else if (metaRobots) {
    metaRobots.remove();
  }

  // Update or create canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  const canonicalUrl = config.canonical || `${DOMAIN}${config.path}`;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  // Update Open Graph meta tags
  const ogImage = config.ogImage || DEFAULT_OG_IMAGE;
  updateOrCreateMeta('property', 'og:title', config.title);
  updateOrCreateMeta('property', 'og:description', config.description);
  updateOrCreateMeta('property', 'og:url', `${DOMAIN}${config.path}`);
  updateOrCreateMeta('property', 'og:type', 'website');
  updateOrCreateMeta('property', 'og:image', ogImage);
  updateOrCreateMeta('property', 'og:site_name', ORGANIZATION_NAME);

  // Update Twitter Card meta tags
  updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
  updateOrCreateMeta('name', 'twitter:title', config.title);
  updateOrCreateMeta('name', 'twitter:description', config.description);
  updateOrCreateMeta('name', 'twitter:image', ogImage);
}

/**
 * Helper to update or create meta tags
 */
function updateOrCreateMeta(attrName: string, attrValue: string, content: string): void {
  let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Generate JSON-LD structured data for Organization schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: SITE_CONFIG.logo,
    description: SITE_CONFIG.description,
    sameAs: SITE_CONFIG.sameAs,
    foundingDate: SITE_CONFIG.foundingDate,
    knowsAbout: ['Family Stability', 'Household Support', 'Practical Assistance', 'Community Resources'],
  };
}

/**
 * Generate JSON-LD structured data for Website schema
 */
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: DOMAIN,
    name: ORGANIZATION_NAME,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${DOMAIN}/resources?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD breadcrumb schema
 * Only use where navigation structure warrants it
 */
export function getBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${DOMAIN}${item.path}`,
    })),
  };
}

/**
 * Inject structured data into page head
 */
export function injectStructuredData(schema: object, id?: string): void {
  let script = document.querySelector(`script[type="application/ld+json"]${id ? `#${id}` : ''}`);
  if (!script) {
    script = document.createElement('script');
    (script as HTMLScriptElement).type = 'application/ld+json';
    if (id) script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}
