import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/lib/core/initCustomerElement.test.ts'],
    environment: 'jsdom',
    threads: false
  }
});


