# Routes

Complete list of all application routes from the route registry, with paths, purposes, and navigation configuration.

---

## Route Registry Overview

Routes are defined centrally in [src/routes/routeRegistry.tsx](../src/routes/routeRegistry.tsx) as a typed array. This document maps each route to its component and purpose.

**Navigation Visibility**:
- `header` — Shown in top navigation bar
- `mobile` — Shown in mobile menu
- `footer` — Shown in footer links
- `order` — Sort priority (lower numbers appear first)

---

## Core Pages

| Path | File | Label | Header | Mobile | Footer | Purpose |
|------|------|-------|--------|--------|--------|---------|
| `/` | [home.tsx](../src/pages/home.tsx) | Home | ✓ | ✓ | ✓ | Landing page; mission, vision, core values, program overview |
| `/who-we-serve` | [who-we-serve.tsx](../src/pages/who-we-serve.tsx) | Who We Serve | ✓ | ✓ | ✓ | Target audience; families under pressure, fathers/caregivers |
| `/how-we-help` | [how-we-help.tsx](../src/pages/how-we-help.tsx) | How We Help | ✓ | ✓ | ✓ | Support process; intake, stability check, deployment, pathways |
| `/about` | [about.tsx](../src/pages/about.tsx) | About | ✓ | ✓ | ✓ | Organization story, leadership, values, organizational approach |
| `/get-involved` | [get-involved.tsx](../src/pages/get-involved.tsx) | Get Involved | ✗ | ✓ | ✗ | Volunteer, donate, partner opportunities (CTA highlight) |
| `/transparency` | [transparency.tsx](../src/pages/transparency.tsx) | Transparency | ✓ | ✓ | ✓ | Financial reports, outcomes, accountability, metrics |

---

## Programs

| Path | File | Label | Header | Mobile | Footer | Purpose |
|------|------|-------|--------|--------|--------|---------|
| `/programs` | [programs.tsx](../src/pages/programs.tsx) | Our Programs | ✓ | ✓ | ✓ | Program overview; FSIP, MSP, micro assistance, forward pathways |
| `/programs/mobility-stabilization` | [program-mobility-stabilization.tsx](../src/pages/program-mobility-stabilization.tsx) | Mobility Stabilization | ✗ | ✗ | ✗ | MSP details; vehicle repair, transportation stability |

---

## FSIP Program Family

| Path | File | Label | Header | Mobile | Footer | Purpose |
|------|------|-------|--------|--------|--------|---------|
| `/programs/fsip` | [program-fsip.tsx](../src/pages/program-fsip.tsx) | FSIP | ✓ | ✓ | ✗ | Family Stability Intervention Program overview; four integrated domains |
| `/fsip` | — | FSIP (Direct) | ✗ | ✓ | ✗ | Redirect to `/programs/fsip` |
| `/fsip/resource-hub` | [fsip-resource-hub.tsx](../src/pages/fsip-resource-hub.tsx) | Resource Hub | ✗ | ✓ | ✗ | Searchable directory of verified family support resources |
| `/fsip/crisis-navigation` | [fsip-crisis-navigation.tsx](../src/pages/fsip-crisis-navigation.tsx) | Crisis Navigation | ✗ | ✓ | ✗ | Emergency triage, rapid assessment, immediate resource matching |
| `/fsip/family-repair` | [fsip-family-repair.tsx](../src/pages/fsip-family-repair.tsx) | Family Repair | ✗ | ✓ | ✗ | Family relationship rebuilding; phase-based intervention pathway |
| `/fsip/provider-network` | [fsip-provider-network.tsx](../src/pages/fsip-provider-network.tsx) | Provider Network | ✗ | ✓ | ✗ | Coordinated care across vetted providers; network overview |
| `/providers` | [providers.tsx](../src/pages/providers.tsx) | Providers | ✗ | ✓ | ✗ | For service providers; partnership, network info, portal link |

---

## Resources

| Path | File | Label | Header | Mobile | Footer | Purpose |
|------|------|-------|--------|--------|--------|---------|
| `/resources` | [resources-tools.tsx](../src/pages/resources-tools.tsx) | Resources | ✓ | ✓ | ✓ | Resources & tools landing; directory intro, quick links |
| `/resources/directory` | [resources-directory.tsx](../src/pages/resources-directory.tsx) | Directory | ✗ | ✓ | ✗ | Searchable resource directory; categories, filters, verification status |

---

## Portals (Auth Protected)

| Path | File | Label | Header | Mobile | Footer | Role | Purpose |
|------|------|-------|--------|--------|--------|------|---------|
| `/portal` | [portal.tsx](../src/pages/portal.tsx) | Family Portal | ✗ | ✓ | ✗ | `family` | Secure family case access (placeholder; auth TBD) |
| `/support-portal` | [support-portal.tsx](../src/pages/support-portal.tsx) | Provider Portal | ✗ | ✓ | ✗ | `provider` | Provider dashboard for case management (placeholder; auth TBD) |

