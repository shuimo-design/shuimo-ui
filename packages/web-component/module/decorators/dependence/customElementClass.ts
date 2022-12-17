/**
 * @description
 * @author 阿怪
 * @date 2022/12/17 22:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import ShuimoElement from '../../elements/ShuimoElement';
import { CustomElementParams } from '@shuimo-design/core';
import { templateRender } from '../../../tools/tools';


export default function customElementClass(target: typeof ShuimoElement, params: CustomElementParams) {
  const { name, style, template, props } = params;

  class CustomShuimoElement extends target {
    shadow: ShadowRoot = this.attachShadow({ mode: 'open' });

    constructor() {
      // actually do something same as vue render
      super();
      this.VNode.name = name;
      // rude clone
      this.VNode.template = JSON.parse(JSON.stringify(template));
      super.initProps(props);
      this.mount();

      if (style) {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = style;
        this.shadow.appendChild(styleTag);
      }
    }

    static get observedAttributes() {
      if (!props) {return [];}
      return Object.keys(props);
    }

    render() {
      if (!this.VNode.template) {
        this.VNode.template = template;
      }
      super.beforeRender();
      this.VNode.dom = templateRender(this.VNode.template!);
    }

    mount() {
      super.beforeMount();
      if (!this.shadow) {return;}

      // create component
      this.render();
      if (!this.VNode.dom) {return;}

      // rude clear
      if (this.shadow.children && this.shadow.children.length > 0) {
        this.shadow.children[0].remove();
      }

      // mount to shadow root
      this.shadow.insertBefore(this.VNode.dom, this.shadow.firstChild);
    }

    update() {
      // todo: regardless of the patch, redraw directly
      this.mount();

      super.update();
    }
  }

  return CustomShuimoElement;
}
