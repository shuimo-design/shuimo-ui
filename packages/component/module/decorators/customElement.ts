/**
 * @description createElement decorator
 * @author 阿怪
 * @date 2022/12/10 15:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import ShuimoElement from '../elements/ShuimoElement';
import { type MNodeTemplate } from '@shuimo-design/core/types';
import { templateRender } from '../../tools/tools';
import { MCOPO } from '@shuimo-design/core/types/template/props';


export const customElement = (
  params: {
    name: string,
    style?: string,
    template?: MNodeTemplate,
    props?: MCOPO<any>
  }
) => {
  const { name, style, template, props } = params;

  return (target: typeof ShuimoElement) => {
    if (customElements.get(name)) {
      return;
    }


    // new a custom element
    class NewShuimoElement extends target {


      constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        if (!shadow) {return;}
        // create component
        const node = this.render();
        if (!node) {return;}
        // mount to shadow root
        shadow.appendChild(node);

        if (style) {
          const styleTag = document.createElement('style');
          styleTag.innerHTML = style;
          shadow.appendChild(styleTag);
        }
      }

      render() {
        let dom: HTMLElement | undefined;
        if (template) {
          dom = templateRender(template);
        }

        return super.render(dom);
      }
    }

    customElements.define(name, NewShuimoElement);
  };
};
