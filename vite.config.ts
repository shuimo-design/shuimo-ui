import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    lib: {
      name:'wash-painting-ui',
      entry: 'lib/index.ts'
    },
    rollupOptions: {
      external: ['vue']
    }
  },
  plugins: [vue()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
