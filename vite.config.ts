import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig((configEnv: ConfigEnv) => {
  const { mode } = configEnv;
  let build: any = {};
  if (mode === 'npm') {
    build = {
      lib: {
        name: 'wash-painting-ui',
        entry: 'lib/index.ts'
      },
      rollupOptions: {
        external: ['vue']
      }
    };
  }
  return {
    build,
    plugins: [vue()],
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    }
  }
})
