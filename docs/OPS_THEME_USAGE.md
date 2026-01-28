# OPS Theme Usage Guide

## Overview

The site now supports two themes:
1. **Default** — Light, professional, accessible
2. **Ops** — Dark infrastructure-punk aesthetic with cyan/neon accents

## Theme Switching

### Via applyTheme() — PERSISTENT Global Theme
```tsx
import { applyTheme } from '../theme/applyTheme';

// PERSISTENT: Writes to localStorage, affects all pages after reload
applyTheme('ops');      // Enable ops theme globally
applyTheme('default');  // Back to default theme globally
```

**Important:** This function persists the preference to localStorage. Once called, the selected theme is the user's new default for all pages on this site.

**Use case:** Theme toggle buttons in UI, user preference settings.

### Via usePageTheme() — TEMPORARY Page Override
```tsx
import { usePageTheme } from '../theme/usePageTheme';

export default function MyDarkPage() {
  // TEMPORARY: Does NOT write localStorage
  // This page renders in ops theme
  // Previous theme restored when user navigates away
  usePageTheme('ops');
  
  return <div>Dark ops content</div>;
}
```

**Important:** This hook does NOT persist the theme. It only affects the current page. When the user navigates away or refreshes, the page returns to their saved theme preference.

**Use case:** Page-specific theming (e.g., FSIP program pages always render in ops theme, but user's global theme preference is unchanged).

### Via JavaScript Console (Dev Testing)
```javascript
// Direct dataset manipulation (same as usePageTheme behavior)
document.documentElement.dataset.theme = "ops"
delete document.documentElement.dataset.theme  // Reset to default

// NOTE: This does NOT write localStorage. Refresh the page and theme reverts.
```

### In React Component (Manual)
```tsx
// Manual temporary override (same behavior as usePageTheme)
useEffect(() => {
  const previousTheme = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = "ops";
  
  return () => {
    if (previousTheme === undefined) {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = previousTheme;
    }
  };
}, []);
```

### Via HTML Attribute
```html
<!-- Set on page load -->
<html data-theme="ops">
```

## Key Distinction: Persistent vs. Temporary

| Aspect | `applyTheme()` | `usePageTheme()` |
|--------|---|---|
| **Storage** | ✅ Writes to localStorage | ❌ No storage write |
| **Scope** | Global (all pages) | Current page only |
| **Persistence** | Survives page reload | Reverts on navigation/reload |
| **Use Case** | User preference settings | Page-specific themes |
| **Example** | Theme toggle in navbar | FSIP ops theme |

### Why This Matters

**Scenario:** User navigates to FSIP program page (which uses `usePageTheme('ops')`)

- ✅ Page displays in ops theme
- ✅ localStorage is NOT modified
- ✅ User's saved theme preference remains unchanged
- ✅ User navigates to home page → back to their saved theme
- ✅ User refreshes page → theme is as they set it, not ops

If `usePageTheme()` used localStorage (old behavior):
- ❌ Visiting FSIP would permanently change user's theme
- ❌ Surprise: All other pages now in ops theme after refresh
- ❌ User would need to manually switch theme back

## Color Tokens Overridden

All CSS variables are overridden in ops theme:

| Token | Default | Ops Theme |
|-------|---------|-----------|
| `--color-ink` | `#0f172a` (dark) | `#f0f2f5` (near-white) |
| `--color-muted` | `#475569` (gray) | `#9ca3af` (desaturated) |
| `--color-sand` | `#f8fafc` (light bg) | `#0a0e1a` (near-black blue) |
| `--color-surface` | `#ffffff` (white) | `#141923` (dark panel) |
| `--color-ocean` | `#0ea5e9` (sky blue) | `#22d3ee` (cyan "system online") |
| `--color-forest` | `#047857` (emerald) | `#10b981` (muted green "verified") |
| `--color-danger` | `#dc2626` (red) | `#f87171` (bright red) |
| `--shadow-hover` | Subtle dark shadow | `rgba(34, 211, 238, 0.3)` (cyan glow) |

## Implementation Details

### No Component Changes Required
- All theme switching happens at CSS variable level
- Components use semantic tokens (`bg-surface`, `text-ink`, etc.)
- Same markup renders differently based on `data-theme` attribute

### Body Gradient Override
The ops theme includes enhanced radial gradients for a cyberpunk feel:
```css
[data-theme="ops"] body {
  background: radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.15), transparent 35%),
    radial-gradient(circle at 80% 0%, rgba(16, 185, 129, 0.12), transparent 30%),
    linear-gradient(180deg, var(--color-surface) 0%, var(--color-sand) 100%);
}
```

## Testing

1. **Dev Server:** `npm run dev`
2. **Open Browser Console:** `F12` or `Cmd+Option+I`
3. **Run:** `document.documentElement.dataset.theme = "ops"`
4. **Watch:** Entire site switches to dark ops theme

Or use the theme test page:
```bash
npm run dev
# Open: http://localhost:5173/THEME_TEST.html
```

## Future Enhancements

- Add theme toggle button in Navbar
- ~~Persist theme preference in localStorage~~ ✅ Done via `applyTheme()` and `getSavedTheme()`
- Add transition animations for smoother theme switching
- Create additional theme variants (high-contrast, sepia, etc.)

## Demo Implementation

The FSIP program page ([program-fsip.tsx](../src/pages/program-fsip.tsx)) demonstrates the `usePageTheme` hook:

```tsx
import { usePageTheme } from '../theme/usePageTheme';

export default function ProgramFSIP() {
  usePageTheme('ops'); // ← Page renders in ops theme, reverts on navigation away
  // ... rest of component
}
```

Visit `/program-fsip` to see the ops theme in action.
