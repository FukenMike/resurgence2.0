# Routes

Complete list of all application routes from the route registry, with paths, purposes, access levels, and navigation configuration.

**Last Updated**: January 30, 2026

---

## Route Registry Overview

Routes are defined centrally in [src/routes/routeRegistry.tsx](../src/routes/routeRegistry.tsx) as a typed array. This document lists all routes with their paths, components, access requirements, and purposes.

**Navigation Visibility**:
- `header` — Shown in top navigation bar
- `mobile` — Shown in mobile menu
- `footer` — Shown in footer links
- `order` — Sort priority (lower numbers appear first)

**Access Levels**:
- `public` — No authentication required
- `gated (role)` — Authentication required with specific role (demo auth only)
- `legacy redirect` — Redirects to another route (nav-hidden)

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

## Resources

| Path | Component | Access | Header | Mobile | Footer | Purpose |
|------|-----------|--------|--------|--------|--------|---------|
| `/resources` | [resources-tools.tsx](../src/pages/resources-tools.tsx) | public | ✓ | ✓ | ✓ | Resources & tools landing; directory intro, quick links |
| `/resources/directory` | [resources-directory.tsx](../src/pages/resources-directory.tsx) | public | ✗ | ✓ | ✗ | Searchable resource directory; categories, search, verification status |
| `/resources/directory/:slug` | [resource-detail.tsx](../src/pages/resource-detail.tsx) | public | ✗ | ✗ | ✗ | Detail page for single resource; full info, feedback form |

---

## Portal Architecture

### Portal Entry

| Path | Component | Access | Header | Mobile | Footer | Purpose |
|------|-----------|--------|--------|--------|--------|---------|
| `/portals` | [portals.tsx](../src/pages/portals.tsx) | public | ✗ | ✗ | ✗ | Public entry page listing portal options; info about access |
| `/login` | [login.tsx](../src/pages/login.tsx) | public | ✗ | ✗ | ✗ | Demo role selector (family, provider, admin); localStorage-based session |

### Role-Gated Portals (Demo Auth)

| Path | Component | Access | Role | Header | Mobile | Footer | Purpose |
|------|-----------|--------|------|--------|--------|--------|---------|
| `/family-portal` | [family-portal.tsx](../src/pages/family-portal.tsx) | gated | family | ✗ | ✓ | ✗ | Family case management portal (placeholder UI) |
| `/provider-portal` | [provider-portal.tsx](../src/pages/provider-portal.tsx) | gated | provider | ✗ | ✓ | ✗ | Provider dashboard (placeholder UI) |

### Legacy Redirects (Nav Hidden)

| Path | Redirect Target | Access | Purpose |
|------|-----------------|--------|---------|
| `/portal` | `/family-portal` | public (no auth) | Legacy URL redirect (nav-hidden) |
| `/support-portal` | `/provider-portal` | public (no auth) | Legacy URL redirect (nav-hidden) |

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

**Current**: Demo authentication (localStorage-based role sessions)

**How Route Gating Works**:
- Routes with `auth.required: true` are wrapped in a `RequireAuth` component
- User must have a session in localStorage with matching role
- If not authenticated or role doesn't match: user is redirected to `/login?next=/original-path`
- After successful login with correct role: user is redirected back to original path

**Role-Gated Routes**:
- `/family-portal` requires `family` role
- `/provider-portal` requires `provider` role

**Note**: Demo auth is not secure and is for development/testing only. See [AUTH.md](./AUTH.md) for full details.

---

## Sitemap & SEO

**What is included in sitemap** (`public/sitemap.xml`):
- All public routes (not gated, not redirects, not admin)
- Example: `/`, `/who-we-serve`, `/resources/directory`, `/portals`, `/resources/directory/:slug` (all public resources)

**What is excluded from sitemap**:
- Auth-required routes (gated portals)
- Admin/draft routes (reserved namespaces)
- Legacy redirects
- Login page

**Generated by**: [scripts/generateSitemap.mjs](../scripts/generateSitemap.mjs)  
**Run manually**: `npm run build:sitemap`

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

- [STATUS.md](./STATUS.md) — Current platform status, staged features, boundaries
- [AUTH.md](./AUTH.md) — Demo authentication model and login flow
- [RESOURCE_DIRECTORY.md](./RESOURCE_DIRECTORY.md) — Resource data model and feedback components
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Routing strategy, route registry pattern
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) — Writing style and page composition patterns
- [README.md](../README.md) — Quick reference and setup

---

**Last Updated**: January 2026
