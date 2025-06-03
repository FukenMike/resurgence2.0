import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './', // Keeps relative paths for Cloudflare Pages
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Makes imports easier: "@/components/Whatever"
    },
  },
  build: {
    outDir: 'dist', // Default output directory
    sourcemap: true, // Helpful for debugging if something breaks
  },
});
