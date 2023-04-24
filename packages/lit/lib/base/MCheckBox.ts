/**
 * @description checkbox component
 * @author 阿怪
 * @date 2023/1/3 16:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { CheckboxProps } from '@shuimo-design/core/lib/base/checkbox';
import { initChecked } from '@shuimo-design/core/lib/base/checkbox/useCheckbox';
import { props } from '@shuimo-design/core/lib/base/checkbox/api';
import { notEmpty } from '@shuimo-design/tools/empty';
import style from '@shuimo-design/core/lib/base/checkbox/checkbox.css?inline';

@createMElement({
  name: 'checkbox',
  props
})
export default class MCheckBox extends LitElement implements CheckboxProps {

  checked?: boolean | undefined;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  value?: string | number;
  modelValue?: boolean | undefined;

  static styles = unsafeCSS(style);

  onChange() {
    this.checked = !this.checked;
    this.dispatchEvent(new Event('change'));
  }

  onClick() {
    this.checked = !this.checked;
    this.dispatchEvent(new Event('click'));
  }

  private getInput() {
    const checked = initChecked(this as Required<CheckboxProps>);
    return html`<input type="checkbox" checked=${checked}/>`;
  }

  private getCheckboxInner() {
    return html`<div class="m-checkbox-checkbox-inner"/>`;
  }

  private getSlot() {
    return notEmpty(this.label) ?
      html`<span>{props.label}</span>` : html`<slot></slot>`;
  }

  private getLabel() {
    return html`<label class="m-checkbox-slot">
      ${this.getSlot()}
    </label>`;
  }

  render() {
    return html`
      <div class="m-checkbox"
           @click=${this.onClick}
           @change=${this.onChange}>
        ${this.getInput()}
        <div class="m-checkbox-checkbox"/>
        ${this.checked ? this.getCheckboxInner() : null}
        ${this.getLabel()}
      </div>`;
  }
}
