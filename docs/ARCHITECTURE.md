# Architecture

High-level overview of The Father's Alliance web application structure, routing strategy, design system, and data model.

---

## App Architecture Overview

```
┌─────────────────────────────────────────┐
│  src/app.tsx (Root)                     │
│  - React Router setup                   │
│  - GA4 page tracking                    │
│  - Organization schema injection        │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼─────────┐  ┌──────▼──────────────┐
│  Layout.tsx    │  │ renderRoutes()      │
│  - Navbar      │  │ - routeRegistry →   │
│  - <Outlet />  │  │   React Router      │
│  - Footer      │  │   Routes/Route      │
└────────────────┘  └──────┬───────────────┘
                           │
                    ┌──────▼──────────────┐
                    │  routeRegistry.tsx  │
                    │  - RouteDef[]       │
                    │  - Nav config       │
                    │  - Auth meta        │
                    │  - SEO meta         │
                    └─────────────────────┘
```

**Key Insight**: The `routeRegistry` is the single source of truth for all routes, navigation visibility, auth requirements, and SEO metadata. This decouples route definition from component structure.

---

## Routing Strategy

### Route Registry Pattern

All routes are defined in [src/routes/routeRegistry.tsx](../src/routes/routeRegistry.tsx) as a typed array of `RouteDef` objects:

```typescript
export interface RouteDef {
  id: string;                    // Unique identifier
  path: string;                  // URL path
  element?: ReactElement;        // React component (omit if redirectTo)
  redirectTo?: string;           // Redirect target for aliases
  title: string;                 // Page title (SEO + breadcrumbs)
  description: string;           // Meta description
  group: 'core' | 'programs' | 'fsip' | 'resources' | 'portals' | 'legal' | 'system';
  nav: RouteNav;                 // Navigation visibility + order
  auth?: RouteAuth;              // Auth requirements (if any)
  status?: 'live' | 'draft' | 'archived';
}

interface RouteNav {
  header: boolean;               // Show in top navbar
  mobile: boolean;               // Show in mobile menu
  footer: boolean;               // Show in footer
  label: string;                 // Display name
  order: number;                 // Sort order (lower = first)
  highlight?: boolean;           // CTA styling (e.g., "Get Involved")
}

interface RouteAuth {
  required: boolean;
  role?: 'admin' | 'provider' | 'family';
}
```

**Benefits**:
- Single source of truth for routes, labels, visibility
- Navigation menus auto-build from registry
- Auth requirements centralized and testable
- SEO metadata co-located with routes
- Type-safe: TS catches misconfigurations

### Route Groups

Routes are organized by logical group for clarity:

| Group | Routes | Purpose |
|-------|--------|---------|
| `core` | home, who-we-serve, how-we-help, about, transparency, get-involved | Public information pages |
| `programs` | programs, program-fsip, program-mobility-stabilization | Program overviews |
| `fsip` | fsip, fsip-resource-hub, fsip-crisis-navigation, fsip-family-repair, fsip-provider-network, providers | FSIP program family |
| `resources` | resources, resources-directory | Resource directory pages |
| `portals` | portal, support-portal | Auth-protected user portals (placeholder) |
| `legal` | privacy-policy, terms-of-service | Legal pages |
| `system` | not-found | System pages (404, etc.) |

### Route Rendering

[src/routes/renderRoutes.tsx](../src/routes/renderRoutes.tsx) converts the registry into React Router compatible config:

```typescript
export function renderRoutes(registry: RouteDef[]) {
  return registry.map(route => 
    route.redirectTo 
      ? { path: route.path, element: <Navigate to={route.redirectTo} /> }
      : { path: route.path, element: route.element }
  );
}
```

**Router Config** (in `app.tsx`):
```tsx
<Routes>
  {renderRoutes(routeRegistry).map(route => 
    <Route key={route.path} {...route} />
  )}
</Routes>
```

---

## Layout & Page Composition

### Layout Hierarchy

```
Layout
├── Navbar
│   └── Navigation menu (built from routeRegistry.nav)
├── <Outlet />
│   └── Page component (home.tsx, programs.tsx, etc.)
└── Footer
    └── Link groups (built from routeRegistry.nav)
```

### Page Pattern

Each page component follows this structure:

