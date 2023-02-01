/**
 * @description MElement init decorator
 * @author 阿怪
 * @date 2023/1/29 15:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { InitCustomerElementType } from '../../types/CustomerElement';
import { MNodeProps, MNodeTemplate } from '../../../types/template/template';
import { firstLetterLower } from '../hooks/render';
import { getSlot } from '../hooks/tools';
import cloneDeep from 'lodash-es/cloneDeep';
import { SupportElement } from '../../../types/template';

export const initDecorator = () => {
  return (target: InitCustomerElementType) => {
    class InitElement extends target {
      constructor() {
        super();
        this.init();
      }

      init() {
        super.beforeInit();
        super.bindingProps();
        this.VNode.options = this.componentOptions.options;
        this.VNode.name = this.name;
        const { template } = this.componentOptions.options;
        if (template) {
          this.template = template;
        }
        this.initStyle();
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

      protected setCurrent(current: { template?: MNodeTemplate, dom?: SupportElement }) {
        if (!current.template) {return;}
        this.currentTemplate = cloneDeep(current.template);
        if (current.dom) {
          this.refMap.set(this.name, current.dom);
        }
      }

      private initStyle() {
        const { style } = this.componentOptions.options;
        if (style) {
          const styleTag = document.createElement('style');
          styleTag.innerHTML = style;
          this.shadow.appendChild(styleTag);
        }
      }

    }

    return InitElement;
  };
};
