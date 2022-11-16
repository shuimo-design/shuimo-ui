/**
 * @description dom操作util
 * @author: 南歌子
 * @date 2021/01/08 09:14
 * @version V1.0.0
 *
 * Hello, humor
 */

/* istanbul ignore next */

const trim = (string: string) => {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

/* istanbul ignore next */
export function addClass(el: Element, cls: string) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el: Element, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/* istanbul ignore next */
export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/**
 * 获取dom的像素数值
 * @param elt
 * @param type
 */
export const getStyleNumber = (elt: Element, type: keyof CSSStyleDeclaration) => {
  if (elt) {
    const num = Number((window.getComputedStyle(elt)[type]! as string).replace('px', ''));
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

/**
 * 用于将DOMTokenList转换成Array获取class list 的方法
 * @param list DOMTokenList | HtmlCollection
 * @return array class array
 */
export const DOMTokenListToArray = (list: DOMTokenList | HTMLCollection) => {
  const array = [];
  for (let i = 0; i < list.length; i++) {
    array.push(list[i]);
  }
  return array;
};
