/**
 * Types for Supabase-backed resources
 * Maps to the database schema
 */

export type VerificationStatus = 'verified' | 'stale' | 'unverified';
export type AccessType = 'Walk-in' | 'Appointment' | 'Referral' | 'Online';
export type CostType = 'free' | 'paid' | 'sliding-scale';
export type ServiceAreaCoverage = 'national' | 'state' | 'county' | 'city' | 'zip';

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
  category: string;
  summary: string;
  details?: string;
  cost: CostType;
  access: string; // JSON field with access types
  eligibility?: string; // JSON field
  how_to_apply?: string; // JSON field
  requirements?: string; // JSON field
  hours?: string;
  status: 'active' | 'inactive' | 'archived';
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
