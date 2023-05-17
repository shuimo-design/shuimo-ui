/**
 * @description web-component version select
 * @author 阿怪
 * @date 2023/05/11 17:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/base/select/api';
import { SelectProps } from '@shuimo-design/core/lib/base/select';
import style from '@shuimo-design/core/lib/base/select/select.css?inline';

@createMElement({
  name: 'select',
  props
})
export default class  extends LitElement implements SelectProps {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
