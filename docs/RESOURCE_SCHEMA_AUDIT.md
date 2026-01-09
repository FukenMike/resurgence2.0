# Supabase Resource Schema Audit

**Generated**: January 9, 2026  
**Purpose**: Identify type mismatches between Postgres schema and TypeScript definitions

---

## Executive Summary

### Status: ⚠️ **CRITICAL MISMATCHES FOUND**

Three major type mismatches exist between the database schema and TypeScript code:
1. **`access` field**: DB uses single ENUM, code treats as JSONB array
2. **`cost` field**: TypeScript uses `'sliding-scale'`, DB uses `'sliding'`
3. **`status` field**: TypeScript uses `'inactive'/'archived'`, DB uses `'paused'/'retired'`

---

## 1. Database Schema (Canonical Source)

### From `supabase/migrations/20260107153902_remote_schema.sql`

#### Enum Type Definitions

```sql
CREATE TYPE "public"."access_type" AS ENUM (
    'walk_in',
    'appointment',
    'referral',
    'online',
    'unknown'
);

CREATE TYPE "public"."cost_type" AS ENUM (
    'free',
    'sliding',      -- ⚠️ Note: 'sliding', not 'sliding-scale'
    'paid',
    'unknown'
);

CREATE TYPE "public"."resource_status" AS ENUM (
    'active',
    'paused',       -- ⚠️ Note: 'paused', not 'inactive'
    'retired'       -- ⚠️ Note: 'retired', not 'archived'
);

CREATE TYPE "public"."resource_category" AS ENUM (
    'housing',
    'food',
    'transportation',
    'legal',
    'healthcare',
    'mental_health',
    'employment',
    'education',
    'child_support',
    'emergency'
);

CREATE TYPE "public"."verification_status" AS ENUM (
    'verified',
    'stale',
    'unverified'
);

CREATE TYPE "public"."coverage_type" AS ENUM (
    'national',
    'state',
    'county',
    'city',
    'zip'
);
```

#### Resources Table Definition

```sql
CREATE TABLE "public"."resources" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "org_id" uuid,
    "slug" text NOT NULL,
    "title" text NOT NULL,
    "category" resource_category NOT NULL,
    "summary" text,
    "details" text,
    "cost" cost_type DEFAULT 'unknown' NOT NULL,        -- ENUM, not JSONB
    "access" access_type DEFAULT 'unknown' NOT NULL,    -- ⚠️ ENUM (single value), not JSONB array
    "eligibility" text,
    "how_to_apply" jsonb DEFAULT '[]' NOT NULL,
    "requirements" jsonb DEFAULT '[]' NOT NULL,
    "hours" text,
    "status" resource_status DEFAULT 'active' NOT NULL,
    "verification" verification_status DEFAULT 'unverified' NOT NULL,
    "last_verified_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
```

---

## 2. TypeScript Definitions

### From `src/lib/types.ts`

```typescript
export type VerificationStatus = 'verified' | 'stale' | 'unverified';  // ✅ MATCHES
export type AccessType = 'Walk-in' | 'Appointment' | 'Referral' | 'Online';  // ❌ CASE MISMATCH + MISSING 'unknown'
export type CostType = 'free' | 'paid' | 'sliding-scale';  // ❌ VALUE MISMATCH ('sliding-scale' vs 'sliding')
export type ServiceAreaCoverage = 'national' | 'state' | 'county' | 'city' | 'zip';  // ✅ MATCHES

export interface Resource {
  id: string;
  slug: string;
  title: string;
  category: string;  // ✅ Loose string (works)
  summary: string;
  details?: string;
  cost: CostType;  // ❌ Type mismatch
  access: string;  // ❌ CRITICAL: Treated as JSON string, but DB is ENUM
  eligibility?: string;  // ⚠️ Treated as JSON, DB is TEXT
  how_to_apply?: string;  // ✅ JSONB in DB
  requirements?: string;  // ✅ JSONB in DB
  hours?: string;
  status: 'active' | 'inactive' | 'archived';  // ❌ VALUE MISMATCH
  verification: VerificationStatus;  // ✅ MATCHES
  last_verified_at?: string;
  org_id: string;
  organization?: Organization;
  service_areas?: ServiceArea[];
}
```

---

## 3. Code Usage Analysis

### `src/lib/supabaseQueries.ts`

#### Access Field Parsing (Lines 200-210)
```typescript
// Access filter (parse JSON access field)
if (options.access && options.access !== 'All') {
  filtered = filtered.filter((r) => {
    try {
      const accessTypes = typeof r.access === 'string' ? JSON.parse(r.access) : r.access;
      return Array.isArray(accessTypes) && accessTypes.includes(options.access);
    } catch {
      return false;
    }
  });
}
```
**Issue**: Code attempts to `JSON.parse(r.access)` and treat it as an array, but **DB schema shows `access` is a single ENUM value**, not JSONB.

