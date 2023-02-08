/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import { defineMPostcss } from '@shuimo-design/postcss';
import { MODE_TYPE, shuimoCoreTsx } from '@shuimo-design/jsx';


export default defineConfig(env => {
  const { mode } = env;

  const css = {
    postcss: {
      plugins: defineMPostcss({
        plugins: { host: false }, // if you are not playing with web-component
        import: { root: './' },
        url: { basePath: './' }
      })
    }
  };
  const optimizeDeps = { include: ['@shuimo-design/postcss', 'moelement'] };

  const build = {
    commonjsOptions: { include: [/@shuimo-design/, 'moelement', /node_modules/] }
  };

  let vuePluginOption = mode === MODE_TYPE.WEB_COMPONENT ? {
    // https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('m-') //web-components 添加配置识别 ‘m-’开头标签
      }
    }
  } : {};


  const plugins = [
    mode === MODE_TYPE.REACT ? react() : vue(vuePluginOption),
    shuimoCoreTsx(mode)
  ];

  return {
    plugins,
    css,
    optimizeDeps,
    build
  };
});
