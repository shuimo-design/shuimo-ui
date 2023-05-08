/**
 * @description web-component version drawer
 * @author 阿怪
 * @date 2023/05/08 00:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/message/drawer/api';
import { DrawerProps } from '@shuimo-design/core/lib/message/drawer';
import style from '@shuimo-design/core/lib/message/drawer/drawer.css?inline';
import modelStyle from '@shuimo-design/core/lib/style/model.css?inline';

@createMElement({
  name: 'drawer',
  props:{
    ...props,
    show: { type: Boolean, default: false },
    clickClose: { type: Boolean, default: false },
    to: { type: String, default: 'body' }
  }
})
export default class  extends LitElement implements DrawerProps {
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


  getDrawer() {
    return html`
      <div class=${['m-model-mask', this.show ? 'm-model-mask-bg' : ''].join(' ')}
           @click="${this.maskClick}">
        <div class="m-drawer" @click=${this.handleDialogClickPropagation}>
          <m-border>
            <slot/>
          </m-border>
        </div>
      </div>`;
  }

  getActive() {
    return html`
      <div class="m-drawer-active"
           @click=${(e: MouseEvent) => this.handleClick()}>
        <slot name="active"></slot>
      </div>`;
  }

  render() {
    return html`
      <div class="m-drawer-wrapper">
        ${this.getActive()}
        ${this.visible ? this.getDrawer() : ''}
      </div>`;
  }


}
