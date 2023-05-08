/**
 * @description web-component version dialog
 * @author 阿怪
 * @date 2023/04/10 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo onInput->like v-model issue...
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import style from '@shuimo-design/core/lib/message/dialog/dialog.css?inline';
import modelStyle from '@shuimo-design/core/lib/style/model.css?inline';
import { props } from '@shuimo-design/core/lib/message/dialog/api';
import { DialogProps } from '@shuimo-design/core/lib/message/dialog';

@createMElement({
  name: 'dialog',
  props: {
    ...props,
    show: { type: Boolean, default: false },
    clickClose: { type: Boolean, default: false },
    to: { type: String, default: 'body' }
  }
})
export default class extends LitElement implements DialogProps {
  closeBtn?: boolean;
  mask?: any;
  visible?: boolean;
  show?: boolean;
  clickClose?: boolean;
  to?: string;

  static styles = unsafeCSS(style+modelStyle);


  handleClick() {
    this.visible = !this.visible;
  }

  closeDialog(e?: MouseEvent) {
    this.visible = false;
    e?.stopPropagation();
  }

  handleDialogClickPropagation(e: MouseEvent) {
    e.stopPropagation();
  }

  getCloseDialog() {
    return html`
      <div @click=${(e: MouseEvent) => this.closeDialog(e)}
           class="m-model-close-btn m-cursor-pointer"/>`;
  }

  maskClick() {
    if (this.clickClose) {
      this.closeDialog();
    }
  }

  getDialog() {
    return html`
      <div class=${['m-model-mask', this.show ? 'm-model-mask-bg' : ''].join(' ')}
           @click="${this.maskClick}">
        <div class="m-dialog" @click=${this.handleDialogClickPropagation}>
          ${this.closeBtn ? this.getCloseDialog() : ''}
          <slot/>
        </div>
      </div>`;
  }

  getActive() {
    return html`
      <div class="m-dialog-active"
           @click=${(e: MouseEvent) => this.handleClick()}>
        <slot name="active"></slot>
      </div>`;
  }

  render() {
    return html`
      <div class="m-dialog-wrapper">
        ${this.getActive()}
        ${this.visible ? this.getDialog() : ''}
      </div>`;
  }


}
