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
    constructor() {
      super();
      super.beforeInit();
      initElementProps.call(this, props);
      super.afterInit();
    }

    static get observedAttributes() {
      if (!props) {return [];}
      return Object.keys(props);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      console.log(name, oldValue, newValue);
      // super.attributeChangedCallback(name, oldValue, newValue);
    }

    mount() {
      super.beforeMount();

      super.afterMount();
    }

    update(){
      console.log('update',this.getAttribute('type'));
    }
  }

  return CustomMElement;

}
