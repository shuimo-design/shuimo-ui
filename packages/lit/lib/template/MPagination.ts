/**
 * @description web-component version pagination
 * @author 阿怪
 * @date 2023/05/25 23:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/template/pagination/api';
import { PaginationProps } from '@shuimo-design/core/lib/template/pagination';
import style from '@shuimo-design/core/lib/template/pagination/pagination.css?inline';

@createMElement({
  name: 'pagination',
  props
})
export default class  extends LitElement implements PaginationProps {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