```tsx
import { useEffect } from 'react';
import { updatePageMeta } from '../utils/seo';
import { pageCopy } from '../content/siteCopy';

export default function MyPage() {
  useEffect(() => {
    // Update page title + meta description
    updatePageMeta({
      title: 'Page Title',
      description: 'Meta description',
      path: '/my-page',
    });
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* Hero/intro section */}
      <section>
        <h1>{pageCopy.headline}</h1>
        <p>{pageCopy.body}</p>
      </section>

      {/* Content sections */}
      <SectionSurface>...</SectionSurface>
      <Card>...</Card>

      {/* CTA footer */}
      <section>
        <Link to="/">Next step</Link>
      </section>
    </div>
  );
}
```

**Pattern Benefits**:
- Consistent SEO metadata injection per-page
- Reusable layout, navigation, footer
- Page-specific copy in `siteCopy.ts`

---

## Design System

### Color Tokens (Semantic)

The app uses **CSS variable-based semantic tokens** that support dual themes (default + ops).

**Token Categories**:

| Token | Purpose | Default | Ops |
|-------|---------|---------|-----|
| `--color-ink` | Primary text | Charcoal | Cyan |
| `--color-muted` | Secondary text | Gray | Light gray |
| `--color-sand` | Warm accent | Beige/sand | Dark warm |
| `--color-surface` | Card/container bg | White | Dark slate |
| `--color-surface-muted` | Muted bg | Off-white | Darker slate |
| `--color-border-soft` | Light border | Light gray | Dark border |
| `--color-border-muted` | Muted border | Very light gray | Darker muted |
| `--color-ocean` | Primary CTA | Ocean blue | Bright cyan |
| `--color-forest` | Secondary CTA | Forest green | Neon green |
| `--color-danger` | Error/alert | Red | Bright red |
| `--color-danger-bg` | Error bg | Light red | Dark red bg |
| `--color-danger-border` | Error border | Red border | Bright red border |

**Tailwind Integration**:
```typescript
// tailwind.config.ts
colors: {
  ink: 'rgb(var(--color-ink-rgb) / <alpha-value>)',
  ocean: 'rgb(var(--color-ocean-rgb) / <alpha-value>)',
  // ...
}
```

**Usage in Components**:
```tsx
<div className="bg-surface text-ink border border-border-soft">
  <h1 className="text-ocean font-semibold">Headline</h1>
  <p className="text-muted">Body text</p>
</div>
```

**Token Validation**: Run `npm run lint:theme` to check that only registered tokens are used in CSS.

### Theme Toggle

Two mechanisms:

1. **Global Persistence** ([src/theme/applyTheme.ts](../src/theme/applyTheme.ts)):
   - `applyTheme('ops')` or `applyTheme('default')`
   - Writes to localStorage (`tfa-theme`)
   - Persists across sessions and pages
   - Use in header theme toggle button

2. **Page Override** ([src/theme/usePageTheme.ts](../src/theme/usePageTheme.ts)):
   - `usePageTheme('ops')` in a single page
   - Does **not** persist
   - Temporary override for specific pages
   - Use for special/demo pages

**Implementation**: CSS variables are set on `<html>` element and read by Tailwind.

### UI Component Primitives

- **Button.tsx** — Primary CTA, secondary, text-only variants
- **Card.tsx** — Reusable card container with optional header/footer
- **SectionSurface.tsx** — Styled section wrapper with edge accents (left/right), tone variants
- **VerificationBadge.tsx** — Resource verification status (verified, stale, unverified)
- **OutcomeButtons.tsx** — Outcome feedback buttons (success, feedback, etc.)
- **ThemeToggle.tsx** — Light/dark theme switcher

### Font Stack

```typescript
// tailwind.config.ts
fontFamily: {
  sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
  serif: ['Source Serif 4', 'DM Sans', 'serif'],
}
```

---

## Data Model

### Resource Directory

**Current State**: Static seed data in [src/data/resources.seed.ts](../src/data/resources.seed.ts)

**Structure**:
```typescript
interface Resource {
  id: string;
  slug: string;
  name: string;
  category: ResourceCategory;
  description: string;
  whatTheyProvide: string[];
  serviceArea: ServiceArea;
  tags: string[];
  eligibility: string[];
  howToApply: string[];
  requiredDocuments: string[];
  contactInfo: { phone?, email?, website?, address? };
  hours: string;
  verificationStatus: VerificationStatus; // 'verified' | 'stale' | 'unverified'
  lastVerified?: string;
  notes?: string;
}
```

**Categories**:
- Legal Services
- Housing Assistance
- Mental Health
- Employment Services
- Food & Basic Needs
- Healthcare
- Transportation
- Child Support
- Education & Training
- Emergency Services

### Site Copy

All page text is externalized in [src/content/siteCopy.ts](../src/content/siteCopy.ts):