#### JSON Parsing Function (Lines 273-290)
```typescript
export function parseResourceJsonFields(resource: Resource): Resource {
  return {
    ...resource,
    access: typeof resource.access === 'string' ? JSON.parse(resource.access) : resource.access,
    // ...
  };
}
```
**Issue**: This tries to parse `access` as JSON, but if the DB truly has an ENUM, this will fail at runtime.

### `src/pages/resources-directory.tsx`

#### Access Types Dropdown (Line 103)
```typescript
const accessTypes = ['Walk-in', 'Appointment', 'Referral', 'Online'];
```
**Issues**:
- Case mismatch: `'Walk-in'` vs DB `'walk_in'`
- Missing `'unknown'` option from DB enum

#### Cost Filter (Lines 200-215)
```typescript
<option value="All">Any Cost</option>
<option value="free">Free</option>
<option value="sliding-scale">Sliding Scale</option>  {/* ❌ DB uses 'sliding' */}
<option value="paid">Paid</option>
```

#### Status Filter (Line 37)
```typescript
.eq('status', 'active')
```
**Issue**: Code only queries `'active'`, but DB has `'paused'` and `'retired'` (not `'inactive'` or `'archived'`).

---

## 4. Detailed Mismatch Summary

| Field | DB Type | DB Values | TypeScript Type | TypeScript Values | Match? |
|-------|---------|-----------|-----------------|-------------------|--------|
| **access** | `access_type` (ENUM) | `'walk_in'`, `'appointment'`, `'referral'`, `'online'`, `'unknown'` | `string` (treated as JSON array) | `'Walk-in'`, `'Appointment'`, `'Referral'`, `'Online'` | ❌ **CRITICAL** |
| **cost** | `cost_type` (ENUM) | `'free'`, `'sliding'`, `'paid'`, `'unknown'` | `'free' \| 'paid' \| 'sliding-scale'` | `'free'`, `'paid'`, `'sliding-scale'` | ❌ **CRITICAL** |
| **status** | `resource_status` (ENUM) | `'active'`, `'paused'`, `'retired'` | `'active' \| 'inactive' \| 'archived'` | `'active'`, `'inactive'`, `'archived'` | ❌ **CRITICAL** |
| **category** | `resource_category` (ENUM) | `'housing'`, `'food'`, etc. | `string` | Any string | ⚠️ Loose (works but not type-safe) |
| **verification** | `verification_status` (ENUM) | `'verified'`, `'stale'`, `'unverified'` | `'verified' \| 'stale' \| 'unverified'` | Same | ✅ **MATCHES** |
| **coverage** | `coverage_type` (ENUM) | `'national'`, `'state'`, `'county'`, `'city'`, `'zip'` | `'national' \| 'state' \| 'county' \| 'city' \| 'zip'` | Same | ✅ **MATCHES** |

---

## 5. Impact Assessment

### 🔴 **CRITICAL: `access` Field**

**Current Behavior**:
- Code tries to parse `access` as JSON array: `JSON.parse(r.access)`
- DB stores `access` as single ENUM value: `'walk_in'`, `'online'`, etc.

**Why It Might Be Working**:
1. Cloud DB schema may differ from pulled migration (need verification)
2. Supabase may serialize ENUMs as strings, and code coincidentally doesn't break
3. Or there's no data in the DB yet, so filters never execute

**Runtime Risk**: High — `JSON.parse('walk_in')` will throw error

### 🔴 **HIGH: `cost` Field**

**Current Behavior**:
- Code uses `'sliding-scale'` in filters and UI
- DB expects `'sliding'`

**Why It Might Be Working**:
- No data exists with cost='sliding', or
- Filters never match, silently failing

**Runtime Risk**: Medium — Wrong values, silent filter failures

### 🟡 **MEDIUM: `status` Field**

**Current Behavior**:
- Code queries `.eq('status', 'active')` only
- DB has `'paused'` and `'retired'`, but code references `'inactive'` and `'archived'`

**Why It Might Be Working**:
- Code only queries `'active'`, never sets/updates other statuses

**Runtime Risk**: Low for queries, High if inserting/updating

---

## 6. Root Cause Analysis

### Hypothesis: Schema Drift

The pulled migration (`20260107153902_remote_schema.sql`) may not reflect the **actual cloud database schema**. Possible explanations:

1. **Migration is stale**: Cloud DB was manually altered after this migration
2. **Access field was changed**: Originally ENUM, later altered to JSONB array to support multiple access types
3. **Cost/Status enums were updated**: Labels changed but migration not regenerated

### Evidence Supporting Drift:
- `parseResourceJsonFields()` function explicitly handles `access` as JSON
- Code consistently treats `access` as array throughout
- Multiple hardcoded references to `'sliding-scale'` and `'inactive'`

---

## 7. Recommended Fix Plans

### **Option A: Align TypeScript to DB Schema** (Recommended if DB is correct)

Assumes the migration file is accurate and cloud DB matches.

#### Changes Required:

