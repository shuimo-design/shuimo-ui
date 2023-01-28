/**
 * @description shuimo core tsx support
 * @author 阿怪
 * @date 2023/1/16 11:45
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '../types';
import { MCOPO } from '@shuimo-design/types';

export const m = (type: string, props?: Record<string, any> | null, ...childList: MNodeTemplate[]) => {
  // for vue
  const children: MNodeTemplate['children'] = {};
  const slots: MNodeTemplate['slots'] = new Map();
  const innerText: MNodeTemplate['innerText'] = [];

  const handlerChildren = (childList: Array<MNodeTemplate | MNodeTemplate[] | string>) => {

    for (let c of childList) {
      if (typeof c === 'string') {
        innerText.push(c);
      } else if (Array.isArray(c)) {
        handlerChildren(c);
      } else {
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

export const mWC = (type: string, propsRecord?: Record<string, any> | null, ...childList: MNodeTemplate[]) => {
  // for web-component, web-component template depth must less than 2
  let props = propsRecord || {};
  if (type === 'slot') {
    props.name = !props || !props['m-name'] ? 'default' : props['m-name'];
  }
  const propsIf = props && props['m-if'];
  const propsShow = props && props['m-show'];


  const children: MNodeTemplate['children'] = {};
  const slots = new Map();
  const innerText: MNodeTemplate['innerText'] = [];

  const handlerChildren = (childList: Array<MNodeTemplate | MNodeTemplate[] | string>) => {

    for (let c of childList) {
      if (typeof c === 'string') {
        innerText.push(c);
      } else if (Array.isArray(c)) {
        handlerChildren(c);
      } else {
        if (c.type === 'slot') {
          slots.set(c.props!.name, c);
        } else {
          const name = c.props!['m-name'] as string;
          if (!name) {
            console.warn('m-name is required for child of web-component');
          }
          children[name] = c;
        }
      }
    }


  };

  if (childList) {
    handlerChildren(childList);
  }

  const initProps = <T = any>(templateProps: MCOPO<any>, _props: Record<string, any>, filter: string[]) => {
    if (!props) return;
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


export const shuimoJsxFragment = (...arg: any) => {
  console.log(...arg);
};

const mBoolean = (v: string | boolean | undefined, defaultValue = true) => {
  if (v === 'false') {return false;}
  if (v === 'true') {return true;}
  if (v === undefined || v === null) {return defaultValue;}
  console.warn('m-if or m-show only support string "true" or "false"');
  return false;
};
