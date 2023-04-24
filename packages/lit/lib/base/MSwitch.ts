/**
 * @description web-component version switch
 * @author 阿怪
 * @date 2023/2/18 16:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo fix loading css,click event
 */

import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { SwitchProps } from '@shuimo-design/core/lib/base/switch';
import { props } from '@shuimo-design/core/lib/base/switch/api';
import style from '@shuimo-design/core/lib/base/switch/switch.css?inline';
import { getIsActive, switchIsBoolean } from '@shuimo-design/core/lib/base/switch/useSwitch';
import { isEmpty } from '@shuimo-design/tools/empty';

@createMElement({
  name: 'switch',
  props
})
export default class MSwitch extends LitElement implements SwitchProps {
  activeInfo: string = '';
  activeValue: any;
  disabled: boolean = false;
  inactiveInfo: string = '';
  inactiveValue: any;
  loading?: boolean;
  onControl: boolean = false;
  value: any;

  static styles = unsafeCSS(style);

  constructor() {
    super();
    const isBoolean = this.isBoolean;
    if (isBoolean) {
      // 如果activeValue和inactiveValue都为空
      if (isEmpty(this.activeValue) && isEmpty(this.inactiveValue)) {
        this.activeValue = true;
        this.inactiveValue = false;
      }
    }
  }

  onClick(e: MouseEvent) {
    this.value = !this.value;
    this.dispatchEvent(new InputEvent('input'));
  }

  getInfo(key: keyof Pick<SwitchProps, 'activeInfo' | 'inactiveInfo'>) {
    if (this[key]) {
      return html`<span class="m-switch-span">${this[key]}</span>`;
    }
    return html`
      <slot name="${key}">`;
  };


  changeSwitch() {
    this.value = !this.value;
  }


  get isBoolean() {
    return switchIsBoolean(this.value);
  }

  get isActive() {
    return getIsActive(this.value, this.activeValue);
  }


  render() {
    return html`
      <div class=${[
        'm-switch',
        this.isActive ? 'm-switch-active' : 'm-switch-inactive',
        this.loading ? 'm-switch-loading' : '',
        this.disabled ? 'm-switch-disabled' : ''
      ].join(' ')}>
        ${this.getInfo('activeInfo')}
        <div class="m-switch-main">
          <div class="m-switch-core" @click=${this.changeSwitch}>
            <div class="m-switch-core-border"></div>
          </div>
        </div>
        ${this.getInfo('inactiveInfo')}
      </div>`;
  }


}
