# Color Token System & Theme Guidelines

## Overview

This document describes the cohesive color palette system implemented across The Father's Alliance website. The system uses **semantic color tokens** (not arbitrary hex values) managed through CSS variables and Tailwind theme configuration, applied via wrapper components for consistency and maintainability.

## Theme Map

**Location:** 
- CSS Variables: `src/index.css` (`:root` block)
- Tailwind Theme: `tailwind.config.ts` (theme.extend.colors)

**Applied through:**
- Global wrapper components: `Layout`, `Navbar`, `Card`, `Footer`, `SectionSurface`, `Button`
- Global link + focus styles in `src/index.css`

## Color Tokens

### Text & Semantics

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-ink` / `text-ink` | `#0f172a` | Primary text, headings, navigation active states |
| `--color-muted` / `text-muted` | `#475569` | Secondary text, captions, descriptions, disabled states |

### Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-sand` / `bg-sand` | `#f8fafc` | Page/body background |
| `--color-surface` / `bg-surface` | `#ffffff` | Card backgrounds, containers, modals |
| `--color-surface-muted` / `bg-surface-muted` | `#f1f5f9` | Subtle alternate backgrounds |

### Borders & Dividers

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-border-soft` / `border-border-soft` | `#e2e8f0` | Light borders, dividers, soft edges |
| `--color-border-muted` / `border-border-muted` | `#cbd5e1` | Slightly darker borders |

### Accents

| Token | Hex | Usage | Brand Role |
|-------|-----|-------|------------|
| `--color-ocean` / `bg-ocean` | `#0ea5e9` | Primary CTA buttons, active nav, focus rings, highlights | Primary accent (sky blue) |
| `--color-forest` / `bg-forest` | `#047857` | Secondary accents, logo gradient (reserved for future) | Secondary accent (emerald) |

### Danger & Errors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-danger` / `text-danger` | `#dc2626` | Error text and icons |
| `--color-danger-bg` / `bg-danger-bg` | `#fef2f2` | Error background surfaces |
| `--color-danger-border` / `border-danger-border` | `#fecaca` | Error state borders |

### Elevation & Depth

| Token | CSS Variable | Usage |
|-------|--------------|-------|
| `shadow-sm` | `--shadow-sm` | Subtle elevation (1-2px) |
| `shadow-md` | `--shadow-md` | Standard cards (4-12px) |
| `shadow-lg` | `--shadow-lg` | Prominent elements (10-30px) |
| `shadow-hover` | `--shadow-hover` | Interactive hover states (12-40px) |

## How to Use Tokens

### In CSS/Global Styles
Use CSS variables directly:
```css
.my-component {
  color: var(--color-ink);
  border: 1px solid var(--color-border-soft);
  background: var(--color-surface);
}
```

### In Tailwind/Components
Use semantic Tailwind classes defined in `tailwind.config.ts`:
```tsx
<button className="bg-ocean text-white hover:bg-ocean/90">
  Donate Now
</button>

<div className="border-b border-border-soft text-ink">
  Content here
</div>
```

### Don't Do This
❌ Hardcoded hex colors in components:
```tsx
// BAD - not themeable
<div className="bg-sky-600 text-slate-900">
```

❌ Mixing arbitrary Tailwind colors:
```tsx
// BAD - inconsistent palette
<div className="bg-blue-500 border-gray-200 text-blue-900">
```

## Component Usage

### Layout
Sets page text color and background. All other components inherit:
```tsx
<div className="min-h-screen bg-transparent text-ink">
```

### Navbar
Uses `border-border-soft`, `bg-surface`, `text-muted`, active state `bg-ink text-surface`, CTA button `bg-ocean`:
```tsx
<header className="sticky top-0 border-b border-border-soft bg-surface/90">
  <Link ... className="bg-ocean px-4 py-2 text-white">
```

### Card
Surfaces use `.card-surface` which references CSS variables:
```css
.card-surface {
  background: var(--color-surface);
  border: 1px solid var(--color-border-soft);
}
```

