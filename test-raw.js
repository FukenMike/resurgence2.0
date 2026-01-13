import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkavyqtcvobrzlcztbpj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYXZ5cXRjdm9icnpsY3p0YnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzgwODcsImV4cCI6MjA4MzA1NDA4N30.vJB6lRJXArvthkQEovrB1Mg5geF5rZt3hOT70WDri5Y';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data: row, error } = await supabase
    .from('resource_directory')
    .select('*')
    .eq('slug', 'united-way-211')
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    console.error('ERROR:', error);
    return;
  }

  console.log('RAW ROW:');
  console.log(JSON.stringify(row, null, 2));
}

test();
