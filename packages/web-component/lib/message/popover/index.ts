/**
 * @description web-component popover
 * @author 阿怪
 * @date 2023/1/29 11:13
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Placement, PopoverProps, usePopover } from '@shuimo-design/core';
import { createMElement, MElement } from 'moelement';
import { MInitProps } from 'moelement/types/template';


@createMElement({
  name: 'm-popover',
  hookFunc: usePopover
})
export default class MPopover extends MElement implements PopoverProps {
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

  constructor() {
    super();
  }

  initTemplate(props: MPopover, initProps: MInitProps<MPopover>) {
    super.initTemplate(props, initProps);
    initProps(props, {
      onClick: (e: MouseEvent) => {
        this.show = !this.show;
      }
    });
  }

}
