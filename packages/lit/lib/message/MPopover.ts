/**
 * @description web-component popover
 * @author 阿怪
 * @date 2023/1/29 11:13
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo support teleport
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


@createMElement({
  name: 'popover',
  props
})
export default class MPopover extends LitElement {
  static styles = unsafeCSS(style);

  content?: string;
  disableClickAway?: boolean;
  disabled?: boolean;
  hover?: boolean;
  placement?: Placement;
  show?: boolean | null;

  protected popperInstance: PopoverImpl | undefined;
  protected createPopover: ReturnType<typeof usePopover>['createPopover'] | undefined;

  @property()
  protected contentStyle: any = {};

  setContentStyle(val: any) {this.contentStyle = val;}

  constructor() {
    super();
    const { createPopover, getContent } = usePopover({ style: [this.contentStyle, this.setContentStyle, this] });
    this.createPopover = createPopover;
  }

  popoverRef: Ref<HTMLElement> = createRef();

  contentRef: Ref<HTMLElement> = createRef();

  handleSlotChange() {
    if (this.popoverRef.value && this.contentRef.value) {
      this.popperInstance = this.createPopover?.(this.popoverRef.value, this.contentRef.value);
    }
  }

  async handleClick() {
    this.popperInstance?.toggle();
  }

  render() {
    return html`
      <div class="m-popover">
        <div class="m-popover-default-wrapper"
             ref=${ref(this.popoverRef)}
             @click=${() => this.handleClick()}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        <div class="m-popover-content" ref=${ref(this.contentRef)} style=${styleMap(this.contentStyle ?? {})}>
          <slot name="content" @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }

}
