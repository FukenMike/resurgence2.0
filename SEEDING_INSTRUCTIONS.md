# Database Seeding Instructions

The resource directory appears empty because the database tables haven't been seeded with data yet.

## Issue
Row Level Security (RLS) is enabled on the Supabase tables, preventing the anonymous key from inserting data directly via scripts.

## Solution Options

### Option 1: Use Supabase Dashboard (Recommended for initial seed)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/kkavyqtcvobrzlcztbpj

2. Navigate to **SQL Editor**

3. Run this SQL to temporarily disable RLS and seed the database:

```sql
-- Temporarily disable RLS for seeding
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_service_areas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.geo_zipcodes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.geo_states DISABLE ROW LEVEL SECURITY;

-- Insert sample organizations
INSERT INTO public.organizations (id, name, website, phone, email, description)
VALUES
  (gen_random_uuid(), 'Legal Aid Society', 'https://legalaid.org', '(213) 555-0123', 'info@legalaid.org', 'Provides free legal representation'),
  (gen_random_uuid(), 'Housing Authority', 'https://housing.org', '(213) 555-0200', 'help@housing.org', 'Emergency housing assistance'),
  (gen_random_uuid(), 'Mental Health Services', 'https://mhs.org', '(213) 555-0300', 'care@mhs.org', 'Mental health support and counseling'),
  (gen_random_uuid(), 'Employment Center', 'https://jobcenter.org', '(213) 555-0400', 'jobs@employ.org', 'Job training and placement services'),
  (gen_random_uuid(), 'Food Bank Network', 'https://foodbank.org', '(213) 555-0500', 'info@foodbank.org', 'Emergency food assistance')
ON CONFLICT (name) DO NOTHING;

-- Insert sample resources (using existing org IDs)
INSERT INTO public.resources (id, slug, title, category, summary, details, cost, access, eligibility, how_to_apply, requirements, hours, status, verification, last_verified_at, org_id)
SELECT 
  gen_random_uuid(),
  'legal-aid-society-family-law',
  'Legal Aid Society - Family Law Division',
  'Legal Services',
  'Provides free legal representation and advice for low-income fathers in custody, visitation, and child support matters. Experienced attorneys available for court representation.',
  E'Free legal consultation\n\nCourt representation for custody cases\n\nChild support modification assistance\n\nVisitation rights advocacy\n\nLegal document preparation',
  'free',
  'appointment',
  '["Income at or below 125% of federal poverty level","Resident of Los Angeles County","Family law matter pending or needed"]',
  '["Call intake line at (213) 555-0123 Monday-Friday 9am-5pm","Complete initial screening questionnaire over phone","Provide proof of income (pay stubs, tax returns)","Schedule in-person consultation within 2 weeks","Bring all court documents to first appointment"]',
  '["Photo ID","Proof of income (last 3 pay stubs or tax return)","Proof of LA County residency","Any existing court orders or legal documents"]',
  'Monday-Friday 9:00 AM - 5:00 PM',
  'active',
  'verified',
  '2024-01-15',
  org.id
FROM public.organizations org
WHERE org.name = 'Legal Aid Society'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.resources (id, slug, title, category, summary, details, cost, access, eligibility, how_to_apply, requirements, hours, status, verification, last_verified_at, org_id)
SELECT 
  gen_random_uuid(),
  'emergency-housing-assistance',
  'Housing Authority - Emergency Housing Assistance',
  'Housing Assistance',
  'Provides emergency shelter placement, rental assistance, and housing counseling for fathers and families experiencing housing instability or homelessness.',
  E'Emergency shelter placement\n\nShort-term rental assistance\n\nHousing search assistance\n\nSecurity deposit loans\n\nLandlord mediation',
  'free',
  'walk_in',
  '["Currently homeless or at risk of homelessness","Resident of service area","Valid ID required"]',
  '["Visit intake office during walk-in hours","Complete housing needs assessment","Provide proof of income and housing situation","Meet with case manager","Follow up within 48 hours"]',
  '["Photo ID","Proof of income (if any)","Eviction notice or lease termination (if applicable)","Social Security cards for all family members"]',
  'Walk-in hours: Monday-Friday 8:00 AM - 12:00 PM',
  'active',
  'verified',
  '2024-01-20',
  org.id
FROM public.organizations org
WHERE org.name = 'Housing Authority'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.resources (id, slug, title, category, summary, details, cost, access, eligibility, how_to_apply, requirements, hours, status, verification, last_verified_at, org_id)
SELECT 
  gen_random_uuid(),
  'mental-health-services-counseling',
  'Mental Health Services - Individual Counseling',
  'Mental Health',
  'Free individual therapy and counseling services for fathers dealing with stress, anxiety, depression, or family challenges. Licensed therapists available.',
  E'Individual therapy sessions\n\nGroup support sessions\n\nCrisis intervention\n\nSubstance abuse counseling\n\nFamily therapy referrals',
  'sliding',
  'appointment',
  '["Open to all adults","Sliding scale fees based on income","Insurance accepted"]',
  '["Call to schedule intake appointment","Complete mental health screening","Attend first session","Develop treatment plan with therapist"]',
  '["Photo ID","Insurance card (if applicable)","Income verification for sliding scale"]',
  'Monday-Saturday 8:00 AM - 8:00 PM',
  'active',
  'verified',
  '2024-01-10',
  org.id
FROM public.organizations org
WHERE org.name = 'Mental Health Services'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.resources (id, slug, title, category, summary, details, cost, access, eligibility, how_to_apply, requirements, hours, status, verification, last_verified_at, org_id)
SELECT 
  gen_random_uuid(),
  'employment-center-job-training',
  'Employment Center - Job Training & Placement',
  'Employment Services',
  'Comprehensive job training programs, resume assistance, interview preparation, and job placement services for fathers seeking stable employment.',
  E'Resume writing workshops\n\nJob search assistance\n\nInterview preparation\n\nSkills training programs\n\nEmployer connections',
  'free',
  'walk_in',
  '["Unemployed or underemployed","Legally authorized to work","Willing to participate in training"]',
  '["Attend orientation session (walk-in)","Complete skills assessment","Enroll in training program","Work with job counselor","Apply to job openings"]',
  '["Photo ID","Social Security card","Work authorization documents","High school diploma or GED (preferred)"]',
  'Monday-Friday 9:00 AM - 5:00 PM, Walk-in orientation: Tuesdays 10:00 AM',
  'active',
  'verified',
  '2024-01-05',
  org.id
FROM public.organizations org
WHERE org.name = 'Employment Center'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.resources (id, slug, title, category, summary, details, cost, access, eligibility, how_to_apply, requirements, hours, status, verification, last_verified_at, org_id)
SELECT 
  gen_random_uuid(),
  'food-bank-emergency-food',
  'Food Bank Network - Emergency Food Assistance',
  'Food & Basic Needs',
  'Free emergency food packages and hot meals for individuals and families in need. No documentation required for emergency assistance.',
  E'Weekly food packages\n\nHot meal program\n\nPantry staples\n\nFresh produce when available\n\nSpecial dietary accommodations',
  'free',
  'walk_in',
  '["Experiencing food insecurity","No income requirements","All welcome"]',
  '["Visit distribution center during open hours","Sign in at front desk","Receive food package","May visit once per week"]',
  '["No documents required for first visit","ID helpful for record keeping"]',
  'Tuesday-Thursday 10:00 AM - 2:00 PM, Saturday 9:00 AM - 1:00 PM',
  'active',
  'verified',
  '2024-01-25',
  org.id
FROM public.organizations org
WHERE org.name = 'Food Bank Network'
ON CONFLICT (slug) DO NOTHING;

-- Insert service areas for these resources
INSERT INTO public.resource_service_areas (resource_id, coverage, state_code, county_fips, city_name, zip)
SELECT r.id, 'city', 'CA', NULL, 'Los Angeles', NULL
FROM public.resources r
WHERE r.slug IN ('legal-aid-society-family-law', 'emergency-housing-assistance', 'mental-health-services-counseling', 'employment-center-job-training', 'food-bank-emergency-food')
ON CONFLICT DO NOTHING;

-- Insert sample ZIP codes
INSERT INTO public.geo_zipcodes (zip, state_code, primary_city)
VALUES
  ('90001', 'CA', 'Los Angeles'),
  ('90210', 'CA', 'Beverly Hills'),
  ('94102', 'CA', 'San Francisco'),
  ('10001', 'NY', 'New York'),
  ('60601', 'IL', 'Chicago')
ON CONFLICT (zip) DO NOTHING;

-- Insert sample states
INSERT INTO public.geo_states (state_code, state_name)
VALUES
  ('CA', 'California'),
  ('NY', 'New York'),
  ('IL', 'Illinois'),
  ('TX', 'Texas'),
  ('FL', 'Florida')
ON CONFLICT (state_code) DO NOTHING;

-- Re-enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geo_zipcodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geo_states ENABLE ROW LEVEL SECURITY;
```

4. After running the SQL, refresh your website and check `/resources/directory`

### Option 2: Set up RLS Policies for Public Read Access

If you want the data to be publicly readable, add these RLS policies:

```sql
-- Allow public read access to all tables
CREATE POLICY "Allow public read access" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.resource_service_areas FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.geo_zipcodes FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.geo_states FOR SELECT USING (true);
```

### Option 3: Create a Proper Seed Script with Service Role Key

For production seeding, you should use the service role key (keep it secure, never commit to git):

1. Get your service role key from Supabase Dashboard → Settings → API
2. Create a `.env.local` file (excluded from git):
   ```
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Modify the seed script to use the service role key instead of anon key

## Quick Test

After seeding, run this to verify:

```bash
node test-supabase.js
```

You should see resources returned instead of 0.
