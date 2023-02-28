/**
 * @description web-component version switch
 * @author 阿怪
 * @date 2023/2/18 16:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { useSwitch } from '@shuimo-design/core';
import { createMElement, MElement } from '@shuimo-design/lit';
import { SwitchProps } from '@shuimo-design/core/lib/base/switch';

@createMElement({
  name: 'm-switch',
  hookFunc: useSwitch
})
export default class MSwitch extends MElement implements SwitchProps {
  activeInfo: string = '';
  activeValue: any;
  disabled: boolean = false;
  inactiveInfo: string = '';
  inactiveValue: any;
  loading: boolean = false;
  onControl: boolean = false;
  value: any;

  onClick(e: MouseEvent) {
    this.value = !this.value;
    this.dispatchEvent(new InputEvent('input'));
  }


}
