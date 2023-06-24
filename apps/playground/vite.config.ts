/**
 * @description vite config
 * @author 阿怪
 * @date 2023/4/19 17:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig } from 'vite';
import lightningcss from 'vite-plugin-lightningcss';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';
import { reactTsx } from './base/plugin/reactTsx';

export default defineConfig({
  plugins: [
    lightningcss({ drafts: { nesting: true }, browserslist: '>= 0.25%' }),
    vue({
      include: [/\.vue$/],
      exclude: ['**/react/*.tsx'] ,
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => ['m-border','m-rice-paper'].includes(tag)
        }
      }
    }),
    vueJSX({
      exclude: ['**/react/*.tsx']
    }),
    reactTsx()
  ]
});
