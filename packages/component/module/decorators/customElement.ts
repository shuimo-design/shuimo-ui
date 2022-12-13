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

    class NewShuimoElement extends target {
      shadow: ShadowRoot = this.attachShadow({ mode: 'open' });

      constructor() {
        super();

        this.mount();

        if (style) {
          const styleTag = document.createElement('style');
          styleTag.innerHTML = style;
          this.shadow.appendChild(styleTag);
        }
      }

      mount() {
        if (!this.shadow) {return;}
        // create component
        const node = this.render();
        if (!node) {return;}
        // mount to shadow root
        this.shadow.appendChild(node);
      }

      update(){
        super.update(this.shadow);
      }
    }

    if (customElements.get(name)) {
      return;
    }

    console.log(NewShuimoElement.prototype);

    customElements.define(name, NewShuimoElement);
  };
};
