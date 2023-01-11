/**
 * @description
 * @author 阿怪
 * @date 2023/1/10 11:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig } from 'vite';
export default defineConfig({
  css: {
    postcss: {
      plugins: require('@shuimo-design/postcss').MPostcss
    }
  },
});
