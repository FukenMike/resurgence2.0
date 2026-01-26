# Next Steps: Updating the Resource Directory Dataset

## Overview

The Resource Directory is powered by a **static dataset** stored in `src/data/resourceLinks.ts`. This approach ensures fast loading, predictable behavior, and no runtime database dependencies.

To add or update resources, you edit the TypeScript file directly and rebuild the application.

---

## Quick Start: Adding a Resource

### 1. Open the Resource File
```bash
code src/data/resourceLinks.ts
```

### 2. Add a New Entry
Add a new object to the `resourceLinks` array following the structure below:

```typescript
{
  id: 'unique-kebab-case-id',
  title: 'Organization or Resource Name',
  summary: 'Brief description of services (keep under 140 characters for best display)',
  category: 'Legal Services', // See categories below
  url: 'https://www.example.org',
  cost: 'free',              // 'free' | 'sliding' | 'paid'
  access: 'appointment',      // 'appointment' | 'online' | 'walk-in' | 'referral'
  verification: 'verified',   // 'verified' | 'stale' | 'unverified'
  lastVerifiedAt: '2026-01-26', // YYYY-MM-DD format
  tags: ['family law', 'housing'], // Optional, for future filtering
},
```

### 3. Test Locally
```bash
npm run dev
```

Navigate to http://localhost:5173/resources/directory and verify:
- Resource appears in the list
- Search finds it by title/organization/keywords
- Category filter works
- Card displays correctly
- "Visit" button links to correct URL

### 4. Build for Production
```bash
npm run build
```

If the build passes with no TypeScript errors, your changes are ready to deploy.

---

## Field Reference

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (kebab-case recommended: `legal-aid-atlanta`) |
| `title` | `string` | Resource or organization name |
| `summary` | `string` | Brief description (140 chars max recommended) |
| `category` | `string` | Service category (see list below) |
| `url` | `string` | Organization website or resource link |
| `verification` | `string` | Verification status: `verified`, `stale`, or `unverified` |
| `lastVerifiedAt` | `string` | Date last verified (YYYY-MM-DD format) |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `cost` | `string` | Cost structure: `free`, `sliding`, `paid` |
| `access` | `string` | Access method: `appointment`, `online`, `walk-in`, `referral` |
| `tags` | `string[]` | Keywords for enhanced filtering (future use) |

### Valid Categories

Current categories (must match exactly):
- `Legal Services`
- `Housing Assistance`
- `Mental Health`
- `Employment Services`
- `Food & Basic Needs`
- `Healthcare`
- `Transportation`
- `Child Support`
- `Education & Training`
- `Emergency Services`

---

## Editing Existing Resources

### Update Contact Information
```typescript
// Before
{
  id: 'legal-aid-coalition',
  title: 'Legal Aid Coalition',
  url: 'https://www.oldwebsite.org',
  lastVerifiedAt: '2025-11-20',
  // ...
}

// After
{
  id: 'legal-aid-coalition',
  title: 'Legal Aid Coalition',
  url: 'https://www.newwebsite.org', // Updated
  lastVerifiedAt: '2026-01-26',      // Bumped verification date
  // ...
}
```

### Mark Resources as Stale
If you can't verify a resource is still active but don't want to remove it:
```typescript
{
  id: 'workforce-launchpad',
  verification: 'stale',         // Changed from 'verified'
  lastVerifiedAt: '2025-08-14',  // Original verification date
  // ...
}
```

### Remove Resources
Simply delete the entire object from the array. Users will no longer see it in the directory.

---

## Testing Checklist

Before committing changes:

- [ ] **Build passes**: Run `npm run build` with no errors
- [ ] **TypeScript validates**: Run `npm run lint` with no errors
- [ ] **Local preview works**: Resources display correctly at `/resources/directory`
- [ ] **Search functions**: New/updated resources appear in search results
- [ ] **Filters work**: Category filter correctly includes/excludes resources
- [ ] **Links are valid**: "Visit" buttons navigate to correct URLs
- [ ] **Verification badges display**: Status shows "Verified", "Stale", or "Unverified"

---

## Common Issues

### TypeScript Error: "Property X does not exist"
**Cause**: Missing required field or typo in field name  
**Fix**: Check spelling and ensure all required fields are present

### Resource Doesn't Appear in Directory
**Cause**: Syntax error or invalid category  
**Fix**: 
1. Check for missing commas between objects
2. Verify category matches exactly (case-sensitive)
3. Run `npm run build` to see specific errors

### Search Doesn't Find Resource
**Cause**: Search checks `title`, `summary`, and `tags` fields  
**Fix**: Ensure keywords appear in one of these fields

---

## File Structure

```
src/data/resourceLinks.ts        ← Edit this file to update resources
src/lib/types.ts                 ← TypeScript interface (ResourceLink)
src/pages/resources-directory.tsx ← Directory page (reads resourceLinks)
src/components/resources/        ← Card and badge components
```

---

## Need Help?

Check these files for reference:
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Technical implementation details
- [src/data/resourceLinks.ts](./src/data/resourceLinks.ts) - Current resource dataset
- [src/lib/types.ts](./src/lib/types.ts) - ResourceLink TypeScript interface

---

**Status**: Static resource directory ready for updates
