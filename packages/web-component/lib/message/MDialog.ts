/**
 * @description web-component version dialog
 * @author 阿怪
 * @date 2023/04/10 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createMElement, MElement } from '@shuimo-design/lit';
import { useDialog, DialogProps } from '@shuimo-design/core';
import { HTMLElementEvent } from '@shuimo-design/types';

@createMElement({
  name: 'dialog',
  hookFunc: useDialog
})
export default class extends MElement implements DialogProps {
  closeBtn?: boolean;
  mask?: any;
  visible?: boolean;

  onClick(e: HTMLElementEvent<HTMLElement>) {
    this.visible = !this.visible;
  }

  onCloseDialog(e: HTMLElementEvent<HTMLElement>) {
    console.log(this.visible)
    this.visible = false;
  }

}
