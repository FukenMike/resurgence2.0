import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkavyqtcvobrzlcztbpj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYXZ5cXRjdm9icnpsY3p0YnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzgwODcsImV4cCI6MjA4MzA1NDA4N30.vJB6lRJXArvthkQEovrB1Mg5geF5rZt3hOT70WDri5Y';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase connection...\n');
  
  try {
    // Test 1: Fetch resources
    console.log('1. Fetching resources...');
    const { data: resources, error: resourcesError } = await supabase
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

    if (resourcesError) {
      console.error('❌ Error fetching resources:', resourcesError);
    } else {
      console.log(`✅ Successfully fetched ${resources?.length || 0} resources`);
      if (resources && resources.length > 0) {
        console.log('\nFirst resource sample:');
        console.log(JSON.stringify(resources[0], null, 2));
      }
    }

    // Test 2: Check organizations table
    console.log('\n2. Checking organizations table...');
    const { data: orgs, error: orgsError } = await supabase
      .from('organizations')
      .select('id, name')
      .limit(5);

    if (orgsError) {
      console.error('❌ Error fetching organizations:', orgsError);
    } else {
      console.log(`✅ Found ${orgs?.length || 0} organizations`);
    }

    // Test 3: Check service areas
    console.log('\n3. Checking service areas...');
    const { data: serviceAreas, error: saError } = await supabase
      .from('resource_service_areas')
      .select('resource_id, coverage')
      .limit(5);

    if (saError) {
      console.error('❌ Error fetching service areas:', saError);
    } else {
      console.log(`✅ Found ${serviceAreas?.length || 0} service area records`);
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testConnection();
