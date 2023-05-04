/**
 * @description web-component version form
 * @author 阿怪
 * @date 2023/03/10 02:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo not support submit ?
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/template/form/api';
import { FormProps } from '@shuimo-design/core/lib/template/form/form';
import style from '@shuimo-design/core/lib/template/form/form.css?inline';
import { clsx } from '@shuimo-design/tools/index';

@createMElement({
  name: 'form',
  props:{
    inline:props.inline
  }
})
export default class extends LitElement implements FormProps {
  inline: boolean = false;

  static styles = unsafeCSS(style);

  render() {
    return html`
      <form class=${clsx({
        'm-form': true,
        'm-form-inline': this.inline
      })}>
        <slot/>
      </form>`;
  }

}
