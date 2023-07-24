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
import { PopoverProps } from '@shuimo-design/core/lib/message/popover';


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
  @property()
  protected arrowStyle: any = {};
  @property()
  protected _placement: any = {};

  setContentStyle(val: any) {this.contentStyle = val;}

  setArrowStyle(val: any) {this.arrowStyle = val;}

  setPlacement(val: any) {this._placement = val;}

  constructor() {
    super();
    const { createPopover, getContent } = usePopover({
      value: {
        style: [this.contentStyle, this.setContentStyle, this],
        arrowStyle: [this.arrowStyle, this.setArrowStyle, this],
        placement: [this._placement, this.setPlacement, this]
      },
      props: this as unknown as Required<PopoverProps>
    });
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
