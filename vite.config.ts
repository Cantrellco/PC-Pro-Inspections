import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// VITE_BASE allows building for a subpath (e.g. GitHub Pages).
// Local dev / Netlify / Vercel / Cloudflare Pages all leave it unset and serve from /.
// "./" produces relative asset URLs so the build is portable across host paths
// (useful for GitHub Pages where the repo name's case affects the path).
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
