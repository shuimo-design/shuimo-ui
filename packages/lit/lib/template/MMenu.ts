/**
 * @description web-component version menu
 * @author 阿怪
 * @date 2023/08/03 15:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/template/menu/api';
import { MenuProps } from '@shuimo-design/core/lib/template/menu';
import style from '@shuimo-design/core/lib/template/menu/menu.css?inline';

@createMElement({
  name: 'm-menu',
  props
})
export default class MMenu extends LitElement implements MenuProps {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
