/**
 * @description MElement render decorator
 * @author 阿怪
 * @date 2023/1/29 15:15
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { InitCustomerElementType, InitElementType } from '../../types/CustomerElement';
import { patch } from '../hooks/patch';
import { MNodeTemplate, PatchMVNodeTemplate } from '../../../types/template/template';
import { h } from '../hooks/render';
import { SupportElement } from '../../../types/template';

export const renderDecorator = () => {
  return (target: InitCustomerElementType) => {

    class renderElement extends (target as InitElementType) {

      constructor() {
        super();
      }

      protected callSlotRender(dom: SupportElement, slotDomList: HTMLSlotElement[]) {
        slotDomList.forEach(slotDom => dom.appendChild(slotDom));
      }

      protected templateRender(template: MNodeTemplate): SupportElement {

        const { type, props, children, slots, innerText } = template;
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

        if (innerText && innerText.length > 0) {
          if (innerText.length !== 1) {
            console.warn('innerText length not be 1');
            console.trace(template);
            return dom;
          }
          if (slots && slots.size > 0) {
            console.warn('this is a new situation!');
            console.trace(template);
            return dom;
          }
          if (dom instanceof HTMLElement) {
            dom.innerText = innerText[0];
          }
        }

        return dom;
      };

      protected renderPatch(dom: SupportElement, res: PatchMVNodeTemplate, domName: string, t: MNodeTemplate) {
        if (res.children) {
          if (Object.keys(res.children).length > 0) {
            Object.keys(res.children).forEach((k, i) => {
              const d = this.refMap.get(k);
              const needInsertDom = this.renderPatch(d!, res.children![k], k, t.children![k]);
              if (needInsertDom) {
                dom.insertBefore(needInsertDom, dom.childNodes[i]);
              }
            });
          } else if (dom && res.removeChildren) {

            res.removeChildren.forEach(c => {
              if (c.type) {
                dom.querySelector(c.type)?.remove();
              }
            });

            // dom.innerHTML = '';
          }
        }
        if (res.props) {
          if (!dom) {
            // todo do something here.
            return;
          }
          if (res.props.update) {
            Object.keys(res.props.update).forEach(key => {
              if (res.props!.update![key] === false) {
                // maybe should check props type
                dom.removeAttribute(key);
              } else {
                dom.setAttribute(key, String(res.props!.update![key]));
              }

            });
          }
          if (res.props.remove) {
            res.props.remove.forEach(key => {
              dom.removeAttribute(key);
            });
          }
        }

        if (res.innerText && dom instanceof HTMLElement) {
          dom.innerText = res.innerText[0];
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
              const name = slot.props?.name;
              let slotDom;
              if (name === 'default') {
                //  how to select default slot?
                slotDom = Array.from(dom.querySelectorAll('slot')).filter(e => !e.hasAttribute('name'))[0];
              } else {
                slotDom = dom.querySelector(`slot[name=${slot.props?.name}]`);
              }
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

      protected callRender() {
        if (!this.template) {
          console.warn('template is empty.');
          return;
        }
        const { options: { template }, initProps } = this.componentOptions;
        this.initTemplate(this, initProps ? initProps : () => {});


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
        const dom = this.refMap.get(this.name)!;
        super.beforeRender();
        this.renderPatch(dom, res, this.name, this.template);

        // finally set new template
        this.setCurrent({ template });
      }

    }

    return renderElement;
  };
};
