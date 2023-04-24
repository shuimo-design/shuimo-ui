/**
 * @description create MElement decorator
 * @author 阿怪
 * @date 2023/2/5 16:23
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MCOPO } from '@shuimo-design/types';

export const createMElement = <T>(component: {
  name: string,
  props?: MCOPO<T>
}) => {

  const { name, props } = component;

  return (target: typeof LitElement) => {
    initProps(props, target);

    class MElement extends target {

    }

    // @ts-ignore todo find a better way to replace window.shuimo.wc.prev
    const wcName = `${window.shuimo.wc.prev}-${name}`;

    if (window.customElements.get(wcName)) {
      console.warn(`${wcName} is already defined, please check your code.`);
      return;
    }

    return customElement(wcName)(MElement as typeof LitElement);
  };
};

const initProps = (props: any, target: any) => {
  if (!props) {return;}
  for (const key in props) {
    let attribute:  boolean | string|undefined = undefined;

    // 如果key是驼峰的, 转一下
    const keyName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (keyName !== key) {
      attribute = keyName;
    }

    property({ type: props[key].type, attribute })(target.prototype, key);
  }
};
