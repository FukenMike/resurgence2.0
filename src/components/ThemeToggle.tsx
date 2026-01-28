import { useEffect, useState } from 'react';
import { applyTheme } from '../theme/applyTheme';
import type { ThemeName } from '../theme/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>('default');
  const [mounted, setMounted] = useState(false);

  // On mount, detect current theme from document
  useEffect(() => {
    const current = document.documentElement.dataset.theme === 'ops' ? 'ops' : 'default';
    setTheme(current);
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const newTheme: ThemeName = theme === 'default' ? 'ops' : 'default';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  const isLight = theme === 'default';
  const emoji = isLight ? '☀️' : '🌙';
  const themeLabel = isLight ? 'Light' : 'Dark';
  const ariaLabel = `Toggle theme (currently ${themeLabel})`;

  return (
    <button
      onClick={handleToggle}
      aria-label={ariaLabel}
      title={ariaLabel}
      className="rounded-lg px-3 py-2 text-xs font-medium text-muted hover:bg-sand transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
    >
      <span className="flex items-center gap-1.5">
        <span className="hidden sm:inline">Theme</span>
        <span role="img" aria-label={themeLabel}>{emoji}</span>
      </span>
    </button>
  );
}
