import { useEffect } from 'react';
import type { ThemeName } from './theme';
import { applyTheme, getSavedTheme } from './applyTheme';

/**
 * Hook to temporarily apply a theme to a page, restoring the previous theme on unmount.
 * Useful for pages that should display in a specific theme (e.g., dark mode for ops content).
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

    // Store the current theme before changing
    const previousTheme = document.documentElement.dataset.theme || getSavedTheme();

    // Apply the requested theme
    applyTheme(themeName);

    // Restore previous theme on unmount
    return () => {
      applyTheme(previousTheme as ThemeName);
    };
  }, [themeName]);
}
