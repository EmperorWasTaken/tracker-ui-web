import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  base: './', // Set base to './' for relative asset paths
  build: {
    outDir: 'cordova/www', // Set the output directory to Cordova's www folder
    rollupOptions: {
      // Additional Rollup options if needed
    },
    // Transpile for older browsers (Optional)
    // target: 'es2015',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['chart.js/auto'],
  },
  // Other configurations...
});
