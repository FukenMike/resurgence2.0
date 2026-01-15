# SectionSurface Design System

## Overview

`SectionSurface` is a layout-neutral wrapper component that adds subtle visual depth and rhythm to page sections without changing structure or layout. It creates background "panels" that organize content visually.

## Design Principles

- **Non-intrusive**: Feels like a background wash, not a card-within-card
- **Minimal**: Relies on subtle gradients and borders; no heavy shadows
- **Consistent**: Uniform padding, radius, and spacing across variants
- **Accessible**: Proper contrast in all variants (including inverse)
- **Reversible**: Purely additive—removing the wrapper leaves content intact

## Variants

| Variant | Use Case | Visual Style |
|---------|----------|--------------|
| `default` | Informational sections, less prominent content | Very subtle gradient wash + light border |
| `muted` | Secondary content groups, card grids | Slightly stronger wash than default |
| `accent` | **Limited use**: highlight a key section per page | Light sky-blue wash, faint accent border |
| `inverse` | Anchor CTAs, closing sections, dark themes | Dark background with readable text overlay |

## Edge Accents

Optional thin accent borders that add visual hierarchy.

| Edge | Use Case |
|------|----------|
| `none` | Default; most sections |
| `left` | Primary feature groups or highlight sections |
| `top` | Header-like sections or opening content blocks |

| Tone | Use Case |
|------|----------|
| `accent` | Draws attention; use with `edge='left'` or `edge='top'` |
| `neutral` | Subtle hierarchy; safer for secondary sections |

## Design Rules

### Hard Constraints

1. **Max 1 edge accent per page** — Avoids visual clutter; maintains focus
2. **Max 1 accent variant per page** — Prevents competing highlights
3. **Inverse only for anchor CTAs** — Use for closing sections, dark themes, or prominent calls-to-action
4. **No nesting** — Do not wrap SectionSurface within SectionSurface
5. **Wrap sections, not cards** — Wrap entire `<section>` containers, not individual `Card` components

### Best Practices

- Use `default` or `muted` for most informational groups
- Reserve `accent` for the most important content cluster on a page
- Apply edges sparingly: 1 per page maximum
- Keep `.card-surface` styling unchanged (existing Card component)
- Maintain consistent gap/padding spacing inside wrapped sections

## Usage Example

```tsx
import SectionSurface from '../components/SectionSurface';
import Card from '../components/Card';

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero / intro section — no wrapper needed */}
      <section className="space-y-3">
        <h1>Headline</h1>
        <p>Intro text</p>
      </section>

      {/* Primary feature group — accent variant with edge */}
      <SectionSurface variant="accent" edge="left" edgeTone="accent">
        <section className="grid gap-4 md:grid-cols-3">
          <Card title="Feature 1">...</Card>
          <Card title="Feature 2">...</Card>
          <Card title="Feature 3">...</Card>
        </section>
      </SectionSurface>

      {/* Secondary info — muted variant, no edge */}
      <SectionSurface variant="muted">
        <section className="grid gap-4 md:grid-cols-2">
          <Card title="Info A">...</Card>
          <Card title="Info B">...</Card>
        </section>
      </SectionSurface>

      {/* Closing CTA — inverse variant */}
      <SectionSurface variant="inverse">
        <section className="space-y-4 text-center">
          <h2>Ready to get involved?</h2>
          <p>Your support makes a difference.</p>
          <button>Donate Now</button>
        </section>
      </SectionSurface>
    </div>
  );
}
```

## Current Usage

- **home.tsx**: Muted + left edge (accent tone) on Core Values/Pillars
- **about.tsx**: Default + top edge (accent tone) on Philosophy section
- **programs.tsx**: Muted + left edge (neutral tone) on Programs grid
- **get-involved.tsx**: Accent variant on Support section; default on cards

## Future Expansion

Before adding new variants or edges:
- Confirm alignment with design principles above
- Ensure max constraints are maintained per page
- Update this document with new usage patterns
- Test accessibility (contrast, focus states, motion)

## Styling Reference

See `src/index.css` for all `.surface-*` and `.surface-edge-*` classes.
