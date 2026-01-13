import { createClient } from '@supabase/supabase-js';
import { normalizeResource, type ResourceDirectoryRow } from './src/lib/normalizeResource.ts';

const supabaseUrl = 'https://kkavyqtcvobrzlcztbpj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYXZ5cXRjdm9icnpsY3p0YnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzgwODcsImV4cCI6MjA4MzA1NDA4N30.vJB6lRJXArvthkQEovrB1Mg5geF5rZt3hOT70WDri5Y';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testNormalization() {
  console.log('Testing normalization...\n');
  
  try {
    // Fetch a resource from the VIEW
    const { data: row, error } = await supabase
      .from('resource_directory')
      .select('*')
      .eq('slug', 'united-way-211')
      .eq('status', 'active')
      .maybeSingle();

    if (error) {
      console.error('❌ Query error:', error);
      return;
    }

    if (!row) {
      console.error('❌ Resource not found');
      return;
    }

    console.log('✅ Retrieved row from VIEW:');
    console.log('  - ID:', row.id);
    console.log('  - Slug:', row.slug);
    console.log('  - Org ID:', row.org_id);
    console.log('  - Org Name:', row.org_name);
    console.log('  - Org Website:', row.org_website);

    // Test normalization
    try {
      const normalized = normalizeResource(row as ResourceDirectoryRow);
      console.log('\n✅ Normalization succeeded:');
      console.log('  - ID:', normalized.id);
      console.log('  - Slug:', normalized.slug);
      console.log('  - Title:', normalized.title);
      console.log('  - Organization:', normalized.organization ? JSON.stringify(normalized.organization) : 'null');
    } catch (normErr) {
      console.error('\n❌ Normalization FAILED:', normErr);
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testNormalization();
