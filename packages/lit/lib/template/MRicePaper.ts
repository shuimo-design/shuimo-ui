/**
 * @description rice-paper component
 * @author 阿怪
 * @date 2022/12/17 13:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { RicePaperProps } from '@shuimo-design/core/lib/template/ricePaper/index.d';
import { props } from '@shuimo-design/core/lib/template/ricePaper/api';
import style from '@shuimo-design/core/lib/template/ricePaper/ricePaper.css?inline';

@createMElement({
  name: 'rice-paper',
  props
})
export default class MRicePaper extends LitElement implements RicePaperProps {

  cold: boolean = false;
  mountain: boolean = false;
  crane: boolean = false;

  static styles = unsafeCSS(style);

  mountainTemplate() {
    return this.mountain ? html`
      <div class="m-rice-paper-mountain"></div>` : '';
  }

  carneTemplate() {
    return this.crane ? html`
      <div class="m-rice-paper-crane"></div>` : '';
  }

  render() {
    return html`
      <div class="${['m-rice-paper', !this.cold ? 'm-rice-paper-warm' : undefined].join(' ')}">
        ${this.mountainTemplate()}
        ${this.carneTemplate()}
        <div class="m-rice-paper-main">
          <slot></slot>
        </div>
      </div>`;
  }
}
