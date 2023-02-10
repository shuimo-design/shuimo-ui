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
import { Result } from '@shuimo-design/jsx';
import { MStrings } from '@shuimo-design/jsx/lib/tools/MStrings';
import { MTemplate } from '@shuimo-design/jsx/lib/tools/MTemplate';
import { MProps } from '@shuimo-design/jsx/lib/tools/MProps';

export const createMElement = <T>(component: {
  name: string,
  hookFunc: any // todo fix this
}, options?: {
  defaultRender: boolean;
}) => {
  const { name } = component;
  const { hookFunc } = component;

  return (target: typeof LitElement) => {
    const { options: { props, style }, getTemplate } = hookFunc();

    initProps(props, target);

    class MElement extends target {

      static styles = css`${unsafeCSS(style)}`;
      template: { strings: TemplateStringsArray; values: any[]; };

      constructor() {
        super();
        const { strings, values } = this.getTemplate();
        this.template = { strings, values };
      }


      private renderTemplate(result: Result) {
        // handle values
        const t = result as MTemplate;
        t.flatChildren();
        return t;
      }

      magicReplaceProps() {
        const proxy: Record<string, MProps> = {};
        Object.keys(props).forEach(key => {
          proxy[key] = new MProps({ type: key,value: this[key as keyof this] });
        });

        return proxy;
      }

      getTemplate() {
        if (!getTemplate) {
          const strings = new MStrings();
          return { strings, values: [] };
        }
        const t = getTemplate({ props: this.magicReplaceProps(), events: this });


        const { strings, values } = this.renderTemplate(t);

        values.forEach(e => {
          if (e.value instanceof MProps) {
            e.value = this[e.value.type as keyof this];
          }
        });

        return { strings, values };
      }

      render() {
        const { strings, values } = this.getTemplate();
        if (options?.defaultRender === false) {return super.render();}
        return html(strings, ...values.map(e => e.value));
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
