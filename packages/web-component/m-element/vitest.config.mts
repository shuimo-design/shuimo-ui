import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  test: {
    include: ['test/**/**.test.ts'],
    environment: 'jsdom'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  }
});


