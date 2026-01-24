import resourceLinksData from '../data/resource-links.json' assert { type: 'json' };

export interface ResourceLink {
  slug: string;
  title: string;
  category: string;
  org_name: string;
  url: string | null;
  coverage: string;
  summary: string | null;
  verification: string;
  last_verified_at: string | null;
}

export const resourceLinks: ResourceLink[] = resourceLinksData as ResourceLink[];

export function getResourceLinkBySlug(slug: string): ResourceLink | undefined {
  return resourceLinks.find(r => r.slug === slug);
}
