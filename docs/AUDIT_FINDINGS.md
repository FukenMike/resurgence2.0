# Documentation Audit Findings

**Date**: January 30, 2026  
**Scope**: Verify existing docs against current codebase behavior

---

## Key Mismatches Found

### 1. Route & Portal Architecture

**Issue**: Existing docs refer to `/portal` and `/support-portal` as protected portals, but current code shows:
- `/portals` is a PUBLIC entry page listing portal options
- `/family-portal` and `/provider-portal` are role-gated
- `/portal` and `/support-portal` are legacy redirects (no auth requirement, nav-hidden)
- `/login` page exists for demo role selection

**Current Reality**:
```
/portals (public) → entry page
├── /family-portal (role: family, gated)
└── /provider-portal (role: provider, gated)

/portal (legacy redirect to /family-portal, nav-hidden, no auth)
/support-portal (legacy redirect to /provider-portal, nav-hidden, no auth)
/login (public demo page)
```

**Docs Impact**: ROUTES.md table incorrectly lists portal routes; no mention of /login, /portals, or legacy redirects

---

### 2. Authentication Model

**Issue**: ROUTES.md states "No authentication implemented" but code shows:
- Demo auth via localStorage (roles: family, provider, admin)
- RequireAuth wrapper in renderRoutes gates family/provider portals
- /login page allows role selection (demo)
- Post-login redirects to /portals (or next= param)

**Docs Impact**: No AUTH.md; needs creation to explain demo model

---

### 3. Resource Directory

**Issue**: Code shows link-based dataset (resourceLinks.ts, resource-links.json) but docs don't clarify:
- Data source: resources.seed.ts + buildResourceLinks script
- Card flow: ResourceCard component → detail page via slug
- VerificationBadge + AdminNoteForm + OutcomeButtons are wired but UI state unclear

**Docs Impact**: No RESOURCE_DIRECTORY.md; ROUTES.md missing detail page info

---

### 4. Sitemap Behavior

**Issue**: ROUTES.md lacks details on what is excluded from sitemap:
- Auth-required routes excluded (/family-portal, /provider-portal)
- Legacy redirects excluded (/portal, /support-portal)
- /admin, /draft, /login excluded
- /portals IS included (public)

**Docs Impact**: No clarity in docs; generateSitemap.mjs script has logic but docs don't document it

---

### 5. Status & Roadmap

**Issue**: README.md claims "live production" but org/services are still in phased development:
- Portals are placeholder/phased
- Resource directory is link-based (not DB-backed yet)
- No actual direct services (org is coordinating + referring)

**Docs Impact**: README needs status clarification; needs STATUS.md

---

### 6. Missing Pages in ROUTES.md

- `/login` (demo role select page)
- `/portals` (public portal entry page)
- `/resources/directory/:slug` (detail page) — partially referenced
- `/portal` (legacy redirect)
- `/support-portal` (legacy redirect)

---

## Corrections Needed

| Item | Current State | Required State |
|------|---------------|-----------------|
| Routes table | Incomplete/outdated | Add login, portals, legacy redirects; clarify gating |
| Auth explanation | "Not implemented" | Explain demo localStorage model + route gating |
| Portal architecture | Confusing paths | Clarify /portals vs /family-portal vs /provider-portal |
| Resource directory | Vague | Document link-based model + card/detail flow |
| Sitemap info | Missing | Document exclusion rules |
| Status messaging | "Live production" | Clarify phased, demo-auth, link-based resource state |

---

## Files to Create/Update

1. **docs/STATUS.md** — Current state, staged features, boundaries
2. **docs/AUTH.md** — Demo auth model, login flow, security disclaimer
3. **docs/RESOURCE_DIRECTORY.md** — Data model, card/detail flow, verification
4. **docs/ROUTES.md** — Update table to include all routes correctly
5. **README.md** — Update status/overview; link to new docs

---

**Audit Complete**: Ready to implement corrections.
