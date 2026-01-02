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
}

const DOMAIN = 'https://thefathersalliance.org';
const ORGANIZATION_NAME = "The Father's Alliance";

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
}

/**
 * Generate JSON-LD structured data for Organization schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: DOMAIN,
    logo: `${DOMAIN}/logo.png`,
    description:
      "The Father's Alliance provides supplemental, practical stability support to help households stay stable when traditional assistance is delayed, unavailable, or exhausted.",
    sameAs: [],
    foundingDate: '2024',
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
