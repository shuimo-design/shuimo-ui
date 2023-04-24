/**
 * @description input component
 * @author 阿怪
 * @date 2023/2/26 14:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo fix name
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { RadioProps } from '@shuimo-design/core/lib/base/radio';
import { props } from '@shuimo-design/core/lib/base/radio/api';
import { createRadioId, initChecked } from '@shuimo-design/core/lib/base/radio/useRadio';
import { notEmpty } from '@shuimo-design/tools/empty';
import style from '@shuimo-design/core/lib/base/radio/radio.css?inline';

@createMElement({
  name: 'radio',
  props
})
export default class MRadio extends LitElement implements RadioProps {
  checked?: boolean | null = false;
  label: string | number = '';
  modelValue: any = undefined;
  name: string = '';
  value: any = undefined;

  static styles = unsafeCSS(style);


  id = createRadioId();

  onClick(e: MouseEvent) {
    // if (this.disabled) {
    //   e.preventDefault();
    // }
  }

  getSlotsDefault(){
    return notEmpty(this.label)?this.label:html`<slot/>`;
  }

  render() {
    const checked = initChecked(this as Required<RadioProps>);
    return html`<label class="m-radio" for=${this.id}>
      <input type="radio" class="m-radio-input" id=${this.id}
             name=${this.name} .checked=${checked} value=${this.value}
             @click=${this.onClick}/>
      ${this.getSlotsDefault()}
    </label>`
  }

}
