/**
 * Types for Supabase-backed resources
 * Maps to the database schema
 */

export type VerificationStatus = 'verified' | 'stale' | 'unverified';
export type AccessType = 'walk_in' | 'appointment' | 'referral' | 'online' | 'unknown';
export type CostType = 'free' | 'sliding' | 'paid' | 'unknown';
export type ResourceStatus = 'active' | 'paused' | 'retired';
export type ResourceCategory = 'housing' | 'food' | 'transportation' | 'legal' | 'healthcare' | 'mental_health' | 'employment' | 'education' | 'child_support' | 'emergency';
export type ServiceAreaCoverage = 'national' | 'state' | 'county' | 'city' | 'zip';

/**
 * Helper function to convert DB enum values to display labels
 */
export function formatAccessType(access: AccessType): string {
  const labels: Record<AccessType, string> = {
    walk_in: 'Walk-in',
    appointment: 'Appointment',
    referral: 'Referral',
    online: 'Online',
    unknown: 'Unknown',
  };
  return labels[access] || access;
}

export function formatCostType(cost: CostType): string {
  const labels: Record<CostType, string> = {
    free: 'Free',
    sliding: 'Sliding Scale',
    paid: 'Paid',
    unknown: 'Unknown',
  };
  return labels[cost] || cost;
}

export function formatResourceStatus(status: ResourceStatus): string {
  const labels: Record<ResourceStatus, string> = {
    active: 'Active',
    paused: 'Paused',
    retired: 'Retired',
  };
  return labels[status] || status;
}

export interface Organization {
  id: string;
  name: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
}

export interface ServiceArea {
  resource_id: string;
  coverage: ServiceAreaCoverage;
  state_code?: string;
  county_fips?: string;
  city_name?: string;
  zip?: string;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  category: ResourceCategory;
  summary: string;
  details?: string;
  cost: CostType;
  access: AccessType; // Single ENUM value from DB
  eligibility?: string; // TEXT field in DB
  how_to_apply?: string; // JSONB field in DB
  requirements?: string; // JSONB field in DB
  hours?: string;
  status: ResourceStatus;
  verification: VerificationStatus;
  last_verified_at?: string;
  org_id: string;
  // Joined data
  organization?: Organization;
  service_areas?: ServiceArea[];
}

export interface ZipcodeInfo {
  zip: string;
  state_code: string;
  primary_city: string;
}

export interface FilterOptions {
  searchQuery?: string;
  category?: string;
  cost?: CostType | 'All';
  access?: string;
  verification?: VerificationStatus | 'All';
  zip?: string;
}
