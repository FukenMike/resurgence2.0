# Color Token System - Quick Reference

## ✅ Allowed Color Classes

**Always use semantic token names instead of hardcoded Tailwind utilities.**

### Text Colors
```tsx
text-ink           // Primary text (headings, body copy) - #0f172a
text-muted         // Secondary text (captions, labels) - #475569
text-ocean         // Primary accent text/links - #0ea5e9
text-forest        // Secondary accent text - #047857
text-danger        // Error text - #dc2626
```

### Background Colors
```tsx
bg-sand            // Page background - #f8fafc
bg-surface         // Card/panel background (white) - #ffffff
bg-surface-muted   // Subtle surface alternative - #f1f5f9
bg-ocean           // Primary accent background - #0ea5e9
bg-forest          // Secondary accent background - #047857
bg-danger-bg       // Error background - #fef2f2
```

### Border Colors
```tsx
border-border-soft   // Light borders - #e2e8f0
border-border-muted  // Medium borders - #cbd5e1
border-ocean         // Primary accent border - #0ea5e9
border-danger-border // Error border - #fecaca
```

### Ring/Focus Colors
```tsx
ring-ocean         // Primary focus ring - #0ea5e9
ring-danger        // Error focus ring - #dc2626
```

### Shadow/Elevation
```tsx
shadow-sm          // Subtle elevation
shadow-md          // Standard elevation (default for cards)
shadow-lg          // Prominent elevation
shadow-hover       // Interactive hover state
```

---

## ❌ Prohibited Classes

**These are NOT allowed and will fail CI:**

```tsx
// ❌ WRONG - Hardcoded Tailwind color utilities
text-slate-900
bg-blue-600
border-gray-200
ring-sky-500
text-red-700

// ❌ WRONG - Inline hex colors
style={{ backgroundColor: '#0ea5e9' }}
style={{ color: '#dc2626' }}
```

---

## 🛠️ How to Use Tokens

### In Components (Tailwind Classes)
```tsx
// ✅ CORRECT
<div className="bg-surface border border-border-soft text-ink">
  <h2 className="text-ocean">Heading</h2>
  <p className="text-muted">Body text with optimal readability</p>
</div>

// ✅ Error state
<div className="bg-danger-bg border border-danger-border">
  <p className="text-danger">Error message</p>
</div>
```

### In CSS Files (CSS Variables)
```css
/* ✅ CORRECT - Use CSS variables */
.custom-component {
  background: var(--color-surface);
  color: var(--color-ink);
  border: 1px solid var(--color-border-soft);
  box-shadow: var(--shadow-md);
}

.custom-component:hover {
  box-shadow: var(--shadow-hover);
  border-color: var(--color-ocean);
}
```

---

## 🎨 Token Reference

### Color Token Map

| Token | CSS Variable | Hex | Usage |
|-------|--------------|-----|-------|
| `text-ink` | `--color-ink` | `#0f172a` | Primary text |
| `text-muted` | `--color-muted` | `#475569` | Secondary text |
| `bg-sand` | `--color-sand` | `#f8fafc` | Page background |
| `bg-surface` | `--color-surface` | `#ffffff` | Card background |
| `bg-surface-muted` | `--color-surface-muted` | `#f1f5f9` | Subtle surface |
| `border-border-soft` | `--color-border-soft` | `#e2e8f0` | Light border |
| `border-border-muted` | `--color-border-muted` | `#cbd5e1` | Medium border |
| `text-ocean` / `bg-ocean` | `--color-ocean` | `#0ea5e9` | Primary accent |
| `text-forest` / `bg-forest` | `--color-forest` | `#047857` | Secondary accent |
| `text-danger` | `--color-danger` | `#dc2626` | Error text |
| `bg-danger-bg` | `--color-danger-bg` | `#fef2f2` | Error background |
| `border-danger-border` | `--color-danger-border` | `#fecaca` | Error border |

### Elevation Reference

| Shadow | CSS Variable | Usage |
|--------|--------------|-------|
| `shadow-sm` | `--shadow-sm` | Subtle lift (1-2px) |
| `shadow-md` | `--shadow-md` | Standard cards (4-12px) |
| `shadow-lg` | `--shadow-lg` | Prominent elements (10-30px) |
| `shadow-hover` | `--shadow-hover` | Interactive hover states (12-40px) |

---

## 🚨 CI Enforcement

The `.github/workflows/color-token-guard.yml` workflow automatically scans all `.tsx`, `.ts`, and `.css` files for:

1. **Hardcoded Tailwind color utilities** (e.g., `bg-blue-600`, `text-slate-900`)
2. **Inline hex color values** (e.g., `style={{ color: '#dc2626' }}`)

**Pull requests will fail if violations are detected.**

To test locally before committing:
```bash
# Scan for hardcoded Tailwind colors
grep -rEn '(bg|text|border|ring)-(slate|gray|red|blue|sky|emerald|...)-(50|100|200|...)' src/

# Scan for inline hex colors
grep -rEn '(style=\{|backgroundColor:|color:).*#[0-9a-fA-F]{3,6}' src/
```

---

## 📚 Related Documentation

- **Full Color System**: `docs/COLOR_TOKEN_SYSTEM.md`
- **Implementation History**: `docs/COLOR_SYSTEM_IMPLEMENTATION.md`
- **Design System**: `docs/SECTION_SURFACE_DESIGN_SYSTEM.md`

---

## 🔄 Updating the Color Palette

To change colors site-wide:

1. **Update CSS variables** in `src/index.css` (`:root` block)
2. **Update Tailwind mappings** in `tailwind.config.ts` (`theme.extend.colors`)
3. **No component changes needed** - tokens propagate automatically

Example:
```diff
// src/index.css
:root {
-  --color-ocean: #0ea5e9;  /* Old primary accent */
+  --color-ocean: #3b82f6;  /* New primary accent */
}

// tailwind.config.ts
colors: {
-  ocean: '#0ea5e9',
+  ocean: '#3b82f6',
}
```

All `text-ocean`, `bg-ocean`, `border-ocean`, etc. will update automatically across the entire site.