---

## Legal & Policy

| Path | File | Label | Header | Mobile | Footer | Purpose |
|------|------|-------|--------|--------|--------|---------|
| `/privacy-policy` | [privacy-policy.tsx](../src/pages/privacy-policy.tsx) | Privacy Policy | ✗ | ✓ | ✗ | Data collection, use, protection policies |
| `/terms-of-service` | [terms-of-service.tsx](../src/pages/terms-of-service.tsx) | Terms of Service | ✗ | ✓ | ✗ | Terms and conditions for website use |

---

## System

| Path | File | Label | Header | Mobile | Footer | Purpose |
|------|------|-------|--------|--------|--------|---------|
| `*` | [not-found.tsx](../src/pages/not-found.tsx) | Not Found | ✗ | ✗ | ✗ | 404 catch-all; page not found |

---

## Route Groups

Routes are organized by logical group for clarity and navigation building:

### `core` (6 routes)
Public information pages: Home, Who We Serve, How We Help, About, Transparency, Get Involved

### `programs` (2 routes)
Program overviews: Our Programs, Mobility Stabilization

### `fsip` (7 routes)
FSIP program family: Main program, Resource Hub, Crisis Navigation, Family Repair, Provider Network, Providers, Direct alias

### `resources` (2 routes)
Resource directory: Resources landing, Directory search/browse

### `portals` (2 routes)
Auth-protected portals: Family Portal, Provider Portal

### `legal` (2 routes)
Legal pages: Privacy Policy, Terms of Service

### `system` (1 route)
System pages: 404 Not Found

---

## Navigation Menus

### Header Navigation (Order)

1. Home
2. Who We Serve
3. Our Programs
4. How We Help
5. About
6. Resources
7. Transparency

### Mobile Navigation (Order)

Includes all header items plus:
- Get Involved
- Mobility Stabilization
- FSIP (Direct)
- Resource Hub
- Crisis Navigation
- Family Repair
- Provider Network
- Providers
- Directory
- Family Portal
- Provider Portal
- Privacy Policy
- Terms of Service

### Footer Navigation (Order)

Same as header navigation, consolidated for space efficiency.

---

## Authentication Status

**Current**: No authentication implemented.

**Auth Placeholders**:
- `/portal` — Family portal (requires `family` role)
- `/support-portal` — Provider portal (requires `provider` role)

Both pages display placeholder UI. Auth integration (Supabase, etc.) is scaffolded in [src/lib/supabase/](../src/lib/supabase/) for future implementation.

---

## SEO & Metadata

Every route defines:
- `title` — Page title (used for \<title>, breadcrumbs, browser tab)
- `description` — Meta description (used in \<meta name="description">)

Example:
```typescript
{
  id: 'home',
  path: '/',
  title: "The Father's Alliance — Stability Support That Keeps Families Moving Forward",
  description: 'We provide practical stability support that keeps households housed, mobile, and moving forward—especially when standard assistance is slow or out of reach.',
  // ...
}
```

These are injected per-page via [src/utils/seo.ts](../src/utils/seo.ts) `updatePageMeta()`.

---

## Redirects

One redirect (alias) is defined:
- `/fsip` → `/programs/fsip` (direct access to FSIP program)

---

## Adding a New Route

1. Create page component in `src/pages/my-page.tsx`
2. Add route definition to `routeRegistry` in `src/routes/routeRegistry.tsx`:
   ```typescript
   {
     id: 'my-page',
     path: '/my-page',
     element: <MyPage />,
     title: 'My Page',
     description: 'Short description for SEO',
     group: 'core', // Pick appropriate group
     nav: {
       header: true,  // Show in header navigation?
       mobile: true,  // Show in mobile menu?
       footer: true,  // Show in footer?
       label: 'My Page',
       order: 50,     // Sort order (higher = lower priority)
     },
     // auth: { required: false }, // Optional: set if auth required
   },
   ```
3. Page component is automatically included in router config
4. Navigation menus build from registry automatically

---

## Testing Routes

Run route validation tests:
```bash
npm run test:routes
```

Tests in [src/routes/routeRegistry.test.ts](../src/routes/routeRegistry.test.ts) verify:
- No duplicate route IDs
- No duplicate paths
- All nav labels are present
- Order values are sensible
- Required metadata is present

---

## See Also

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Routing strategy, route registry pattern
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) — Writing style and page composition patterns
- [README.md](../README.md) — Quick reference and scripts

---

**Last Updated**: January 2026
