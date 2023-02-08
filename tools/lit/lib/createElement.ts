/**
 * @description create MElement decorator
 * @author 阿怪
 * @date 2023/2/5 16:23
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement, unsafeCSS } from 'lit';

export const createMElement = <T>(component: any, options?: {
  defaultRender: boolean;
}) => {
  const { name } = component;
  const { hookFunc } = component;

  return (target: typeof LitElement) => {
    const { options: { props, style }, getTemplate } = hookFunc();

    initProps(props, target);

    class MElement extends target {

      static styles = css`${unsafeCSS(style)}`;
      template: {
        strings: TemplateStringsArray;
        values: any[];
      };

      constructor() {
        super();
        const { strings, values } = this.getTemplate();
        this.template = { strings, values };
      }

      getTemplate() {
        if (!getTemplate) {return { strings: undefined, values: [] };}
        const { strings, values } = getTemplate({ props: this, events: this });

        // handle values
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (typeof value === 'object') {
            const { func,name:funcName } = value;
            // 首字母大写且前面加on
            const name = `on${funcName[0].toUpperCase()}${funcName.slice(1)}`  as keyof MElement;;
            if (name in this && typeof this[name] === 'function') {
              values[i] = this[name];
            } else {
              values[i] = func;
            }
          }
        }
        return { strings, values };
      }

      render() {
        const { strings, values } = this.getTemplate();
        if (options?.defaultRender === false) {return super.render();}
        return html(strings, ...values);
      }
    }

    return customElement(name)(MElement as typeof LitElement);
  };
};


// const initProps = (props: MCOPO<T>, target: any) => {
const initProps = (props: any, target: any) => {
  for (const key in props) {
    property({ type: props[key].type })(target.prototype, key);
  }
};
