# The Father's Alliance

A React + Vite + TypeScript static website for The Father's Alliance, a family stability support organization. The site provides information about programs, resources, phased portal infrastructure, and demo role-based access.

**Status**: Active development with core programs live, portals in phased rollout, and demo authentication

---

## What We Do

The Father's Alliance provides supplemental, practical stability support to families experiencing rent gaps, transportation failures, utilities disruption, or sudden financial strain. We focus on outcomes-driven support that prevents crises and restores forward momentum.

**Key Programs**:
- **FSIP (Family Stability Intervention Program)**: Coordinated support framework with crisis navigation, resource hub, family repair pathways, and provider network
- **Mobility Stabilization Program (MSP)**: Vehicle repair assistance to prevent stability harm
- **Household Stability Micro Assistance**: Targeted short-term rent, utility, and emergency support (in design)
- **Forward Pathways Bridge**: Structured bridge into workforce and education pathways (planned)

**Important**: The Father's Alliance is a coordinating and referring organization, not a direct service provider. We provide information and referrals but do not deliver legal, clinical, or guaranteed services.

---

## What's Implemented (Current)

---

## Tech Stack

- **Runtime**: Node.js 20+ (see CI config)
- **Framework**: React 18 + React Router v6
- **Build**: Vite 6
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4 + PostCSS with semantic color tokens
- **Analytics**: GA4 with custom page_view tracking
- **SEO**: Structured data (Organization + Website schema)
- **Package Manager**: npm

---

## What's Implemented (Current)

- ✓ Public information site: mission, programs, resources, transparency
- ✓ Route-driven architecture with centralized navigation
- ✓ Resource directory with search, categories, verification status
- ✓ Demo authentication (localStorage-based roles: family, provider, admin)
- ✓ Portal entry page and role-gated portals (placeholder UI)
- ✓ Login page with role selector
- ✓ Semantic color tokens and dual theme support
- ✓ GA4 analytics with custom page tracking
- ✓ SEO infrastructure: structured data, per-page metadata, sitemap generation
- ✓ CI/CD pipeline: lint, type check, test, build
- ✓ Route validation tests

See [docs/STATUS.md](./docs/STATUS.md) for details on what is staged, planned, or not implemented.



## Local Dev Setup

