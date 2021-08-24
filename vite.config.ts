import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { codeHtmlPlugin } from "./src/plugins/codeHtmlPlugin";

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
    plugins: [codeHtmlPlugin, vue()],
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    },
    css: {
      modules: {
        scopeBehaviour: 'global',
        globalModulePaths: []
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@function realPx($px) {\n' +
            '  @return calc(#{$px} / 1920 * 100vw);\n' +
            '}'
        }
      }
    }
  }
})
