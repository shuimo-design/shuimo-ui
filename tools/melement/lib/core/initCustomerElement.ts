/**
 * @description
 * @author 阿怪
 * @date 2022/12/20 15:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import MElement from '../MElement';
import { MElementOptions, VNodeType } from '../../types/template';
import { initElementProps } from './hooks/props';
import { deepClone, templateRender } from './hooks/render';
import { patch } from './hooks/patch';


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


    // not support setAttribute now
    // attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    //   this.update();
    // }

    init() {
      super.beforeInit();
      initElementProps.call(this, props);
      this.VNode.options = options;
      this.VNode.name = name;
      super.afterInit();
    }

    private initStyle() {
      if (style) {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = style;
        this.shadow.appendChild(styleTag);
      }
    }

    private callMount() {
      if (!this.shadow) {return;}
      this.render();
    }

    private setCurrent(current: NonNullable<VNodeType['current']>) {
      if (!this.VNode.current) {
        this.VNode.current = {};
      }
      this.VNode.current.template = deepClone(current.template);
      if (current.dom) {
        this.VNode.current.dom = current.dom;
      }
    }

    private callRender() {
      if (!this.VNode.options || !this.VNode.options.template) {
        console.warn('template is empty.');
        return;
      }
      if (!this.VNode.current || !this.VNode.current.template) {
        // first render
        const dom = templateRender(this.VNode.options.template);
        this.setCurrent({ template, dom });
        this.shadow.insertBefore(dom, this.shadow.firstChild);
        return;
      }

      // update
      const res = patch(this.VNode.current.template, this.VNode.options.template);
      console.log(res);
      if (res.props) {
        const { dom } = this.VNode.current;
        if (!dom) {
          // todo do something here.
          return;
        }
        if (res.props.update) {
          Object.keys(res.props.update).forEach(key => {
            dom.setAttribute(key, String(res.props!.update![key]));
          });
        }
        if (res.props.remove) {
          res.props.remove.forEach(key => {
            dom.removeAttribute(key);
          });
        }
      }

      // finally set new template
      this.setCurrent({ template });

    }

    render() {
      super.beforeRender();
      this.callRender();
      super.afterRender();
    }

    mount() {
      super.beforeMount();
      this.callMount();
      super.afterMount();
    }

    update() {
      super.beforeUpdate();
      this.render();
      super.afterUpdate();
    }
  }

  return CustomMElement;
}
