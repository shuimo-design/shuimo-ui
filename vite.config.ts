import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { codeHtmlPlugin } from "./src/plugins/codeHtmlPlugin";
import { dataToEsm } from '@rollup/pluginutils';

const markdownPlugin = () =>
({
  name: 'vite-plugin-markdown',
  enforce: 'pre',
  transform(code: string, id: string) {
    if (!id.endsWith('.md')) return null;
    return dataToEsm(code);
  },
} as const);

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
    plugins: [codeHtmlPlugin, vue(), markdownPlugin()],
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    }
  }
})
