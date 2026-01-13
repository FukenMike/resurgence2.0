import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkavyqtcvobrzlcztbpj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYXZ5cXRjdm9icnpsY3p0YnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzgwODcsImV4cCI6MjA4MzA1NDA4N30.vJB6lRJXArvthkQEovrB1Mg5geF5rZt3hOT70WDri5Y';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testQueries() {
  console.log('Testing exact query patterns from fetchResourceBySlugOrId\n');
  
  const slugOrId = 'united-way-211';
  
  try {
    // Test 1: OR clause query (what our code does now)
    console.log('1. Using .or() clause for slug/id lookup:');
    const { data: orData, error: orError } = await supabase
      .from('resource_directory')
      .select('*')
      .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
      .eq('status', 'active')
      .limit(1)
      .maybeSingle();

    console.log('  - Error:', orError?.message || 'null');
    console.log('  - Found:', !!orData);
    if (orData) {
      console.log('  - ID:', orData.id);
      console.log('  - Slug:', orData.slug);
      console.log('  - Title:', orData.title);
      console.log('  - Org name:', orData.org_name);
    }

    // Test 2: Direct slug lookup
    console.log('\n2. Direct slug lookup:');
    const { data: slugData, error: slugError } = await supabase
      .from('resource_directory')
      .select('*')
      .eq('slug', slugOrId)
      .eq('status', 'active')
      .maybeSingle();

    console.log('  - Error:', slugError?.message || 'null');
    console.log('  - Found:', !!slugData);
    if (slugData) {
      console.log('  - ID:', slugData.id);
      console.log('  - Slug:', slugData.slug);
      console.log('  - Title:', slugData.title);
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testQueries();
