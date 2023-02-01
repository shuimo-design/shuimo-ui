/**
 * @description
 * @author 阿怪
 * @date 2022/12/20 15:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import MElement from '../MElement';
import { MCreateMelement } from '../../types/template';
import { MNodeTemplate } from '../../types/template/template';
import { renderDecorator } from './decorator/render';
import { initDecorator } from './decorator/init';
import { lifecycleDecorator } from './decorator/mount';
import { initElementProps } from './hooks/props';


export default function initCustomerElement(target: typeof MElement, hook: MCreateMelement<any>) {
  const { options: { props } } = hook.hookFunc();

  @lifecycleDecorator()
  @renderDecorator()
  @initDecorator()
  class CustomMElement extends target {

    shadow: ShadowRoot = this.attachShadow({ mode: 'open' });

    currentTemplate: MNodeTemplate | null = null;

    constructor() {
      super();
      this.componentOptions = hook.hookFunc();
      this.name = hook.name;
    }

    static get observedAttributes() {
      if (!props) {return [];}
      return Object.keys(props);
    }

    protected bindingProps() {
      initElementProps.call(this, props);
    }

    // not support setAttribute now
    // attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    //   this.update();
    // }
  }

  return CustomMElement;
}
