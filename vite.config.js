import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [preact(), tailwindcss()],
  optimizeDeps: {
    exclude: ['node-summary']
  },
  build: {
    rollupOptions: {
      external: []
    }
  }
});
