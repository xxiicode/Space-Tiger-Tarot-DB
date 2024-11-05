import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true, // Habilita el source map de CSS en modo desarrollo
  },
  server: {
    historyApiFallback: true,
  },
});