# Quick Start - Supabase Integration

## 1. Set Up Environment Variables
Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these values from your Supabase project settings.

## 2. Database Prerequisites
Ensure these tables exist in your Supabase project:

```sql
-- Resources table
CREATE TABLE public.resources (
  id uuid PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  summary text NOT NULL,
  details text,
  cost text CHECK (cost IN ('free', 'paid', 'sliding-scale')),
  access jsonb,
  eligibility jsonb,
  how_to_apply jsonb,
  requirements jsonb,
  hours text,
  status text CHECK (status IN ('active', 'inactive', 'archived')),
  verification text CHECK (verification IN ('verified', 'stale', 'unverified')),
  last_verified_at timestamp,
  org_id uuid REFERENCES public.organizations(id)
);

-- Organizations table
CREATE TABLE public.organizations (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  website text,
  phone text,
  email text,
  description text
);

-- Service areas table
CREATE TABLE public.resource_service_areas (
  resource_id uuid REFERENCES public.resources(id),
  coverage text CHECK (coverage IN ('national', 'state', 'county', 'city', 'zip')),
  state_code text,
  county_fips text,
  city_name text,
  zip text,
  PRIMARY KEY (resource_id, coverage, state_code, city_name, zip)
);

-- ZIP code lookup table
CREATE TABLE public.geo_zipcodes (
  zip text PRIMARY KEY,
  state_code text NOT NULL,
  primary_city text NOT NULL
);

-- State lookup table
CREATE TABLE public.geo_states (
  state_code text PRIMARY KEY,
  state_name text NOT NULL
);
```

## 3. Verify Installation
```bash
# Check build passes
npm run build

# Check linting passes
npm run lint

# Start development server
npm run dev
```

## 4. Test Resources Page
1. Navigate to `/resources/directory`
2. Should see resources loading from Supabase
3. Try filtering by category, ZIP code, cost, etc.

## 5. Test Resource Detail Page
1. Click on a resource card
2. Should see full resource details
3. Organization info should display
4. Service areas should show

## Key Files
- `src/lib/supabaseClient.ts` - Supabase client initialization
- `src/lib/types.ts` - TypeScript type definitions
- `src/lib/supabaseQueries.ts` - Database queries and filtering
- `src/pages/resources-directory.tsx` - Resource listing page
- `src/pages/resource-detail.tsx` - Resource detail page

## Common Issues

### "Missing Supabase environment variables"
- Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env
- Restart dev server

### No resources showing
- Check resources table has rows with status = 'active'
- Verify organizations foreign key relationships
- Check browser console for errors

### ZIP code filtering returns no results
- Verify ZIP code exists in geo_zipcodes table
- Check resource_service_areas has entries for resources
- Ensure state_code values match geo_states table

### TypeScript errors
- Run `npm run lint` to check for type issues
- Verify environment variables are set before building

## Documentation
- [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md) - Full integration guide
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - What was implemented
