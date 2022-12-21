/**
 * @description
 * @author 阿怪
 * @date 2022/12/20 15:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import MElement from '../MElement';
import { MElementOptions } from '../../types/template';
import { initElementProps } from './hooks/props';


export default function initCustomerElement(target: typeof MElement, options: MElementOptions) {
  const { name, style, template, props } = options;

  class CustomMElement extends target {

    shadow: ShadowRoot = this.attachShadow({ mode: 'open' });

    constructor() {
      super();
      this.init();
      this.mount();
      this.initStyle();
    }

    static get observedAttributes() {
      if (!props) {return [];}
      return Object.keys(props);
    }

    init() {
      super.beforeInit();
      initElementProps.call(this, props);
      super.afterInit();
    }

    initStyle() {
      if (style) {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = style;
        this.shadow.appendChild(styleTag);
      }
    }

    private callMount() {
      if (!this.shadow) {return;}
    }

    mount() {
      super.beforeMount();
      this.callMount();
      super.afterMount();
    }

    update() {
      super.beforeUpdate();
      super.afterUpdate();
    }
  }

  return CustomMElement;

}
