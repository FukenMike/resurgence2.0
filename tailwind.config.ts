import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Semantic color tokens using CSS variables with opacity support */
        ink: 'rgb(var(--color-ink-rgb) / <alpha-value>)',
        muted: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
        sand: 'rgb(var(--color-sand-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        'surface-muted': 'rgb(var(--color-surface-muted-rgb) / <alpha-value>)',
        'border-soft': 'rgb(var(--color-border-soft-rgb) / <alpha-value>)',
        'border-muted': 'rgb(var(--color-border-muted-rgb) / <alpha-value>)',
        ocean: 'rgb(var(--color-ocean-rgb) / <alpha-value>)',
        forest: 'rgb(var(--color-forest-rgb) / <alpha-value>)',
        danger: 'rgb(var(--color-danger-rgb) / <alpha-value>)',
        'danger-bg': 'rgb(var(--color-danger-bg-rgb) / <alpha-value>)',
        'danger-border': 'rgb(var(--color-danger-border-rgb) / <alpha-value>)',
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
