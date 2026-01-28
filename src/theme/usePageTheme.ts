import { useEffect } from 'react';
import type { ThemeName } from './theme';

/**
 * Hook to temporarily apply a theme to a page, restoring the previous theme on unmount.
 * This hook does NOT persist the theme change to localStorage.
 * Use this for page-scoped theme overrides only.
 *
 * For persistent theme switching, use applyTheme() instead.
 *
 * @param themeName - Optional theme to apply. If not provided, no theme change occurs.
 * @example
 * function OpsPage() {
 *   usePageTheme('ops');
 *   return <div>Dark ops content</div>;
 * }
 */
export function usePageTheme(themeName?: ThemeName): void {
  useEffect(() => {
    if (!themeName) return;

    const root = document.documentElement;
    // Store the current dataset.theme value (or undefined if not set)
    const previousDatasetTheme = root.dataset.theme;

    // Apply the requested theme WITHOUT touching localStorage
    if (themeName === 'default') {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = themeName;
    }

    // Restore previous dataset.theme on unmount (NOT touching localStorage)
    return () => {
      if (previousDatasetTheme === undefined) {
        delete root.dataset.theme;
      } else {
        root.dataset.theme = previousDatasetTheme;
      }
    };
  }, [themeName]);
}