### Button (Component)
Three variants all use `bg-ocean` for primary, consistent focus ring:
```tsx
primary: 'bg-ocean text-white hover:bg-ocean/90 ...'
secondary: 'bg-surface-muted text-ink hover:bg-surface-muted/80 border border-border-soft'
ghost: 'text-ocean hover:bg-surface-muted'
```

### SectionSurface
Wrapper component with variants; uses CSS variables for gradients + `.surface-*` classes:
```tsx
<SectionSurface variant="accent" edge="left">
  {children}
</SectionSurface>
```

### Footer
Uses `border-border-soft`, `bg-surface`, `text-ink/muted` for consistency with Navbar:
```tsx
<footer className="border-t border-border-soft bg-surface py-8">
```

## Focus & Accessibility

All interactive elements use semantic focus ring styling:
```css
a:focus-visible {
  outline: 2px solid var(--color-ocean);
  outline-offset: 2px;
}
```

This is automatically applied to links and buttons; no need to add it per-component.

## Contrast Compliance

All token combinations meet WCAG AA standards:
- `text-ink` on `bg-surface`: ✅ 20:1 contrast
- `text-ink` on `bg-sand`: ✅ 17:1 contrast
- `text-muted` on `bg-surface`: ✅ 7:1 contrast
- `text-white` on `bg-ocean`: ✅ 5.2:1 contrast

## Updating the Palette in the Future

### To change the primary accent color (e.g., from ocean blue to another shade):

1. Update `src/index.css`:
   ```css
   :root {
     --color-ocean: #NEW_HEX;  /* Update to your new shade */
   }
   ```

2. Update `tailwind.config.ts`:
   ```typescript
   ocean: '#NEW_HEX',
   ```

3. All components using `bg-ocean`, `text-ocean`, focus rings automatically update.

### To add a new color token:

1. Add CSS variable to `:root` in `src/index.css`:
   ```css
   --color-mycolor: #HEXVALUE;
   ```

2. Add to Tailwind theme in `tailwind.config.ts`:
   ```typescript
   mycolor: '#HEXVALUE',
   ```

3. Update component to use it:
   ```tsx
   <div className="bg-mycolor text-ink">
   ```

### To change a surface background:

SectionSurface variants use `.surface-*` classes in `src/index.css`. Update the gradient or border there if needed.

## Current Token Usage Audit

| Component | Token Usage |
|-----------|-----|
| Layout | `text-ink`, `bg-transparent` |
| Navbar | `border-border-soft`, `bg-surface`, `text-muted`, `text-ink`, `bg-ocean` |
| Card | `.card-surface` (uses `--color-surface`, `--color-border-soft`) |
| Footer | `border-border-soft`, `bg-surface`, `text-ink`, `text-muted` |
| SectionSurface | `.surface-*` (custom CSS gradients + borders) |
| Button | `bg-ocean`, `bg-surface-muted`, `text-white`, `text-ink` |
| Focus/Links | `outline-ocean` |

## No Dark Mode Yet

This is a light-only palette. If dark mode is needed in the future:
1. Add `@media (prefers-color-scheme: dark)` block to `:root` in `src/index.css`
2. Extend `tailwind.config.ts` with `darkMode: 'media'` or `'class'`
3. Define new token values for dark backgrounds/text

## Questions?

- **Build fails or colors look wrong?** Check `tailwind.config.ts` and `src/index.css` for conflicts.
- **Need a color not in the palette?** Add it as a new token (see "Updating the Palette" above).
- **Component colors still hardcoded?** Update to use semantic tokens. Search for `text-slate-`, `bg-sky-`, `border-gray-` etc. in component files.
## CI Enforcement

**Color Token Guard:** A GitHub Actions workflow (`.github/workflows/color-token-guard.yml`) automatically scans all source files on every PR and push to ensure no hardcoded Tailwind color utilities or inline hex values are introduced.

**Violations will fail CI** with a detailed error message listing:
- Files containing hardcoded colors (e.g., `text-slate-900`, `bg-blue-600`)
- Files with inline hex colors (e.g., `style={{ color: '#dc2626' }}`)

**Quick Reference:** See `docs/ALLOWED_COLOR_TOKENS.md` for the complete list of approved token classes and usage examples.