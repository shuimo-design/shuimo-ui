/**
 * @description
 * @author 阿怪
 * @date 2022/12/17 22:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import ShuimoElement from '../../elements/ShuimoElement';
import { CustomElementParams, MNodeTemplate } from '@shuimo-design/core';
import { deepClone, templateRender } from '../../../tools/tools';
import { patch } from '../../tools/patch';


export default function customElementClass(target: typeof ShuimoElement, params: CustomElementParams) {
  const { name, style, template, props } = params;

  class CustomShuimoElement extends target {
    shadow: ShadowRoot = this.attachShadow({ mode: 'open' });

    constructor() {
      // actually do something same as vue render
      super();
      this.VNode.name = name;
      // rude clone
      this.VNode.template = deepClone(template);
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
      if (!this.VNode.dom) {
        this.VNode.dom = templateRender(this.VNode.template!);
      } else {
        this.patch();
      }
    }

    private mountTemplate: MNodeTemplate | undefined = undefined;

    mount() {
      this.mountTemplate = deepClone(this.VNode.template);
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

    patch() {
      // if (!this.mountTemplate || !this.VNode.template) {return;}
      // const res = patch(this.mountTemplate, this.VNode.template);
      // if (Object.keys(res).length > 0) {
      //   if (res.props) {
      //     if (res.props.update) {
      //       const updateProps = res.props.update;
      //       Object.keys(updateProps).forEach(key => {
      //         if (key === 'class') {
      //           this.VNode.dom!.setAttribute('class', typeof updateProps.class === 'string' ?
      //             updateProps.class : updateProps.class.join(' '));
      //           return;
      //         }
      //         this.VNode.dom!.setAttribute(key, updateProps![key]);
      //       });
      //     }
      //
      //     if (res.props.remove) {
      //       const removeProps = res.props.remove;
      //       removeProps.forEach(key => {
      //         this.VNode.dom!.removeAttribute(key);
      //       });
      //     }
      //   }
      //   if (res.children) {
      //   }
      // }
      // this.mountTemplate = deepClone(this.VNode.template);
    }

    update() {
      this.render();
      super.update();
    }
  }

  return CustomShuimoElement;
}
