/**
 * @description border component
 * @author 阿怪
 * @date 2022/12/12 09:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { baseLineClass, lineType } from '@shuimo-design/core/lib/template/border/lineType';
import style from '@shuimo-design/core/lib/template/border/border.css?inline';

@createMElement({
  name: 'border'
})
export default class MBorder extends LitElement {

  static styles = unsafeCSS(style);

  lineTemplate() {
    return Object.keys(lineType).map(type => {
      return html`
        <div class=${[baseLineClass, `m-border-${type}-line`].join(' ')}></div>`;
    });
  }

  render() {
    return html`
      <div class="m-border">
        <div class="m-border-main">
          <slot></slot>
        </div>
        ${this.lineTemplate()}
      </div>`;
  }

}