### Prerequisites
- Node.js 20+ (check [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for canonical version)
- npm

### Install & Run
```bash
npm install
npm run dev
```
Dev server opens at `http://localhost:5173` with hot reload.

### Build for Production
```bash
npm run build
npm run preview  # Serve dist/ locally
```
Outputs to `dist/` ready for static hosting (Netlify, Vercel, etc.).

---

## NPM Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server on port 5173 with hot reload |
| `npm run build` | Compile app + generate sitemap → `dist/` |
| `npm run build:resources` | Update resource links from seed data |
| `npm run build:sitemap` | Generate sitemap.xml for SEO |
| `npm run preview` | Serve production build locally |
| `npm run lint` | TypeScript type check (no emit) |
| `npm run lint:theme` | Check for theme token violations |
| `npm run lint:all` | Run all lints (type + theme) |
| `npm run test` | Run route registry test suite |
| `npm run test:routes` | Alias for `test` |

---

## Repo Structure

```
src/
├── app.tsx                 # Root app with React Router setup + GA4 tracking
├── main.tsx               # Entry point
├── index.css              # Global styles
├── components/            # Shared UI components
│   ├── Layout.tsx         # Main app shell (Navbar, Outlet, Footer)
│   ├── Navbar.tsx         # Top navigation with route-based menu
│   ├── Footer.tsx         # Footer with link groups
│   ├── Card.tsx           # Reusable card component
│   ├── Button.tsx         # Button primitives
│   ├── ThemeToggle.tsx    # Light/dark theme switcher
│   ├── SectionSurface.tsx # Styled section wrapper
│   ├── resources/         # Resource directory UI (ResourceCard, etc.)
│   └── ui/                # Lower-level UI primitives
├── pages/                 # Routed page components (one per route)
│   ├── home.tsx
│   ├── who-we-serve.tsx
│   ├── programs.tsx
│   ├── program-fsip.tsx
│   ├── fsip-*.tsx         # FSIP sub-pages (resource-hub, crisis-navigation, etc.)
│   ├── resources-*.tsx    # Resource directory pages
│   ├── portal.tsx         # Auth-protected portals (placeholders)
│   └── [privacy, terms, 404, etc.]
├── routes/
│   ├── routeRegistry.tsx  # Central route definition with metadata + nav config
│   ├── renderRoutes.tsx   # Utility to render routeRegistry as React Router config
│   └── routeRegistry.test.ts # Route validation tests
├── theme/
│   ├── theme.ts           # Theme constants (theme names, storage key)
│   ├── applyTheme.ts      # Global theme persistence to localStorage
│   └── usePageTheme.ts    # Temporary page-level theme override hook
├── data/
│   ├── resources.seed.ts  # Resource directory seed data (static)
│   ├── resourceLinks.ts   # Generated resource links file
│   └── resource-*.json    # Raw/generated resource data
├── content/
│   └── siteCopy.ts        # All page text and copy (externalized for easy updates)
├── lib/
│   ├── types.ts           # Shared TypeScript types
│   ├── resourceGuards.ts  # Type guards for resources
│   ├── resourceLinks.ts   # Resource link utilities
│   └── supabase/          # Supabase integration (prepared for auth/DB)
├── utils/
│   └── seo.ts             # GA4 tracking + schema.org helpers
└── scripts/
    ├── buildResourceLinks.mjs  # Compile resource seed to JSON
    ├── generateSitemap.mjs     # Generate sitemap.xml
    └── check-theme-violations.js # Lint theme token usage

docs/               # Documentation
public/             # Static assets (robots.txt, sitemap.xml)
vite.config.ts      # Vite config (React plugin, dev port 5173)
tailwind.config.ts  # Tailwind theme extension (semantic color tokens)
tsconfig.json       # TypeScript config (ES2020, strict mode)
```

---

## Deployment / Hosting

**Build Output**: `dist/` is a pure static SPA—ready for any static host.

**Recommended Hosts**:
- **Netlify**: Connect repo, set build command to `npm run build`, publish dir to `dist/`
- **Vercel**: Same, will auto-detect
- **AWS S3 + CloudFront**: Manual or CI/CD via AWS CLI
- **Cloudflare Pages**: Connect repo directly

**Environment**: No backend runtime needed. All data is static or fetched from external APIs (GA4, resource seeds).

---

## CI/CD

**GitHub Actions**: See [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

- Runs on `push` to `main` and all PRs
- Node.js 20 with npm cache
- Steps: `npm ci` → lint → type check → test → build
- Lint/theme/typecheck are soft-fail (`continue-on-error: true`)
- Build must pass

**Local CI Check**:
```bash
npm run lint:all
npm run test:routes
npm run build
```

---

## Key Features

- **Route-driven architecture**: Central `routeRegistry` defines all pages, navigation structure, auth requirements, and SEO metadata
- **Semantic color tokens**: Tailwind extends with CSS variables (ink, ocean, forest, etc.) supporting dual themes (default + ops)
- **Theme persistence**: `applyTheme()` persists user choice to localStorage; `usePageTheme()` overrides per-page
- **Resource directory**: Searchable, categorized, verification-status-aware directory of family support services (static seed data, prepared for DB)
- **GA4 integration**: Custom page_view events on route change with full context
- **SEO**: Structured data (Organization + Website schemas), per-page metadata, sitemap generation
- **Type-safe**: Full TypeScript strict mode, route validation tests

---

## Documentation

- [**STATUS.md**](./docs/STATUS.md) — Current platform status, phased features, boundaries, and roadmap
- [**ROUTES.md**](./docs/ROUTES.md) — Complete route list with access levels, purposes, and gating rules
- [**AUTH.md**](./docs/AUTH.md) — Demo authentication model, login flow, and security disclaimer
- [**RESOURCE_DIRECTORY.md**](./docs/RESOURCE_DIRECTORY.md) — Resource data model, card/detail flow, feedback components
- [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md) — App structure, routing strategy, design system
- [**CONTENT_GUIDE.md**](./docs/CONTENT_GUIDE.md) — Writing style, page patterns, tone, boundaries
- [**WORKFLOWS.md**](./docs/WORKFLOWS.md) — CI overview, build commands, deployment flow
- [**FSIP_SCOPE.md**](./docs/FSIP_SCOPE.md) — FSIP program architecture and boundaries
- [**COLOR_SYSTEM_IMPLEMENTATION.md**](./docs/COLOR_SYSTEM_IMPLEMENTATION.md) — Design token details
- [**OPS_THEME_USAGE.md**](./docs/OPS_THEME_USAGE.md) — Theme switching API and use cases

---

## Contributing

1. **Create a branch** from `main`
2. **Make changes** (see relevant docs: [ARCHITECTURE.md](./docs/ARCHITECTURE.md), [CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md))
3. **Test locally**: `npm run dev`, `npm run lint:all`, `npm run build`
4. **Push & open PR** against `main`
5. **CI runs automatically**; fix any lint/test failures
6. **Merge after review**; CI builds and can be deployed

### Common Tasks

**Add a new page**:
1. Create file in `src/pages/`
2. Add route definition to `routeRegistry` in `src/routes/routeRegistry.tsx`
3. Import page component in routeRegistry (auto-included in render)
4. Add copy/text to `src/content/siteCopy.ts` if needed

**Update text/copy**:
- Edit `src/content/siteCopy.ts` (all site copy lives here)

**Update styling**:
- Use semantic color tokens (ink, ocean, forest, danger, etc.) from Tailwind config
- Extend theme in `tailwind.config.ts` if new tokens needed
- Check token usage with `npm run lint:theme`

**Update resources**:
- Edit `src/data/resources.seed.ts`
- Run `npm run build:resources`

---

## Support

For questions or issues:
- Check [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for design questions
- Check [CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md) for writing/tone guidance
- Check [ROUTES.md](./docs/ROUTES.md) for route/page details
- Review existing pages in `src/pages/` for examples

---

**Last Updated**: January 30, 2026  
**Project Status**: Active development with core programs live, demo portals, phased feature rollout
