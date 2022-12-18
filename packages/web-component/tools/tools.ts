/**
 * @description component tools
 * @author 阿怪
 * @date 2022/12/12 13:51
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { type MNodeTemplate } from '@shuimo-design/core/types';

export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
}

export const h = (name: string, props?: MNodeTemplate['props']) => {
  const dom = document.createElement(name);
  if (props) {
    Object.keys(props).forEach(key => {
      if (key === 'class' && Array.isArray(props[key])) {
        dom.classList.add(...props[key] as string[]);
        return;
      }


      dom.setAttribute(key, props[key] as string);
    });
  }
  return dom;
};


export const templateRender = (template: MNodeTemplate): HTMLElement => {

  const { type, props, children, slots } = template;
  const dom = h(type, props);

  if (children) {
    Object.keys(children).forEach(k => {
      const opts = children[k];
      if (opts.if === false) {return;}
      const cDom = templateRender(opts);
      if (cDom) {
        dom.appendChild(cDom);
      }
    });
  }

  // todo 看看咋写好
  if (slots) {
    slots.forEach(slot => {
      const slotDom = document.createElement('slot');
      dom.appendChild(slotDom);
    });
  }
  return dom;
};
