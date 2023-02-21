/**
 * @description shuimo core template react version render
 * @author 阿怪
 * @date 2023/2/7 17:13
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import { MNodeTemplate } from '@shuimo-design/types';

export const cr = <T>(
  template: MNodeTemplate,
  user?: Record<string, React.ReactNode>
): any => {
  const { type, props, children, slots: templateSlots, innerText } = template;

  let userChildren: React.ReactNode | undefined;
  if (user) {
    if (user.children) {userChildren = user.children;}
  }

  if (type === 'slot') {
    return userChildren;
  }

  // handle class
  if (props && props.class) {
    props.className = props.class;
    delete props.class;
  }

  const childrenList = [];
  // merge children
  if (children) {
    childrenList.push(...Object.values(children)
      .filter(e => e.if !== false)
      .map(s => cr(s, user)));
  }

  if (templateSlots && templateSlots.size > 0) {
    childrenList.push(...Array.from(templateSlots.keys())
      .filter(e => templateSlots.get(e) && templateSlots.get(e)!.if !== false)
      .map(e => {
        const s = templateSlots.get(e) as MNodeTemplate;
        if (e.startsWith('slot-')) {
          // find named slot in user
          const name = e.slice(5);
          if (user && user[name]) {
            return user[name];
          }
          console.warn('slot not found in user', name);
        } else {
          return cr(s, user);
        }
      }));
  }

  if (innerText && innerText.length > 0) {
    console.log(innerText);
  }


  return React.createElement(type, props, ...childrenList);
};
