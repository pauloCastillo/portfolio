import { defineConfig, defaultExclude } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/app'),
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    // _tests/ son specs de Playwright (e2e), no unitarias de vitest
    exclude: [...defaultExclude, '_tests/**'],
  },
});
