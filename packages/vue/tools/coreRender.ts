/**
 * @description shuimo core template render
 * @author 阿怪
 * @date 2023/1/16 16:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { h, Slots, VNode } from 'vue';
import { MNodeTemplate } from '@shuimo-design/core';


export const cr = (template: MNodeTemplate, userSlots?: Readonly<Slots>) => {
  if (template.if === false) {
    return undefined;
  }
  const { type, props, children, slots: templateSlots } = template;

  let slots: VNode[] = [];
  if (type === 'slot') {
    let name = 'default';
    if (props) {
      name = props.name;
    }
    if (userSlots && userSlots[name]) {
      return userSlots[name]!();
    }
  }
  // merge children
  if (children) {
    slots = slots.concat(...Object.values(children)
      .filter(e => e.if)
      .map(s => cr(s, userSlots)!));
  }
  if (templateSlots) {
    if (Array.isArray(templateSlots)) {
      // slots = templateSlots.map(s => );
    } else if (templateSlots && templateSlots.size > 0) {
      // means record
      slots = slots.concat(...Array.from(templateSlots.values())
        .filter(e => e.if)
        .map(s => cr(s as MNodeTemplate, userSlots)!));
    }
  }


  return h(type, props, slots);
};
