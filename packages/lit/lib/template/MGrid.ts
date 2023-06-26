/**
 * @description web-component version grid
 * @author 阿怪
 * @date 2023/06/22 00:38
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/template/grid/api';
import { GridProps } from '@shuimo-design/core/lib/template/grid';
import style from '@shuimo-design/core/lib/template/grid/grid.css?inline';

@createMElement({
  name: 'm-grid',
  props
})
export default class MGrid extends LitElement implements GridProps {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
