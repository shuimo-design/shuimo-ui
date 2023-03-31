/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig } from 'vite';
import { defineMPostcss, postcssAnnotate } from '@shuimo-design/postcss';
import { shuimoCoreTsx } from '@shuimo-design/jsx';
import vue from '@vitejs/plugin-vue';

export default defineConfig(env => {
  const { mode } = env;

  const css = {
    postcss: {
      plugins: defineMPostcss({
        plugins: { host: false }, // if you are not playing with web-component
        import: { root: './' },
        url: { basePath: './' }
      }),
      syntax: postcssAnnotate
    }
  };
  const optimizeDeps = { include: ['@shuimo-design/postcss'] };

  const build = {
    commonjsOptions: { include: [/@shuimo-design/, /node_modules/] }
  };

  const plugins = [
    shuimoCoreTsx(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith('sp-') //web-components 添加配置识别 ‘m-’开头标签
        }
      }
    })
  ];

  return {
    plugins,
    css,
    optimizeDeps,
    build
  };
});
