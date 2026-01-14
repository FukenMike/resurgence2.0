const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://fawvixexeyfhwytkpbti.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhd3ZpeGV4ZXlmaHd5dGtwYnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNzI3NDcsImV4cCI6MjA0NTY0ODc0N30.kE3M0hlkqaPxp8XD0B9POlNkwMqRp_tXM_7M5x-C50c'
);

(async () => {
  // First, let's see what columns exist
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .limit(1)
    .single();
  
  if (error) console.error('Error:', error);
  else console.log('Sample resource columns:', Object.keys(data));
  
  // Now check for united-way-211
  const { data: resource, error: error2 } = await supabase
    .from('resources')
    .select('id, slug, title, org_id')
    .eq('slug', 'united-way-211')
    .single();
  
  if (error2) console.error('Error fetching united-way-211:', error2);
  else console.log('united-way-211 found:', resource);
})();
