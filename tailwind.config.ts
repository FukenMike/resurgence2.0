import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Semantic color tokens aligned with CSS variables in src/index.css */
        ink: '#0f172a',
        muted: '#475569',
        sand: '#f8fafc',
        surface: '#ffffff',
        'surface-muted': '#f1f5f9',
        'border-soft': '#e2e8f0',
        'border-muted': '#cbd5e1',
        ocean: '#0ea5e9',    /* Primary accent */
        forest: '#047857',   /* Secondary accent */
        danger: '#dc2626',         /* Error text and icons */
        'danger-bg': '#fef2f2',    /* Error background */
        'danger-border': '#fecaca', /* Error borders */
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Source Serif 4', 'DM Sans', 'serif'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15, 23, 42, 0.05)',
        md: '0 4px 12px rgba(15, 23, 42, 0.08)',
        lg: '0 10px 30px rgba(15, 23, 42, 0.10)',
        hover: '0 12px 40px rgba(15, 23, 42, 0.15)',
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)', /* Legacy - use md instead */
      },
    },
  },
  plugins: [],
}

export default config