**1. Update `src/lib/types.ts`:**
```typescript
// Align to DB enum values (lowercase, underscores)
export type AccessType = 'walk_in' | 'appointment' | 'referral' | 'online' | 'unknown';
export type CostType = 'free' | 'paid' | 'sliding' | 'unknown';
export type ResourceStatus = 'active' | 'paused' | 'retired';
export type ResourceCategory = 'housing' | 'food' | 'transportation' | 'legal' | 'healthcare' | 'mental_health' | 'employment' | 'education' | 'child_support' | 'emergency';

export interface Resource {
  // ...
  cost: CostType;
  access: AccessType;  // Single ENUM value, not array
  status: ResourceStatus;
  category: ResourceCategory;
  // ...
}
```

**2. Update `src/lib/supabaseQueries.ts`:**
- Remove `JSON.parse()` for `access` field
- Change filter logic to compare single ENUM value:
```typescript
// Access filter (single ENUM comparison)
if (options.access && options.access !== 'All') {
  filtered = filtered.filter((r) => r.access === options.access);
}
```
- Remove `parseResourceJsonFields()` call for `access` field

**3. Update `src/pages/resources-directory.tsx`:**
```typescript
const accessTypes = ['walk_in', 'appointment', 'referral', 'online'];
// Update UI labels separately if needed
```

**4. Update filter dropdowns:**
- Change `'sliding-scale'` → `'sliding'`
- Change `'inactive'` → `'paused'`, `'archived'` → `'retired'`

**Pros**: Type-safe, matches actual DB schema  
**Cons**: Requires code changes in multiple files, may break existing data expectations

---

### **Option B: Change DB Schema to Match Code** (If code expectations are correct)

Assumes the code is correct and DB should store arrays/different values.

#### Changes Required:

**1. Create new migration `supabase/migrations/<timestamp>_align_resource_types.sql`:**
```sql
-- Change access from ENUM to JSONB array
ALTER TABLE resources ALTER COLUMN access DROP DEFAULT;
ALTER TABLE resources ALTER COLUMN access TYPE jsonb USING 
  CASE 
    WHEN access::text = 'walk_in' THEN '["Walk-in"]'::jsonb
    WHEN access::text = 'appointment' THEN '["Appointment"]'::jsonb
    WHEN access::text = 'referral' THEN '["Referral"]'::jsonb
    WHEN access::text = 'online' THEN '["Online"]'::jsonb
    ELSE '[]'::jsonb
  END;
ALTER TABLE resources ALTER COLUMN access SET DEFAULT '[]'::jsonb;

-- Update cost_type enum
ALTER TYPE cost_type RENAME VALUE 'sliding' TO 'sliding-scale';

-- Update resource_status enum
ALTER TYPE resource_status RENAME VALUE 'paused' TO 'inactive';
ALTER TYPE resource_status RENAME VALUE 'retired' TO 'archived';
```

**2. Update `src/lib/types.ts`:**
```typescript
export interface Resource {
  // ...
  access: AccessType[];  // Array of access types
  // cost and status already correct in code
  // ...
}
```

**3. Regenerate types:**
```bash
npm run supabase:gen-types
```

**Pros**: Minimal code changes  
**Cons**: Requires schema migration, potential data loss, enum renames are tricky in Postgres

---

## 8. Next Steps

### Immediate Actions:

1. **Verify actual cloud schema** (run this from a connected environment):
   ```sql
   SELECT column_name, data_type, udt_name 
   FROM information_schema.columns 
   WHERE table_name = 'resources' 
   AND column_name IN ('access', 'cost', 'status');
   ```

2. **Check if data exists**:
   ```sql
   SELECT DISTINCT cost FROM resources;
   SELECT DISTINCT access FROM resources;
   SELECT DISTINCT status FROM resources;
   ```

3. **Run the audit script** (see below):
   ```bash
   npm run audit:supabase:resources
   ```

### Decision Matrix:

| Scenario | Recommendation |
|----------|---------------|
| **No data in DB yet** | Fix TypeScript (Option A) — safer to match schema |
| **Data exists with JSONB access** | DB migration is stale, regenerate with `supabase db pull` |
| **Data exists with ENUM access** | Fix TypeScript (Option A) + update UI |
| **Uncertain** | Run audit script, check cloud DB, then decide |

---

## 9. Automated Audit

Run the following command to perform automated static analysis:

```bash
npm run audit:supabase:resources
```

This will:
- Parse migration file for canonical DB schema
- Parse TypeScript types
- Compare and output mismatches in JSON format
- Exit with code 1 if mismatches found (CI-friendly)

---

## Appendix: Test Queries

### Verify Cloud Schema (Run in Supabase SQL Editor)

```sql
-- Check column types
SELECT 
  column_name,
  data_type,
  udt_name,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'resources'
  AND column_name IN ('access', 'cost', 'status', 'category')
ORDER BY ordinal_position;

-- Check enum values
SELECT 
  t.typname AS enum_name,
  e.enumlabel AS enum_value
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typname IN ('access_type', 'cost_type', 'resource_status', 'resource_category')
ORDER BY t.typname, e.enumsortorder;

-- Check actual data distribution
SELECT 
  cost, 
  access::text, 
  status, 
  COUNT(*) 
FROM resources 
GROUP BY cost, access, status;
```

---

**End of Audit Report**
