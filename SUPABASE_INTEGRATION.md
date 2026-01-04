# Supabase Integration Guide

This document describes the Supabase-backed Resource Directory implementation.

## Environment Setup

Add the following environment variables to your `.env` file:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Database Schema

### Tables Used

- **public.resources**: Main resource information
  - slug, title, category, summary, details
  - cost, access, eligibility, how_to_apply, requirements (JSONB fields)
  - hours, status ('active' | 'inactive' | 'archived')
  - verification ('verified' | 'stale' | 'unverified')
  - last_verified_at, org_id

- **public.organizations**: Resource providers
  - id, name, website, phone, email, description

- **public.resource_service_areas**: Geographic coverage
  - resource_id, coverage ('national' | 'state' | 'county' | 'city' | 'zip')
  - state_code, county_fips, city_name, zip

- **public.geo_zipcodes**: ZIP code lookup
  - zip, state_code, primary_city

- **public.geo_states**: State lookup
  - state_code, state_name

## Implementation Details

### Supabase Client
File: `src/lib/supabaseClient.ts`
- Initializes Supabase client with environment variables
- Throws error if environment variables are missing

### Types
File: `src/lib/types.ts`
- Defines Resource, Organization, ServiceArea interfaces
- Maps directly to database schema

### Queries
File: `src/lib/supabaseQueries.ts`
- `fetchAllResources()`: Fetches all active resources with organizations
- `fetchResourceBySlug(slug)`: Fetches single resource with service areas
- `lookupZipcode(zip)`: Looks up ZIP code info
- `filterResources(resources, options)`: Client-side filtering

### Pages Updated

#### Resources Directory (`src/pages/resources-directory.tsx`)
- Fetches all resources on mount
- Supports filtering by:
  - **Text search**: Searches title, summary, and organization name
  - **Category**: Filter by resource category
  - **ZIP code**: Filters resources serving the ZIP code's state or specific ZIP
  - **Cost**: free, paid, sliding-scale
  - **Access type**: Walk-in, Appointment, Referral, Online
  - **Verification**: verified, stale, unverified
- Shows loading spinner while fetching
- Displays error message if fetch fails
- Caches ZIP code lookups to avoid repeated database calls

#### Resource Detail (`src/pages/resource-detail.tsx`)
- Fetches resource by slug
- Loads related resources by category
- Shows all resource details with service area information
- Parses JSON fields (access, eligibility, requirements, how_to_apply)
- Displays organization information

### Components Updated

#### ResourceCard (`src/components/resources/ResourceCard.tsx`)
- Updated to use new Resource type from `src/lib/types.ts`
- Displays organization name
- Shows service area from first service_areas entry
- Maintains localStorage-based outcome summary

#### VerificationBadge (`src/components/resources/VerificationBadge.tsx`)
- Updated to import VerificationStatus from new types file
- No functional changes

## Features Preserved

- Community outcome buttons (localStorage-based)
- Admin notes form (localStorage-based)
- Existing styling and layout
- Loading and error states
- Verification status badges

## Filtering Logic

### Text Search
Searches across:
- Resource title
- Resource summary
- Organization name

### ZIP Code Filtering
1. Looks up ZIP code in geo_zipcodes table
2. Gets state_code and primary_city
3. Returns resources where service areas include:
   - `coverage = 'national'` (always matches)
   - `coverage = 'state' AND state_code` matches
   - `coverage = 'zip' AND zip` matches
   - `coverage = 'city' AND city_name` matches
   - County coverage not implemented (requires county lookup)

### Other Filters
Applied directly to in-memory resources:
- Category exact match
- Cost exact match
- Access type (parsed from JSON)
- Verification status exact match

## JSON Fields

The following fields are stored as JSONB in Supabase but handled as arrays in code:

- **access**: Array of access types (e.g., ['Walk-in', 'Online'])
- **eligibility**: Array of eligibility criteria
- **requirements**: Array of requirements
- **how_to_apply**: Array of application steps

## Future Enhancements

1. Implement write operations (admin submissions, community outcomes)
2. Add pagination for large datasets
3. Cache resources with React Query or similar
4. Implement server-side filtering for performance
5. Add county-level filtering support
6. Add real-time updates with Supabase subscriptions
7. Implement resource ratings/reviews

## Troubleshooting

### "Missing Supabase environment variables" error
- Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env
- Restart the development server after adding env vars

### No resources loading
- Check Supabase credentials are correct
- Verify resources table has rows with status = 'active'
- Check browser console for detailed error messages

### ZIP code filtering not working
- Verify ZIP code exists in geo_zipcodes table
- Check resource_service_areas entries have correct state_code values
- Ensure service_areas are properly joined in the query
