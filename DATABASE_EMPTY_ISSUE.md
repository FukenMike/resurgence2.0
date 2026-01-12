# Resource Directory Empty - Root Cause & Solution

## Problem
The resource directory on the website (`/resources/directory`) appears empty even though the Supabase database schema exists.

## Root Cause
The database tables are **empty** - no data has been seeded yet. While the schema (tables, columns, relationships) exists from the migrations, no actual resource records have been inserted into the database.

## Verification
Ran a direct Supabase connection test:
- ✅ Connection successful
- ✅ Schema exists (all tables present)
- ❌ **0 resources found**
- ❌ **0 organizations found**  
- ❌ **0 service areas found**

## Why The Seed Script Didn't Work
Row Level Security (RLS) is enabled on all tables, preventing the anonymous (anon) key from inserting data. This is correct security behavior but blocks automated seeding scripts.

## Solution

### Immediate Fix (Use Supabase Dashboard SQL Editor)

1. **Go to**: https://supabase.com/dashboard/project/kkavyqtcvobrzlcztbpj/sql/new

2. **Run the SQL provided in `SEEDING_INSTRUCTIONS.md`**
   - This will temporarily disable RLS
   - Insert sample organizations and resources
   - Re-enable RLS
   - Set up public read policies

3. **Refresh the website** - resources should now appear!

### Long-term Solution

Set up proper RLS policies for your use case:

**Option A: Public Read, Authenticated Write**
```sql
-- Allow anyone to read resources
CREATE POLICY "Public read" ON public.resources FOR SELECT USING (true);

-- Only authenticated users can insert/update
CREATE POLICY "Authenticated write" ON public.resources FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');
```

**Option B: Public Read, Service Role Write Only**
- Keep tables read-only for anon users
- Use service role key for administrative scripts
- Manage data via Supabase Dashboard

## Files Created

1. `SEEDING_INSTRUCTIONS.md` - Complete seeding instructions with SQL
2. `scripts/seedDatabase.js` - Automated seeding script (needs service role key)
3. `test-supabase.js` - Connection test script

## Testing After Seeding

```bash
# Test the connection and data
node test-supabase.js

# Should show:
# ✅ Successfully fetched 5 resources
# ✅ Found 5 organizations
# ✅ Found 5 service area records
```

## Next Steps

1. **Run the SQL seeding script** from SEEDING_INSTRUCTIONS.md in Supabase Dashboard
2. **Verify data appears** on /resources/directory
3. **Decide on RLS strategy** for production
4. **Consider adding** more seed data from `src/data/resources.seed.ts`

## Additional Notes

- The app code is working correctly - it's just querying an empty database
- Environment variables are properly configured (`.env` file checked)
- Supabase client is connecting successfully
- The query logic handles empty results gracefully (shows "0 of 0 resources")
