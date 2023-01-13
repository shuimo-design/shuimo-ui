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
import { firstLetterLower, h } from './hooks/render';
import { patch } from './hooks/patch';
import { MNodeProps, MNodeTemplate, PatchMVNodeTemplate } from '../../types/template/template';
import cloneDeep from 'lodash-es/cloneDeep';
import { getSlot } from './hooks/tools';


export default function initCustomerElement(target: typeof MElement, options: MElementOptions) {
  const { name, style, template, props } = options;

  class CustomMElement extends target {

    shadow: ShadowRoot = this.attachShadow({ mode: 'open' });

    currentTemplate: MNodeTemplate | null = null;

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
      if (template) {
        this.template = template;
      }
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

    private setCurrent(current: { template?: MNodeTemplate, dom?: HTMLElement }) {
      if (!current.template) {return;}
      this.currentTemplate = cloneDeep(current.template);
      if (current.dom) {
        this.refMap.set(name, current.dom);
      }
    }

    private getSlotDom(slotName: string, props?: MNodeProps) {
      if (this.slotMap.has(slotName)) {
        return this.slotMap.get(slotName)!;
      }

      const slotDom = document.createElement('slot');
      if (slotName !== 'default') {
        slotDom.setAttribute('name', slotName);
      }
      if (props) {
        // todo fix remove some props?
        Object.keys(props).forEach(k => {
          if (k.startsWith('on')) {
            slotDom.addEventListener(firstLetterLower(k.slice(2)), props[k] as EventListenerOrEventListenerObject);
          }
        });
      }
      this.slotMap.set(slotName, slotDom);
      return slotDom;
    }

    private getSlotDomList(slots: MNodeTemplate['slots']) {
      const slotsMap = getSlot(slots);
      const slotNames = slotsMap.keys();
      const slotList: HTMLSlotElement[] = [];
      Array.from(slotNames).forEach(slotName => {
        const slotDom = slotsMap.get(slotName);
        if (slotDom && slotDom.if !== false) {
          slotList.push(this.getSlotDom(slotName, slotDom.props));
        }
      });
      return slotList;
    }

    private callSlotRender(dom: HTMLElement, slotDomList: HTMLSlotElement[]) {
      slotDomList.forEach(slotDom => dom.appendChild(slotDom));
    }

    private templateRender(template: MNodeTemplate): HTMLElement {

      const { type, props, children, slots } = template;
      const dom = h(type, props);

      if (children) {
        Object.keys(children).forEach(k => {
          const opts = children[k];
          if (opts.if === false) {return;}
          const cDom = this.templateRender(opts);
          this.refMap.set(k, cDom);
          if (cDom) {
            dom.appendChild(cDom);
          }
        });
      }

      if (slots) {
        const slotDomList = this.getSlotDomList(slots);
        this.callSlotRender(dom, slotDomList);
      }
      return dom;
    };

    private renderPatch(dom: HTMLElement, res: PatchMVNodeTemplate, domName: string, t: MNodeTemplate) {
      if (res.children) {
        Object.keys(res.children).forEach((k, i) => {
          const d = this.refMap.get(k);
          const needInsertDom = this.renderPatch(d!, res.children![k], k, t.children![k]);
          if (needInsertDom) {
            dom.insertBefore(needInsertDom, dom.childNodes[i]);
          }
        });
      }
      if (res.props) {
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
      if (res.slots) {
        if (res.slots.add) {
          const slotDomList = this.getSlotDomList(res.slots.add);
          this.callSlotRender(dom, slotDomList);
        }
        if (res.slots.update) {
          Array.from(res.slots.update.keys()).forEach(slotName => {
            const slotDom = this.getSlotDom(slotName);
            const slot = res.slots!.update!.get(slotName);
            if (slot!.if === false) {
              dom.removeChild(slotDom);
            } else {
              dom.appendChild(slotDom);
            }
          });
        }
        if (res.slots.remove) {
          res.slots.remove.forEach(slot => {
            const slotDom = dom.querySelector(`slot[name=${slot}]`);
            if (slotDom) {
              dom.removeChild(slotDom);
            }
          });
        }
      }

      if (res.if !== undefined) {
        if (res.if) {
          let refMapDom = this.refMap.get(domName);
          if (refMapDom) {
            return refMapDom;
          }
          if (t) {
            refMapDom = this.templateRender(t);
            this.refMap.set(domName, refMapDom);
            return refMapDom;
          }
        }
        if (dom) {
          dom.remove();
        }
      }
    }

    private callRender() {
      if (!this.template) {
        console.warn('template is empty.');
        return;
      }
      this.initTemplate(this);
      if (!this.currentTemplate) {
        // first render
        super.beforeRender();
        const dom = this.templateRender(this.template);
        this.ref = dom;
        this.setCurrent({ template, dom });
        this.shadow.insertBefore(dom, this.shadow.firstChild);
        return;
      }

      // update
      const res = patch(this.currentTemplate, this.template);
      const dom = this.refMap.get(name)!;
      super.beforeRender();
      this.renderPatch(dom, res, name, this.template);

      // finally set new template
      this.setCurrent({ template });

    }

    render() {
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
