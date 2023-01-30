/**
 * @description component render tools
 * @author 阿怪
 * @date 2022/12/12 13:51
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '../../../types/template/template';

export const firstLetterLower = (str: string) => {
  return str.replace(/^\S/, (s) => s.toLowerCase());
};

export const h = (name: string, props?: MNodeTemplate['props']) => {
  const dom = document.createElement(name);
  if (props) {
    Object.keys(props).forEach(key => {
      if (key === 'class' && Array.isArray(props[key])) {
        dom.classList.add(...props[key] as string[]);
        return;
      }

      if (key.startsWith('on')) {
        dom.addEventListener(firstLetterLower(key.slice(2)), props[key] as EventListenerOrEventListenerObject);
        return;
      }
      if (props[key] === false) {
        return;
      }


      dom.setAttribute(key, props[key] as string);
    });
  }
  return dom;
};
