/**
 * @description button component
 * @author 阿怪
 * @date 2022/12/10 14:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { eventOptions } from 'lit/decorators.js';
import { createMElement } from '../../base/createElement';
import { ButtonProps } from '@shuimo-design/core/lib/base/button';
import { props } from '@shuimo-design/core/lib/base/button/api';
import style from '@shuimo-design/core/lib/base/button/button.css?inline';

@createMElement({
  name: 'button',
  props
})
export default class MButton extends LitElement implements ButtonProps {

  disabled?: boolean;
  link: boolean = false;
  text: string | undefined;
  type: string = 'default';

  static styles = unsafeCSS(style);

  @eventOptions({ passive: true })
  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
    }
  };

  getSlot() {
    return this.text ? html`<span>${this.text}</span>` : html`<slot/>`;
  }

  render() {
    return this.link ? html`
      <a class="${['m-button', `m-button-${this.type ?? 'default'}`].join(' ')}"
         .disabled="${this.disabled}"
         @click="${this.onClick}">
        ${this.getSlot()}
      </a>
    ` : html`
      <button class="${['m-button', `m-button-${this.type ?? 'default'}`].join(' ')}"
              .disabled="${this.disabled}"
              @click="${this.onClick}">
        ${this.getSlot()}
      </button>
    `;
  }
}
