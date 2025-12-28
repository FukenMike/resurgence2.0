import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#f7f8fb',
        ink: '#1f2933',
        accent: '#3a7ca5',
        accentMuted: '#e2edf6',
        borderSoft: '#e5e7eb',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(31, 41, 51, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
