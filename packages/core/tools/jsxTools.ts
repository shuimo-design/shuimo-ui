/**
 * @description shuimo core tsx support
 * @author 阿怪
 * @date 2023/1/16 11:45
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '../types';


export const mWC = (type: string, props?: Record<string, any> | null, ...childList: MNodeTemplate[]) => {
  const children: MNodeTemplate['children'] = {};
  const slots: MNodeTemplate['slots'] = new Map();
  for (let c of childList) {
    if (c.props === null) {
      if (c.type === 'slot') {
        slots.set('default', c);
      }
      continue;
    }
    const name = c.props!['m-name'] as string;
    if (!name) {continue;}
    if (c.type === 'slot') {
      slots.set(name, c);
    } else {
      children[name] = c;
    }
  }
  return { type, props, children, slots, if: true, show: true };
};

export const m = (type: string, propsRecord?: Record<string, any> | null, ...slots: any) => {
  let props = propsRecord || {};
  if (type === 'slot') {
    if (!props || !props.name) {
      props.name = 'default';
    }
  }
  return { type, props, slots };
};


export const shuimoJsxFragment = (...arg: any) => {
  console.log(...arg);
};
