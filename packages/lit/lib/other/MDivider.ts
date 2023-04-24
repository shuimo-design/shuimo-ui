/**
 * @description web-component divider
 * @author 阿怪
 * @date 2023/3/1 22:16
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/other/divider/api';
import { DividerProps } from '@shuimo-design/core/lib/other/divider';
import style from '@shuimo-design/core/lib/other/divider/divider.css?inline';

@createMElement({
  name: 'divider',
  props
})
export default class MDivider extends LitElement implements DividerProps {
  vertical?: boolean;

  static styles = unsafeCSS(style);

  render(){
    return html`<div class=${['m-divider', this.vertical ? 'm-divider-vertical' : ''].join(' ')}/>`
  }
}
