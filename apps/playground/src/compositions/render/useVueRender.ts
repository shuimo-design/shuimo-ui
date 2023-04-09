/**
 * @description vue render
 * @author 阿怪
 * @date 2023/3/24 01:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import { createMUI } from 'shuimo-ui/lib';
import useJavascriptAST from '../ast/useJavascriptAST';

export default function useVueRender(): IRender {

  const { injectVue } = useJavascriptAST();


  let app: ReturnType<typeof createApp> | undefined;
  const init = async (code: TemplateCode) => {
    unmount();
    const div = document.querySelector('.render');
    // appendStyle(style);
    // appendStyle(code.templateCss);


    const initVue = async (scriptInfo: string) => {
      if (window.vue) {return;}
      window.vue = await import('vue');
    };

    await initVue(code.templateScript);
    // console.log(app,window.vue);
    app = createApp({
      template: code.templateHTML,
      setup() {
        return new Function(injectVue(code.templateScript))();
      }
    });
    app.use(createMUI());
    app.mount(div);
  };


  const unmount = () => {
    if (app) {
      app.unmount();
    }
  };

  const clear = () => {
    unmount();
    app = undefined;
  };

  const update = async (code: TemplateCode) => {
    unmount();
    await init(code);
  };

  return {
    init,
    clear,
    update
  };
}
