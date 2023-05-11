/**
 * @description web-component version confirm
 * @author 阿怪
 * @date 2023/05/10 20:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo dialog and drawer should extract useModel,useTeleport,useMask , confirm need these
 */
import { html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/message/confirm/api';
import { ConfirmProps } from '@shuimo-design/core/lib/message/confirm';
import style from '@shuimo-design/core/lib/message/confirm/confirm.css?inline';

@createMElement({
  name: 'confirm',
  props: {
    ...props,
    show: { type: Boolean, default: false },
    // clickClose: { type: Boolean, default: false },
    to: { type: String, default: 'body' }
  }
})
export default class extends LitElement implements ConfirmProps {
  closeBtn?: boolean;
  mask?: any;
  visible?: boolean;
  show?: boolean;
  clickClose?: boolean = false;
  to?: string;

  static styles = unsafeCSS(style);

  handleClick() {
    this.visible = !this.visible;
  }

  closeModel(e?: MouseEvent) {
    this.visible = false;
    e?.stopPropagation();
  }

  handleDialogClickPropagation(e: MouseEvent) {
    e.stopPropagation();
  }

  maskClick() {
    if (this.clickClose) {
      this.closeModel();
    }
  }

  withMask(slot: TemplateResult) {
    return html`
      <div class=${['m-model-mask', this.show ? 'm-model-mask-bg' : ''].join(' ')}
           @click="${this.maskClick}">
        ${slot}
      </div>
    `;
  }

  render() {
    return html``;
  }

}
