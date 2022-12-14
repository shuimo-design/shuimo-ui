/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  build: {
    lib: {
      name: 'shuimo-ui',
      entry: 'lib/index.ts'
    },
    rollupOptions: {
      external: ['vue']
    }
  },
  server: { port: 8513 },
  plugins: [vue(), vueJsx()],
  test: {
    transformMode: {
      web: [/\.[jt]sx$/]
    },
    environment: 'jsdom',
    clearMocks: true,
    coverage: {
      all: true,
      include: ['lib/**'],
      exclude: ['lib/index.ts', 'lib/**/*.d.ts'],
      reporter: ['json', 'html']
    }
  }
});
