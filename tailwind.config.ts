import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'steam-bg': '#0F0E0E',
      'steam-metal': '#1F1F1F',
      'steam-copper': '#B87333',
      'steam-brass': '#DAA520',
      'steam-text': '#F5F0E1',
      'steam-shadow': '#302A24',
      'amber-400': '#fbbf24',
      'amber-500': '#f59e0b',
      'black': '#000000',
      'white': '#ffffff',
    },
    fontFamily: {
      heading: ['"Share Tech Mono"', 'monospace'],
      body: ['"Libre Baskerville"', 'serif'],
    },
  },
  plugins: [],
};

export default config;
