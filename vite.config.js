import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // required for relative assets
  build: {
    outDir: 'docs', // important: output to docs folder
  },
});
