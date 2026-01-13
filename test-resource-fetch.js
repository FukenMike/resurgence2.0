import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkavyqtcvobrzlcztbpj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYXZ5cXRjdm9icnpsY3p0YnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzgwODcsImV4cCI6MjA4MzA1NDA4N30.vJB6lRJXArvthkQEovrB1Mg5geF5rZt3hOT70WDri5Y';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testResourceFetch() {
  console.log('Testing resource fetch by slug...\n');
  
  const slugToTest = 'united-way-211';
  
  try {
    // Test the exact query used in the app
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
        ),
        resource_service_areas (
          resource_id,
          coverage,
          state_code,
          county_fips,
          city_name,
          zip
        )
      `)
      .eq('slug', slugToTest)
      .eq('status', 'active')
      .maybeSingle();

    console.log('Slug query result:');
    console.log('  - Found:', !!bySlug);
    console.log('  - Error:', slugError);
    
    if (bySlug) {
      console.log('\nResource details:');
      console.log('  - ID:', bySlug.id);
      console.log('  - Slug:', bySlug.slug);
      console.log('  - Title:', bySlug.title);
      console.log('  - Has organization:', !!bySlug.organizations);
      console.log('  - Service areas count:', bySlug.resource_service_areas?.length || 0);
    } else {
      console.log('\n❌ Resource NOT FOUND');
      console.log('This explains why the detail page redirects to 404');
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testResourceFetch();
