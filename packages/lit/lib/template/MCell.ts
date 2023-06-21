/**
 * @description web-component version cell
 * @author 阿怪
 * @date 2023/06/21 01:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/template/cell/api';
import { CellProps } from '@shuimo-design/core/lib/template/cell';
import style from '@shuimo-design/core/lib/template/cell/cell.css?inline';

@createMElement({
  name: 'm-cell',
  props
})
export default class MCell extends LitElement implements CellProps {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
