/**
 * @description web-component version virtualList
 * @author 阿怪
 * @date 2023/07/18 20:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/template/virtualList/api';
import { VirtualListProps } from '@shuimo-design/core/lib/template/virtualList';
import style from '@shuimo-design/core/lib/template/virtualList/virtualList.css?inline';

@createMElement({
  name: 'm-virtual-list',
  props
})
export default class MVirtualList extends LitElement implements VirtualListProps {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
