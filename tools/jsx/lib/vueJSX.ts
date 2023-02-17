/**
 * @description vue jsx tools
 * @author 阿怪
 * @date 2023/2/7 02:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import { mBoolean } from './common';


export const m = (type: string, props?: Record<string, any> | null, ...childList: MNodeTemplate[]) => {
  // for vue
  const children: MNodeTemplate['children'] = {};
  const slots: MNodeTemplate['slots'] = new Map();
  const innerText: MNodeTemplate['innerText'] = [];


  const handlerChildren = (childList: Array<MNodeTemplate | MNodeTemplate[] | string>) => {

    for (let i in childList) {
      const c = childList[i];
      if (typeof c === 'string') {
        innerText.push(c);
      } else if (Array.isArray(c)) {
        handlerChildren(c);
      } else {
        if (c === null) {
          continue;
        }
        if (c.props === null) {
          if (c.type === 'slot') {
            slots.set('default', c);
          }
          continue;
        }

        const name = `${c.type}-${i}`;
        if (!name) {continue;}
        if (c.type === 'slot') {
          slots.set(name, c);
        } else {
          children[name] = c;
        }
      }
    }
  };

  if (childList) {
    handlerChildren(childList);
  }
  const propsIf = props && props['m-if'];
  const propsShow = props && props['m-show'];

  const initProps = (templateProps: MCOPO<any>, _props: Record<string, any>, filter?: string[]) => {
    if (!props || !_props) return;
    Object.keys(templateProps)
      .filter(e => !filter || !filter.includes(e))
      .forEach(key => {
        if (_props.hasOwnProperty(key) && _props[key] !== undefined && _props[key] !== null) {
          props![key] = _props[key]!;
        }
      });
  };


  return { type, props, children, slots, innerText, if: mBoolean(propsIf), show: mBoolean(propsShow), initProps };
};
