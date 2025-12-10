import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: 'https://www.rewiringhope.or.id/',
  plugins: [react(), tailwindcss()],
});
