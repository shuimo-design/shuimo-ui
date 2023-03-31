/**
 * @description
 * @author 阿怪
 * @date 2023/3/24 01:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import useIFrame from './useIFrame';
import { createMUI } from 'shuimo-ui/lib';
import style from 'shuimo-ui/lib/style.pcss';

export default function useVueRender() {
  const { appendStyle, clear, initIFrame } = useIFrame();

  const init = async (code: TemplateCode) => {
    const div = initIFrame();
    appendStyle(style);
    appendStyle(code.templateCss);

    const appendScript = async (scriptInfo: string) => {
      // const script = doc.createElement('script');
      // script.type = 'module';
      //
      // doc.body.appendChild(script);

      const vue = await import('vue');
      window.vue = vue;
    };

    await appendScript(code.templateScript);


    const app = createApp({
      template: code.templateHTML,
      setup() {
        const res = new Function(code.templateScript)();
        return res;
      }
    });
    console.log(app, div);
    app.use(createMUI());
    app.mount(div);
  };

  const update = (code: TemplateCode) => {
    clear();
    init(code);
  };

  return {
    init,
    update
  };
}
