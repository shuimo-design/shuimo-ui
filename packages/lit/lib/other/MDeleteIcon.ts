/**
 * @description web-component version deleteIcon
 * @author 阿怪
 * @date 2023/05/18 15:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { DeleteIconProps } from '@shuimo-design/core/lib/other/deleteIcon';
import style from '@shuimo-design/core/lib/other/deleteIcon/deleteIcon.css?inline';

@createMElement({
  name: 'deleteIcon',
})
export default class  extends LitElement implements DeleteIconProps {

  static styles = unsafeCSS(style);

  render(){
    return html`<div class="m-delete-icon"/>`
  }
}
