// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // or use base: '/<repo-name>/' if you set homepage
  build: {
    outDir: 'docs',
  },
});
