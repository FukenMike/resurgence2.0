import { supabase } from './supabaseClient';
import type { Resource, FilterOptions, ZipcodeInfo, ServiceArea } from './types';
import { normalizeResource, type ResourceDirectoryRow } from './normalizeResource';

/**
 * FIX: Now uses public.resource_directory VIEW instead of base tables.
 * The view provides a denormalized, flat schema that includes org_* columns
 * and service_areas as jsonb, which matches database deployment architecture.
 */

/**
 * Fetch all resources from the base resources table with organization joins
 */
export async function fetchAllResources(): Promise<Resource[]> {
  const { data: resources, error } = await supabase
    .from('resources')
    .select(`
      id,
      slug,
      title,
      category,
      summary,
      details,
      cost,
      access,
      eligibility,
      how_to_apply,
      requirements,
      hours,
      status,
      verification,
      last_verified_at,
      org_id,
      organizations:org_id (
        id,
        name,
        website,
        phone,
        email,
        description
      )
    `)
    .eq('status', 'active');

  if (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }

  return (resources || []).map((r: any) => ({
    ...r,
    organization: Array.isArray(r.organizations) ? r.organizations[0] : r.organizations,
  }));
}

/**
 * Fetch a single resource by slug from the base resources table
 */
export async function fetchResourceBySlug(slug: string): Promise<Resource | null> {
  const { data: resource, error } = await supabase
    .from('resources')
    .select(`
      id,
      slug,
      title,
      category,
      summary,
      details,
      cost,
      access,
      eligibility,
      how_to_apply,
      requirements,
      hours,
      status,
      verification,
      last_verified_at,
      org_id,
      organizations:org_id (
        id,
        name,
        website,
        phone,
        email,
        description
      )
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    console.error('Error fetching resource by slug:', error);
    throw error;
  }

  if (!resource) return null;

  return {
    ...resource,
    organization: Array.isArray(resource.organizations) ? resource.organizations[0] : resource.organizations,
  } as Resource;
}

/**
 * Fetch a single resource by slug or ID from the base resources table.
 * First tries slug match, then tries ID if it looks like a UUID.
 */
export async function fetchResourceBySlugOrId(slugOrId: string): Promise<Resource | null> {
  console.log('[fetchResourceBySlugOrId] 🔍 START with:', { slugOrId });
  
  try {
    // First try by slug
    console.log('[fetchResourceBySlugOrId] 🔍 Querying by slug...');
    const { data: bySlug, error: slugError } = await supabase
      .from('resources')
      .select(`
        id,
        slug,
        title,
        category,
        summary,
        details,
        cost,
        access,
        eligibility,
        how_to_apply,
        requirements,
        hours,
        status,
        verification,
        last_verified_at,
        org_id,
        organizations:org_id (
          id,
          name,
          website,
          phone,
          email,
          description
        )
      `)
      .eq('slug', slugOrId)
      .eq('status', 'active')
      .maybeSingle();

    console.log('[fetchResourceBySlugOrId] Slug query result:', { found: !!bySlug, error: slugError?.message });

    if (slugError) {
      console.error('❌ Error fetching resource by slug:', slugError);
      throw slugError;
    }

    if (bySlug) {
      console.log('[fetchResourceBySlugOrId] ✅ Found by slug:', { id: bySlug.id, slug: bySlug.slug });
      const normalized = {
        ...bySlug,
        organization: Array.isArray(bySlug.organizations) ? bySlug.organizations[0] : bySlug.organizations,
      } as Resource;
      console.log('[fetchResourceBySlugOrId] ✅ Normalized successfully');
      return normalized;
    }

    console.log('[fetchResourceBySlugOrId] Not found by slug, checking if UUID format...');

    // If not found by slug, try by ID (only if it looks like a UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(slugOrId)) {
      console.log('[fetchResourceBySlugOrId] ❌ Not a UUID format, giving up:', { slugOrId });
      return null;
    }

    console.log('[fetchResourceBySlugOrId] 🔍 Querying by UUID:', { slugOrId });
    
    const { data: byId, error: idError } = await supabase
      .from('resources')
      .select(`
        id,
        slug,
        title,
        category,
        summary,
        details,
        cost,
        access,
        eligibility,
        how_to_apply,
        requirements,
        hours,
        status,
        verification,
        last_verified_at,
        org_id,
        organizations:org_id (
          id,
          name,
          website,
          phone,
          email,
          description
        )
      `)
      .eq('id', slugOrId)
      .eq('status', 'active')
      .maybeSingle();

    console.log('[fetchResourceBySlugOrId] UUID query result:', { found: !!byId, error: idError?.message });

    if (idError) {
      console.error('❌ Error fetching resource by ID:', idError);
      throw idError;
    }

    if (byId) {
      console.log('[fetchResourceBySlugOrId] ✅ Found by ID:', { id: byId.id, slug: byId.slug });
      const normalized = {
        ...byId,
        organization: Array.isArray(byId.organizations) ? byId.organizations[0] : byId.organizations,
      } as Resource;
      console.log('[fetchResourceBySlugOrId] ✅ Normalized successfully');
      return normalized;
    }

    console.log('❌ [fetchResourceBySlugOrId] NOT FOUND by slug or ID:', { slugOrId });
    return null;
  } catch (err) {
    console.error('❌ [fetchResourceBySlugOrId] EXCEPTION:', err);
    throw err;
  }
}

/**
 * Look up ZIP code information
 */
export async function lookupZipcode(zip: string): Promise<ZipcodeInfo | null> {
  const { data, error } = await supabase
    .from('geo_zipcodes')
    .select('zip, state_code, primary_city')
    .eq('zip', zip)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    console.error('Error looking up ZIP:', error);
    throw error;
  }

  return data || null;
}

/**
 * Get state name from state code
 */
export async function getStateName(stateCode: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('geo_states')
    .select('state_name')
    .eq('state_code', stateCode)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching state name:', error);
    throw error;
  }

  return data?.state_name || null;
}

/**
 * Filter resources based on criteria
 * Handles text search, category, cost, access, verification, and location
 */
export async function filterResources(
  resources: Resource[],
  options: FilterOptions,
  zipcodeLocationCache?: Map<string, ZipcodeInfo | null>
): Promise<Resource[]> {
  let filtered = [...resources];

  // Text search - title, summary, and org name
  if (options.searchQuery?.trim()) {
    const query = options.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(query) ||
        r.summary.toLowerCase().includes(query) ||
        r.organization?.name.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (options.category && options.category !== 'All') {
    filtered = filtered.filter((r) => r.category === options.category);
  }

  // Cost filter
  if (options.cost && options.cost !== 'All') {
    filtered = filtered.filter((r) => r.cost === options.cost);
  }

  // Access filter (single ENUM value comparison)
  if (options.access && options.access !== 'All') {
    filtered = filtered.filter((r) => r.access === options.access);
  }

  // Verification filter
  if (options.verification && options.verification !== 'All') {
    filtered = filtered.filter((r) => r.verification === options.verification);
  }

  // Location filter by ZIP
  if (options.zip?.trim()) {
    const zip = options.zip.trim();
    
    // Get ZIP info (use cache if available)
    let zipInfo: ZipcodeInfo | null;
    if (zipcodeLocationCache?.has(zip)) {
      zipInfo = zipcodeLocationCache.get(zip) || null;
    } else {
      zipInfo = await lookupZipcode(zip);
      if (zipcodeLocationCache) {
        zipcodeLocationCache.set(zip, zipInfo);
      }
    }

    if (zipInfo) {
      filtered = filtered.filter((r) => {
        if (!r.service_areas || r.service_areas.length === 0) {
          return false;
        }

        // Check if any service area matches the criteria
        return r.service_areas.some((sa) => {
          // National coverage always matches
          if (sa.coverage === 'national') return true;
          // State coverage matches if state_code matches
          if (sa.coverage === 'state' && sa.state_code === zipInfo?.state_code) return true;
          // ZIP coverage matches if zip matches
          if (sa.coverage === 'zip' && sa.zip === zip) return true;
          // City coverage matches if city matches
          if (sa.coverage === 'city' && sa.city_name?.toLowerCase() === zipInfo?.primary_city.toLowerCase()) return true;
          // County coverage - would need county_fips lookup, not implemented for now
          return false;
        });
      });
    } else {
      // Invalid ZIP - return no results
      filtered = [];
    }
  }

  return filtered;
}

/**
 * Get unique categories from resources
 */
export function getUniqueCategoriesFromResources(resources: Resource[]): string[] {
  const categories = new Set<string>();
  resources.forEach((r) => {
    if (r.category) {
      categories.add(r.category);
    }
  });
  return Array.from(categories).sort();
}

/**
 * Parse JSON fields that are stored as strings in the database
 * Note: access is now a single ENUM value, not JSON
 */
export function parseResourceJsonFields(resource: Resource): Resource {
  return {
    ...resource,
    eligibility: resource.eligibility
      ? typeof resource.eligibility === 'string'
        ? JSON.parse(resource.eligibility)
        : resource.eligibility
      : undefined,
    how_to_apply: resource.how_to_apply
      ? typeof resource.how_to_apply === 'string'
        ? JSON.parse(resource.how_to_apply)
        : resource.how_to_apply
      : undefined,
    requirements: resource.requirements
      ? typeof resource.requirements === 'string'
        ? JSON.parse(resource.requirements)
        : resource.requirements
      : undefined,
  };
}
