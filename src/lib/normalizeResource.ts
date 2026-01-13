/**
 * Normalize a flat resource_directory VIEW row to the nested Resource UI shape.
 * 
 * The resource_directory view has a flat schema with org_* columns instead of nested relationships.
 * This function transforms the flat row into the nested structure expected by the UI.
 * 
 * Why: The database view is the single source of truth but doesn't match our domain model.
 */

import type { Resource } from './types';

export interface ResourceDirectoryRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  details: string | null;
  cost: string;
  access: string;
  eligibility: string | null;
  how_to_apply: any; // jsonb
  requirements: any; // jsonb
  hours: string | null;
  status: string;
  verification: string;
  last_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  org_id: string | null;
  org_name: string | null;
  org_website: string | null;
  org_phone: string | null;
  org_email: string | null;
  org_description: string | null;
  service_areas: any; // jsonb array
  is_national: boolean | null;
  state_codes: string[] | null;
  zips: string[] | null;
}

export function normalizeResource(row: ResourceDirectoryRow): Resource {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category as any,
    summary: row.summary,
    details: row.details || undefined,
    cost: row.cost as any,
    access: row.access as any,
    eligibility: row.eligibility || undefined,
    how_to_apply: row.how_to_apply,
    requirements: row.requirements,
    hours: row.hours || undefined,
    status: row.status as any,
    verification: row.verification as any,
    last_verified_at: row.last_verified_at || undefined,
    org_id: row.org_id || '',
    organization: row.org_id
      ? {
          id: row.org_id,
          name: row.org_name || '',
          website: row.org_website || undefined,
          phone: row.org_phone || undefined,
          email: row.org_email || undefined,
          description: row.org_description || undefined,
        }
      : undefined,
    service_areas: row.service_areas || [],
  };
}
