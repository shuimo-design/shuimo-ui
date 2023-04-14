/**
 * @description react render
 * @author 阿怪
 * @date 2023/4/7 10:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createElement, ReactNode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import * as MReact from '@shuimo-design/react/index';
import { MError } from '../../plugins/console';
import { parse } from '../ast/html/HTMLAST';


function toPascalCase(str: string) {
  const words = str.split('-');
  const upperCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return upperCaseWords.join('');
}

export default function useReactRender(): IRender {

  let root: Root | undefined;

  const _createElement = (item: DOMAst) => {

    // only for shuimo
    if (item.name.startsWith('m-')) {
      item.name = toPascalCase(item.name);
    }

    const children: ReactNode[] = [];
    const attrs: Record<string, string | ReactNode> = item.attrs ?? {};
    // handle children
    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => {
        // handle <template v-slot> => todo find a better way
        if (child.name === 'template' && child.attrs) {
          const nameSlot = Object.keys(child.attrs).find(key => key.includes('v-slot'));
          if (nameSlot) {
            const slotName = nameSlot.replace('v-slot:', '');
            attrs[slotName] = _createElement(child);
            return;
          }
        }
        children.push(_createElement(child));
      });
    }

    // @ts-ignore need help
    const c = MReact[item.name];
    return createElement(c ?? item.name, attrs, item.innerHTML, ...children);
  };

  const getElement = (code: TemplateCode) => {
    const ast = parse(code.templateHTML);
    let res;
    try {
      res = createElement('div', {}, ...ast
        .map((item) => _createElement(item)));
    } catch (e) {
      console.warn('render error');
      MError(e);
    }
    return res;
  };


  const initRoot = () => {
    if (!root) {
      root = createRoot(document.querySelector('.render')!);
    }
  };

  const init = async (code: TemplateCode) => {
    initRoot();
    const element = getElement(code);
    root!.render(element);
  };

  const update = async (code: TemplateCode) => {
    initRoot();
    const element = getElement(code);
    root!.render(element);
  };

  const clear = () => {
    if (root) {
      root.unmount();
      root = undefined;
    }
  };

  return {
    init, update, clear
  };
}
