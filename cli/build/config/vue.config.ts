/**
 * @description vue vite build config
 * @author 阿怪
 * @date 2023/6/7 22:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig } from 'vite';
import lightningcss from 'vite-plugin-lightningcss';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';
import * as path from 'path';

// windows sep error?
const corePath = path.resolve(__dirname, '../../../packages/core');
const toolsPath = path.resolve(__dirname, '../../../tools/tools');
const outputRoot = path.resolve(__dirname, '../../../packages/vue/dist');
const getPath = (url: string) => {
  return path.resolve(__dirname, `../../../packages/vue/${url}`);
};

export default defineConfig({
  plugins: [
    lightningcss({ drafts: { nesting: true }, browserslist: '>= 0.25%' }),
    vue({ include: [/\.vue$/], exclude: ['**/react/*.tsx'] }),
    vueJSX()
  ],
  resolve: {
    alias: {
      '@shuimo-design/core': corePath,
      '@shuimo-design/tools': toolsPath
    }
  },
  build: {
    outDir: outputRoot,
    target: 'esnext',
    lib: {
      name: 'shuimo-ui',
      fileName: 'shuimo-ui',
      entry: getPath('./index.ts')
    },
    rollupOptions: {
      external: ['vue']
    }
  }
});
