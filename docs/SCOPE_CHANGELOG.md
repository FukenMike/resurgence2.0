# Scope Changelog

All notable changes to project architecture, navigation, and documentation.

---

## 2026-01-26

### Added
- **FSIP Pages** (8 new routes): 
  - `/programs/fsip` - FSIP program overview hub
  - `/fsip` - Direct FSIP access alias
  - `/fsip/resource-hub` - Resource directory & search
  - `/fsip/crisis-navigation` - Crisis assessment & pathways
  - `/fsip/family-repair` - Family repair program phases
  - `/fsip/provider-network` - Provider partnership info
  - `/providers` - Provider resources
  - `/portal` & `/support-portal` - Portal entry points (placeholders)

- **Programs Navigation Update**:
  - FSIP added as first program with "Core Program" status
  - Programs array now: [FSIP, Mobility Stabilization]
  - Main navigation streamlined to 5 items (Home, Our Programs, FSIP, Resources, Transparency)
  - Footer navigation expanded to 7 items (includes Who We Serve, How We Help, About)

- **Documentation Updates**:
  - `NEXT_STEPS.md` rewritten: Static resource directory workflow (removed Supabase export instructions)
  - `docs/FSIP_SCOPE.md` created: FSIP architecture, boundaries, and route map
  - `docs/SCOPE_CHANGELOG.md` created: This file

### Technical Details
- All FSIP pages follow design system (text-ink, bg-surface, etc.)
- Routes added to `src/app.tsx` with proper React Router structure
- Program copy centralized in `src/content/siteCopy.ts`
- Navigation links managed separately (navLinks, footerLinks)
- Build passes: 0 TypeScript errors, 73.68 kB gzip

---

## 2025-01-07 (Earlier Phases - Reference)

### Phase 1-5: Infrastructure & GA4
- Supabase removal complete
- GA4 tracking configured (send_page_view: false)
- Legacy URL removal
- Copy humanization (replaced corporate voice)
- Double page_view fix (commit 55dafed)

---

**Repository**: [The Father's Alliance Site](https://github.com/)  
**Maintained by**: Engineering Team
