import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkavyqtcvobrzlcztbpj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYXZ5cXRjdm9icnpsY3p0YnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzgwODcsImV4cCI6MjA4MzA1NDA4N30.vJB6lRJXArvthkQEovrB1Mg5geF5rZt3hOT70WDri5Y';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Testing veterans-crisis-line query...\n');
  
  // Test 1: Count all resources
  const { count } = await supabase
    .from('resource_directory')
    .select('*', { count: 'exact' })
    .eq('status', 'active');
  console.log('Total active resources:', count);

  // Test 2: List all slugs
  const { data: allSlugs, error: slugsError } = await supabase
    .from('resource_directory')
    .select('slug, title')
    .eq('status', 'active')
    .limit(30);

  console.log('\nAll active resource slugs:');
  if (allSlugs) {
    allSlugs.forEach(r => console.log(`  - ${r.slug} (${r.title})`));
  }

  // Test 3: Search for veterans-crisis-line
  const { data: vcrData, error: vcrError } = await supabase
    .from('resource_directory')
    .select('*')
    .eq('slug', 'veterans-crisis-line')
    .eq('status', 'active')
    .maybeSingle();

  console.log('\nQuery for veterans-crisis-line:');
  console.log('  - Found:', !!vcrData);
  console.log('  - Error:', vcrError?.message || 'null');
  if (vcrData) {
    console.log('  - ID:', vcrData.id);
    console.log('  - Title:', vcrData.title);
    console.log('  - Org Name:', vcrData.org_name);
  }
}

test();
