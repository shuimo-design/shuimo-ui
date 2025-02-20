/**
 * @description vite config
 * @author 阿怪
 * @date 2023/4/19 17:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // 将所有带短横线的标签名都视为自定义元素
        // isCustomElement: (tag) => {
        //   if (tag === 'm-rice-paper' || tag === 'm-border') {
        //     return true;
        //   }
        //   return false;
        // },
      },
    },
  }), vueJSX()],
});
