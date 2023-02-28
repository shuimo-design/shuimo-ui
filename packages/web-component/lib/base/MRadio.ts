/**
 * @description input component
 * @author 阿怪
 * @date 2023/2/26 14:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { createMElement, MElement } from '@shuimo-design/lit';
import { RadioProps, useRadio } from '@shuimo-design/core';

@createMElement({
  name: 'm-radio',
  hookFunc: useRadio
})
export default class MRadio extends MElement implements RadioProps {
  label?: string | number;
  value?: string | number;

  onClick(e: MouseEvent) {
    if (this.value !== this.label) {
      this.value = this.label;
    } else {
      this.value = '';
    }
    this.dispatchEvent(new InputEvent('input'));
  }
}
