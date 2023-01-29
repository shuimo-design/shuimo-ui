/**
 * @description MElement init decorator
 * @author 阿怪
 * @date 2023/1/29 15:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MElementOptions } from '../../../types/template';
import { InitCustomerElementType } from '../../types/CustomerElement';
import { MNodeProps, MNodeTemplate } from '../../../types/template/template';
import { firstLetterLower } from '../hooks/render';
import { getSlot } from '../hooks/tools';
import cloneDeep from 'lodash-es/cloneDeep';

export const initDecorator = (options: MElementOptions) => {
  return (target: InitCustomerElementType) => {
    const { name } = options;
    class InitElement extends target{
      constructor() {
        super();
        this.init();
      }

      init() {
        super.beforeInit();
        super.initProps();
        this.VNode.options = options;
        this.VNode.name = name;
        if (this.baseTemplate) {
          this.template = this.baseTemplate;
        }
        super.afterInit();
      }

      protected getSlotDom(slotName: string, props?: MNodeProps) {
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

      protected getSlotDomList(slots: MNodeTemplate['slots']) {
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

      protected setCurrent(current: { template?: MNodeTemplate, dom?: HTMLElement }) {
        if (!current.template) {return;}
        this.currentTemplate = cloneDeep(current.template);
        if (current.dom) {
          this.refMap.set(name, current.dom);
        }
      }

    }
    return InitElement;
  };
}
