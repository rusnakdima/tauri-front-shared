import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@tauri-front/shared': resolve(__dirname, '../projects/shared/dist'),
    },
  },
  optimizeDeps: {
    include: ['zone.js', '@tauri-front/shared'],
  },
  build: {
    target: 'esnext',
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});
