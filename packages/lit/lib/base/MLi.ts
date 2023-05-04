/**
 * @description web-component version li
 * @author 阿怪
 * @date 2023/1/4 11:15
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/base/li/api';
import { LiProps } from '@shuimo-design/core/lib/base/li';
import style from '@shuimo-design/core/lib/base/li/li.css?inline';
import { clsx } from '@shuimo-design/tools/index';

@createMElement({
  name: 'li',
  props
})
export default class  extends LitElement implements LiProps {

  active: boolean = false;

  static styles = unsafeCSS(style);

  render(){
    return html`<li class=${clsx(['m-li', { 'm-li-active': this.active }])}>
      <slot/>
    </li>`
  }

}
