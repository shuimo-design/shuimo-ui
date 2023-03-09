/**
 * @description create MElement decorator
 * @author 阿怪
 * @date 2023/2/5 16:23
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { Result } from '@shuimo-design/jsx';
import { MStrings } from '@shuimo-design/jsx/lib/tools/MStrings';
import { MTemplate } from '@shuimo-design/jsx/lib/tools/MTemplate';
import { MProps } from '@shuimo-design/jsx/lib/tools/MProps';

const unpackStyle = (style: any): string => {
  if(style=== undefined) {
    return '';
  }
  if (Array.isArray(style)) {
    return style.map(e => unpackStyle(e)).join('\n');
  }
  if (style.default) {
    return style.default;
  }
  return '';
};

export const createMElement = <T>(component: {
  name: string,
  hookFunc: any // todo fix this
}, options?: {
  defaultRender: boolean;
}) => {
  const { name } = component;
  const { hookFunc } = component;

  return (target: typeof LitElement) => {
    const { options: { props, style }, getTemplate, onMountedHook } = hookFunc();

    initProps(props, target);

    class MElement extends target {

      static styles = css`${unsafeCSS(unpackStyle(style))}`;
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
        const proxy: Record<string, MProps | any> = {};
        Object.keys(props).forEach(key => {

          proxy[key] = props[key].needWrap ? new MProps({
            key: key,
            type: props[key].type,
            value: this[key as keyof this]
          }) : this[key as keyof this];
        });

        return proxy;
      }

      private strings?: MStrings;

      getTemplate() {
        if (!getTemplate) {
          const strings = new MStrings();
          return { strings, values: [] };
        }
        const t = getTemplate({ props: this.magicReplaceProps(), events: this, ref: this });


        const { strings, values } = this.renderTemplate(t);

        values.forEach(e => {
          if (e.value instanceof MProps) {
            e.value = this[e.value.key as keyof this];
          }
          if (e.name === 'ref') {
            e.value = ref(e.value);
          }
          if(e.name==='style'){
            e.value = Object.entries(e.value).map(([key,value])=>`${key}:${value}`).join(';');
          }

          // maybe we should call events in core hook function.
          // if (e.name.startsWith('on')) {
          // e.value = this[e.name as keyof this];
          // }
        });

        return { strings, values };
      }

      render() {
        const { strings, values } = this.getTemplate();
        if (!this.strings || !this.strings.compare(strings)) {
          this.strings = strings;
        }
        if (options?.defaultRender === false) {return super.render();}
        return html(this.strings, ...values.map(e => e.value));
      }

      updated() {
        if (onMountedHook) {
          onMountedHook(this);
        }
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
