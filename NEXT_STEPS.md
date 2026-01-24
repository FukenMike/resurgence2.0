# Next Steps: Import Real Resource Data

## Quick Start

### 1. Export from Supabase (One Time)
Connect to your Supabase database and run:
```sql
SELECT * FROM public.resource_directory;
```

### 2. Copy Raw Export
- Copy the entire JSON response from Supabase
- Open `src/data/resource-directory.raw.json`
- Replace the placeholder content with your export (keep it as a JSON array)

### 3. Generate Cleaned Dataset
Run the build script to transform raw export → cleaned static data:
```bash
npm run build:resources
```

### 4. Verify Results
Check that `src/data/resource-links.json` was populated:
```bash
wc -l src/data/resource-links.json
```

You should see something like: `"Wrote X entries to src/data/resource-links.json"`

### 5. Build & Test
```bash
npm run build    # Production build
npm run dev      # Local development server
```

Then visit http://localhost:5173 and test the directory page:
- Search works
- Filters work (category, verified only, has website)
- Cards display correctly
- "Visit" buttons link to external websites

## How the Pipeline Works

```
Supabase Export (raw JSON)
         ↓
[src/data/resource-directory.raw.json] ← You paste here
         ↓
[scripts/buildResourceLinks.mjs] ← Cleans & transforms
         ↓
[src/data/resource-links.json] ← Generated static data
         ↓
[src/lib/resourceLinks.ts] ← Imported by app
         ↓
[src/pages/resources-directory.tsx] ← Renders to user
```

## What the Build Script Does

- **Filters**: Only includes active resources (`status === "active"`)
- **Cleans**: Validates URLs, normalizes text, truncates summaries
- **Computes**: Determines coverage from geographic data
- **Sorts**: Ensures reproducible order (category → org_name → title)
- **Validates**: Drops incomplete entries (missing required fields)

## Format Details

### Input Schema (src/data/resource-directory.raw.json)
```json
[
  {
    "slug": "unique-id",
    "title": "Resource Name",
    "category": "Legal Services",
    "org_name": "Organization",
    "org_website": "https://org.example.com",
    "is_national": true,
    "state_codes": ["CA", "NY"],
    "zips": ["90210", "10001"],
    "verification": "verified",
    "status": "active",
    "summary": "Description of resource",
    "details": "Longer description",
    "service_areas": "Specific service areas"
  }
]
```

### Output Schema (src/data/resource-links.json)
```json
[
  {
    "slug": "unique-id",
    "title": "Resource Name",
    "category": "Legal Services",
    "org_name": "Organization",
    "url": "https://org.example.com",
    "coverage": "National",
    "summary": "Description of resource (max 140 chars)",
    "verification": "verified",
    "last_verified_at": "2025-01-07T12:00:00Z"
  }
]
```

## If Something Goes Wrong

1. **Build script errors**:
   ```bash
   npm run build:resources 2>&1
   ```
   Check the error message and verify JSON in `resource-directory.raw.json`

2. **TypeScript errors**:
   ```bash
   npm run lint
   ```

3. **Page doesn't show resources**:
   - Verify `src/data/resource-links.json` was created
   - Check browser console for errors
   - Ensure at least one resource passes filters (status === "active")

## Need Help?

Check these files for understanding:
- [PHASE2_COMPLETION_SUMMARY.md](./PHASE2_COMPLETION_SUMMARY.md) - Detailed technical summary
- [scripts/buildResourceLinks.mjs](./scripts/buildResourceLinks.mjs) - Build script with inline comments
- [src/lib/resourceLinks.ts](./src/lib/resourceLinks.ts) - TypeScript types and loader

---

**Status**: Pipeline ready, awaiting real Supabase data export
