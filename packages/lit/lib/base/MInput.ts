/**
 * @description shuimo web component input
 * @author 阿怪
 * @date 2023/1/1 00:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { eventOptions } from 'lit/decorators.js';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/base/input/api';
import { InputProps } from '@shuimo-design/core/lib/base/input';
import { HTMLElementEvent } from '@shuimo-design/types';
import style from '@shuimo-design/core/lib/base/input/input.css?inline';

@createMElement({
  name: 'input',
  props
})
export default class MInput extends LitElement implements InputProps {

  disabled: boolean = false;
  value: string | number = '';
  placeholder: string = '';
  readonly: boolean = false;
  type: string = 'text';

  static styles = unsafeCSS(style);

  @eventOptions({ passive: true })
  onInput(e: HTMLElementEvent<HTMLInputElement>) {
    this.value = e.target.value;
  }

  withBorder(info: TemplateResult) {
    return html`
      <m-border
          class="${[
            'm-input',
            this.type === 'textarea' ? 'm-textarea' : '',
            this.disabled ? 'm-input-disabled' : ''
          ].join(' ')}">
        ${info}
      </m-border>`;
  }

  getTextarea() {
    return html`
      <textarea class="m-textarea-inner"
                rows="10"
                .value="${this.value}"
                .placeholder="${this.placeholder}"
                .disabled="${this.disabled}"
                .readOnly="${this.readonly}"
                @input="${this.onInput}"/>
    `;
  }

  getInput() {
    return html`
      <input class="m-input-inner"
             .value="${this.value}"
             .placeholder="${this.placeholder}"
             .disabled="${this.disabled}"
             .readOnly="${this.readonly}"
             @input="${this.onInput}"/>
    `;
  }

  render() {
    return this.withBorder(
      this.type === 'textarea' ? this.getTextarea() : this.getInput()
    );
  }
}
