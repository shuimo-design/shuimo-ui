import { defineConfig, ConfigEnv, BuildOptions } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { codeHtmlPlugin } from "./src/plugins/codeHtmlPlugin";

export default defineConfig((configEnv: ConfigEnv) => {
  const { mode } = configEnv;
  let build: BuildOptions = {};
  const isNpm = mode === 'npm';
  if (isNpm) {
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
    server: { port: 8513 },
    plugins: [isNpm ? undefined : codeHtmlPlugin, vue(), vueJsx()]
  }
})
