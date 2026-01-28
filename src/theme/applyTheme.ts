import type { ThemeName } from './theme';
import { THEME_STORAGE_KEY } from './theme';

/**
 * Apply theme to document root and persist to localStorage
 * @param theme - Theme name to apply ('default' | 'ops')
 */
export function applyTheme(theme: ThemeName): void {
  const root = document.documentElement;
  
  if (theme === 'default') {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = theme;
  }
  
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Get saved theme from localStorage or return default
 * @returns Saved theme name or 'default'
 */
export function getSavedTheme(): ThemeName {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return (saved === 'ops' || saved === 'default') ? saved : 'default';
}
