# Platform Status

**Last Updated**: January 30, 2026  
**Current Status**: Active development with core programs, demo authentication, and phased portal rollout

---

## What Exists Now (Live)

### Core Platform
- **Public website**: Information about The Father's Alliance, mission, programs, resources
- **Routing infrastructure**: centralized routeRegistry with type-safe route definitions, navigation, auth metadata
- **Design system**: Semantic color tokens, theme switching (light/dark, ops theme), responsive layouts
- **SEO & analytics**: GA4 page tracking, structured schema, sitemap generation, per-page metadata
- **CI/CD**: GitHub Actions workflow with lint, type check, test, build pipeline

### Programs & Content
- **FSIP (Family Stability Intervention Program)**: Overview page describing four integrated domains (crisis navigation, resource hub, family repair, provider network)
- **Mobility Stabilization Program**: Vehicle repair assistance overview
- **Resource Directory**: Link-based directory with categories, search, verification status awareness, detail pages

### Demo Authentication & Portals
- **Login page**: Demo role selector (family, provider, admin roles); localStorage-based session
- **Portals entry** (`/portals`): Public page listing portal options and access info
- **Family Portal** (`/family-portal`): Role-gated page for family users (placeholder UI)
- **Provider Portal** (`/provider-portal`): Role-gated page for provider users (placeholder UI)
- **Route gating**: RequireAuth wrapper enforces role-based access on gated routes

### Resource & Content Tools
- **Resource directory component**: Cards with search, category filters, verification badges
- **Detail pages**: Dynamic slug-based resource detail view
- **Feedback wiring**: OutcomeButtons, AdminNoteForm components present but state not yet wired
- **Seed data system**: resources.seed.ts provides static data; buildResourceLinks compiles to JSON

---

## What Is Staged / Placeholder

### Portal Features
- **Family and provider portals** are placeholder UI (no real case management, dashboard functionality, or data integration yet)
- **Role-based gating** is demo-only (localStorage session; not real authentication)
- **Portal auth flow** redirects post-login to `/portals` entry page unless `next=` param provided
- **Portal release timeline** follows phased rollout (infrastructure ready, feature development in progress)

### Resource Directory Data
- **Data source**: Link-based (static seed data compiled to JSON)
- **Future**: Prepared for database integration (Supabase scaffolding in place)
- **Verification status**: UI recognizes status labels but no dynamic verification logic yet

### Feedback & Outcomes
- **OutcomeButtons** and **AdminNoteForm** components are wired in UI but do not persist data
- **VerificationBadge** renders status labels; state management TBD

---

## What Is Planned (Near-term)

- **Real authentication**: Replace demo localStorage with secure auth (Supabase or similar)
- **Portal features**: Case management dashboard, resource recommendations, family/provider workflows
- **Database-backed resources**: Link-based directory → searchable, sortable, filterable resource dataset
- **Feedback persistence**: Connect OutcomeButtons and AdminNoteForm to backend
- **Household Stability Micro Assistance**: Rent, utility, emergency support program (in design)
- **Forward Pathways Bridge**: Workforce and education pathway program (planned)

---

## What Is NOT Implemented

- **Direct service delivery**: The Father's Alliance is a coordinating and referring organization, not a direct service provider
- **Legal or clinical services**: No legal advice, clinical counseling, or clinical assessment
- **Guarantees of service**: Resource referrals and availability depend on external provider networks (no SLA)
- **Real authentication**: Current auth is demo only (localStorage, no security audits)
- **Database persistence**: All data is static (seed files, no live DB)
- **Real payment processing**: No integration with payment systems
- **SMS/email automation**: Manual communication only (no automated workflows yet)

---

## Boundaries & Disclaimers

1. **Demo mode**: Portal roles, login flow, and session management are for demonstration only
2. **Phased rollout**: Portal features will be deployed incrementally as infrastructure and security are finalized
3. **External dependencies**: Resource availability depends on external providers; The Father's Alliance does not guarantee service
4. **No service guarantees**: Information and resources are provided as-is; no liability or SLA
5. **Regional**: Services and resources are specific to our service area (boundaries defined in operations)

---

## Deployment Status

- **Frontend**: Production-ready static site (Netlify, Vercel, S3+CloudFront compatible)
- **Build**: `npm run build` generates dist/ with sitemap.xml, hashed assets, optimized bundle
- **Hosting**: Any static host (Netlify, Vercel, AWS S3, Cloudflare Pages)
- **Environment**: No backend runtime needed; static data + external APIs (GA4, future Supabase)

---

## Architecture Readiness

- **Routing**: Centralized routeRegistry pattern; extensible for new pages/portals
- **Auth scaffolding**: RequireAuth wrapper in place; ready to integrate real auth provider
- **Database scaffolding**: Supabase client initialized; ready for resource DB + case management
- **Theming**: Semantic color tokens support dual themes; infrastructure mature
- **SEO/Analytics**: GA4 tracking and structured data in place
- **Testing**: Route registry contract tests catch configuration errors

---

## For Developers

To understand current capabilities and plan future work:
- See [AUTH.md](./AUTH.md) for demo authentication model
- See [ROUTES.md](./ROUTES.md) for complete route list and gating rules
- See [RESOURCE_DIRECTORY.md](./RESOURCE_DIRECTORY.md) for resource data architecture
- See [ARCHITECTURE.md](./ARCHITECTURE.md) for app structure and routing strategy
- See [README.md](../README.md) for local dev setup and build commands

---

**Key Takeaway**: The Father's Alliance platform is a modern, infrastructure-ready web application with a foundation for secure authentication, role-based portals, and resource management. Current focus is phased feature rollout while maintaining a public information site.
