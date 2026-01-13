import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkavyqtcvobrzlcztbpj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYXZ5cXRjdm9icnpsY3p0YnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzgwODcsImV4cCI6MjA4MzA1NDA4N30.vJB6lRJXArvthkQEovrB1Mg5geF5rZt3hOT70WDri5Y';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testViews() {
  console.log('Testing if resource_directory VIEW exists...\n');
  
  try {
    // Test 1: Try querying resource_directory
    console.log('1. Querying resource_directory VIEW:');
    const { data: viewData, error: viewError } = await supabase
      .from('resource_directory')
      .select('*')
      .eq('status', 'active')
      .limit(1);

    if (viewError) {
      console.error('❌ Error querying resource_directory:', viewError);
      console.log('\nAttempting to query base resources table instead...');
      
      // Fallback: test base resources table
      const { data: baseData, error: baseError } = await supabase
        .from('resources')
        .select('*')
        .eq('status', 'active')
        .limit(1);
      
      if (baseError) {
        console.error('❌ Error querying resources table:', baseError);
      } else {
        console.log('✅ Base resources table EXISTS with', baseData?.length || 0, 'records');
        if (baseData && baseData.length > 0) {
          console.log('First resource columns:', Object.keys(baseData[0]));
        }
      }
    } else {
      console.log('✅ resource_directory VIEW EXISTS');
      console.log('Found', viewData?.length || 0, 'records');
      if (viewData && viewData.length > 0) {
        console.log('\nFirst record columns:', Object.keys(viewData[0]));
        console.log('\nFirst record sample:', JSON.stringify(viewData[0], null, 2).substring(0, 500));
      }
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testViews();