```typescript
export const homeCopy = {
  headline: '...',
  mission: '...',
  // ...
}

export const programsCopy = {
  programs: [
    { title: '...', href: '...', summary: '...' }
  ]
}
```

**Pattern**: Pages import copy objects and render them, making updates to text trivial and centralized.

### Future Database Integration

**Prepared For**: Supabase auth + PostgreSQL

- [src/lib/supabase/](../src/lib/supabase/) directory exists (scaffolded)
- Resource directory is designed to swap seed data ↔ Supabase queries
- Auth placeholders in `portal.tsx` and `support-portal.tsx`
- `auth` field in `RouteDef` interface ready for auth gates

---

## What We Do / What We Don't

### In Scope

✅ **Core Functionality**
- Informational site for FSIP, MSP, and other programs
- Searchable resource directory (static, verification-aware)
- Crisis navigation guidance and next-steps
- Provider information and network overview
- Transparency + outcomes reporting

✅ **Technical**
- Fast, static SPA (zero backend runtime)
- GA4 analytics with custom events
- SEO (schema.org, sitemaps, meta tags)
- Dual theme support (default + ops aesthetic)
- Type-safe TypeScript, strict mode

### Out of Scope

❌ **NOT Provided by This Site**
- Legal advice (site includes explicit disclaimers)
- Clinical mental health services
- Direct financial assistance (info only)
- Real-time chat or crisis hotline (links to external services)
- User authentication (placeholder pages; backend TBD)
- Database of case files (future: Supabase + API)

❌ **NOT in Codebase**
- Backend APIs (future work)
- Authentication system (prepared but not implemented)
- Payment processing
- Email/SMS services

---

## Performance & SEO

### Page Metadata

Each route defines `title` and `description` for SEO:
```typescript
{
  id: 'home',
  path: '/',
  title: "The Father's Alliance — Stability Support...",
  description: 'We provide practical stability support...',
  // ...
}
```

### Structured Data

[src/utils/seo.ts](../src/utils/seo.ts) injects schema.org JSON-LD:
- **Organization schema** (app root + all pages)
- **Website schema** (homepage)
- Per-page metadata updates document head

### Sitemap & Robots

Generated at build time:
- [public/sitemap.xml](../public/sitemap.xml) — All routes + lastmod
- [public/robots.txt](../public/robots.txt) — Allow all, point to sitemap

**Generate**: `npm run build:sitemap`

### GA4 Integration

[src/app.tsx](../src/app.tsx) tracks page views with full context:

```typescript
gtag('event', 'page_view', {
  page_path: pagePath,
  page_location: window.location.href,
  page_title: document.title
});
```

---

## Build & Deployment Pipeline

### Local Build
```bash
npm run build
# Runs: generateSitemap.mjs → vite build
# Outputs: dist/ (static SPA)
```

### CI/CD
GitHub Actions (`.github/workflows/ci.yml`):
1. `npm ci` (clean install)
2. `npm run lint` (TypeScript type check)
3. `npm run lint:theme` (token validation)
4. `npm test` (route registry tests)
5. `npm run build` (production build)

### Deployment Targets
- Netlify (recommended)
- Vercel
- AWS S3 + CloudFront
- Cloudflare Pages
- Any static host

---

## File Organization Summary

```
src/
├── app.tsx              # Root router + GA4 setup
├── main.tsx             # Entry point
├── index.css            # Global styles
├── components/          # Shared UI
│   └── Layout, Navbar, Footer, Button, Card, etc.
├── pages/               # Route components (one per routeRegistry entry)
├── routes/              # Route registry + rendering
├── theme/               # Color tokens + theme switching
├── data/                # Static resources, seed data
├── content/             # Externalized copy/text
├── lib/                 # Utilities (types, supabase stubs)
└── utils/               # SEO, GA4, seo helpers

docs/                    # Documentation (this file, routes, content guide, etc.)
scripts/                 # Build scripts (sitemap, resources, lint)
public/                  # Static assets
```

---

## See Also

- [README.md](../README.md) — Quick start, scripts reference
- [ROUTES.md](./ROUTES.md) — Complete route list with purposes
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) — Writing style and page patterns
- [WORKFLOWS.md](./WORKFLOWS.md) — CI/CD and build commands
- [FSIP_SCOPE.md](./FSIP_SCOPE.md) — FSIP program details and boundaries
- [COLOR_SYSTEM_IMPLEMENTATION.md](./COLOR_SYSTEM_IMPLEMENTATION.md) — Token reference
- [OPS_THEME_USAGE.md](./OPS_THEME_USAGE.md) — Theme API guide

---

**Last Updated**: January 2026
