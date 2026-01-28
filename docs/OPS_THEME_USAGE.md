# OPS Theme Usage Guide

## Overview

The site now supports two themes:
1. **Default** — Light, professional, accessible
2. **Ops** — Dark infrastructure-punk aesthetic with cyan/neon accents

## Theme Switching

### Via JavaScript Console (Dev Testing)
```javascript
// Enable ops theme
document.documentElement.dataset.theme = "ops"

// Disable ops theme (back to default)
delete document.documentElement.dataset.theme
```

### Via applyTheme() Function
```tsx
import { applyTheme } from '../theme/applyTheme';

// Global theme switch (persists to localStorage)
applyTheme('ops');    // Enable ops theme
applyTheme('default'); // Back to default
```

### Via usePageTheme() Hook (Page-Scoped)
```tsx
import { usePageTheme } from '../theme/usePageTheme';

export default function MyDarkPage() {
  // Apply ops theme on this page only; restore previous theme on unmount
  usePageTheme('ops');
  
  return <div>This page renders in ops theme</div>;
}
```

### In React Component (Manual)
```tsx
// Enable ops theme on mount
useEffect(() => {
  document.documentElement.dataset.theme = "ops";
  
  return () => {
    delete document.documentElement.dataset.theme;
  };
}, []);
```

### Via HTML Attribute
```html
<!-- Set on page load -->
<html data-theme="ops">
```

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
