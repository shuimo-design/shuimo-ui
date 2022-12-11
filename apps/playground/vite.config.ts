/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      // https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith("m-"), //web-components 添加配置识别 ‘m-’开头标签
        },
      },
    }),
  ],
})
