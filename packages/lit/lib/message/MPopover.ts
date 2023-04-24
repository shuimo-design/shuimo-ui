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
import { createMElement } from '../../base/createElement';
import { PopoverProps } from '@shuimo-design/core/lib/message/popover';
import { props } from '@shuimo-design/core/lib/message/popover/api';
import { Placement } from '@shuimo-design/core/composition/popper/usePopper';
import style from '@shuimo-design/core/lib/message/popover/popover.css?inline';
import { usePopover } from '@shuimo-design/core/lib/message/popover/usePopover';


const { init, trigger } = usePopover();
@createMElement({
  name: 'popover',
  props
})
export default class MPopover extends LitElement implements PopoverProps {
  closeDelay?: number;
  content?: string;
  disableClickAway?: boolean;
  disabled?: boolean;
  hover?: boolean;
  interactive?: boolean;
  locked?: boolean;
  offsetDistance?: string;
  offsetSkid?: string;
  openDelay?: number;
  placement?: Placement;
  show?: boolean | null;

  static styles = unsafeCSS(style);

  popoverRef: Ref<HTMLElement> = createRef();

  contentRef: Ref<HTMLElement> = createRef();

  handleSlotChange() {
    if (this.popoverRef.value && this.contentRef.value) {
      init(this.popoverRef.value, this.contentRef.value);
    }
  }

  handleClick() {
    trigger();
  }

  render() {
    return html`
      <div class="m-popover">
        <div class="m-popover-default-wrapper"
             ref=${ref(this.popoverRef)}
             @click=${() => this.handleClick()}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        <div class="m-popover-content" ref=${ref(this.contentRef)}>
          <slot name="content" @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }

}
