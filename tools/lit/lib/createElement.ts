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
    const { options: { props, template, style }, getTemplate } = hookFunc();

    initProps(props, target);

    class MElement extends target {

      static styles = css`${unsafeCSS(style)}`;
      template: {
        strings: TemplateStringsArray;
        values: any[];
      };

      constructor() {
        super();
        this.template = { strings: this.getTemplate().strings, values: [] };
      }

      getTemplate() {
        if (getTemplate) {
          return getTemplate({ props: this });
        }
        return template;
      }

      render() {
        if (options?.defaultRender === false) {return super.render();}

        return html(this.getTemplate().strings, ...this.getTemplate().values);
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
