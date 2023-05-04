/**
 * @description web-component version formItem
 * @author 阿怪
 * @date 2023/03/10 02:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { formItemProps } from '@shuimo-design/core/lib/template/form/api';
import { FormItemProps } from '@shuimo-design/core/lib/template/form/formItem';
import style from '@shuimo-design/core/lib/template/form/formItem.css?inline';

@createMElement({
  name: 'form-item',
  props: formItemProps
})
export default class extends LitElement implements FormItemProps {

  label: string = '';
  prop: string = '';

  static styles = unsafeCSS(style);

  get labelSlot() {
    return this.label?this.label:html`<slot name="label"></slot>`;
  }

  get defaultSlot() {
    return html`<slot></slot>`;
  }

  render() {
    return html`<div class="m-form-item">
      <label for=${this.prop} class="m-form-item-label">
        ${this.labelSlot}
      </label>
      <div class="m-form-item-content">${this.defaultSlot}</div>
    </div>`;
  }

}
