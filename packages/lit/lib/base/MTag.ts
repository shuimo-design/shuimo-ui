/**
 * @description web-component version tag
 * @author 阿怪
 * @date 2023/3/1 01:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/base/tag/api';
import { TagProps } from '@shuimo-design/core/lib/base/tag';
import style from '@shuimo-design/core/lib/base/tag/tag.css?inline';

@createMElement({
  name: 'tag',
  props: {
    ...props,
    text: { type: String }
  }
})
export default class MTag extends LitElement implements TagProps {
  type?: string = 'default';
  text?: string;

  static styles = unsafeCSS(style);

  getSlot() {
    return this.text ? this.text : html`<slot/>`;
  }

  render() {
    return html`
      <div class=${['m-tag', `m-tag-${this.type}`].join(' ')}>
        <div class="m-tag-left"></div>
        <div class="m-tag-main">
          ${this.getSlot()}
        </div>
        <div class="m-tag-right"></div>
      </div>`;
  }
}
