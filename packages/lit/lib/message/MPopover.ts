/**
 * @description web-component popover
 * @author 阿怪
 * @date 2023/1/29 11:13
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/message/popover/api';
import { Placement } from '@shuimo-design/core/composition/popper/usePopper';
import style from '@shuimo-design/core/lib/message/popover/popover.css?inline';
import { PopoverImpl, usePopover } from '@shuimo-design/core/lib/message/popover/usePopover';

const { createPopover, getContent } = usePopover();
@createMElement({
  name: 'popover',
  props
})
export default class MPopover extends LitElement {
  content?: string;
  disableClickAway?: boolean;
  disabled?: boolean;
  hover?: boolean;
  placement?: Placement;
  show?: boolean | null;

  protected popperInstance: PopoverImpl | undefined;

  static styles = unsafeCSS(style);

  popoverRef: Ref<HTMLElement> = createRef();

  contentRef: Ref<HTMLElement> = createRef();

  handleSlotChange() {
    if (this.popoverRef.value && this.contentRef.value) {
      this.popperInstance = createPopover(this.popoverRef.value, this.contentRef.value);
    }
  }

  @property()
  protected contentStyle: any = {};

  protected visible = false;
  async handleClick() {
    this.popperInstance?.toggle();
    if (!this.visible) {
      this.contentStyle = await this.popperInstance?.popperInstance.getPositionStyle() ?? {};
      this.visible = true;
    } else {
      this.contentStyle = {};
      this.visible = false;
    }
  }

  render() {
    return html`
      <div class="m-popover">
        <div class="m-popover-default-wrapper"
             ref=${ref(this.popoverRef)}
             @click=${() => this.handleClick()}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        <div class="m-popover-content" ref=${ref(this.contentRef)} style=${styleMap(this.contentStyle)}>
          <slot name="content" @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }

}
