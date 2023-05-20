/**
 * @description web-component version datePicker
 * @author 阿怪
 * @date 2023/05/18 23:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/base/datePicker/api';
import { DatePickerProps } from '@shuimo-design/core/lib/base/datePicker';
import style from '@shuimo-design/core/lib/base/datePicker/datePicker.css?inline';

@createMElement({
  name: 'datePicker',
  props
})
export default class  extends LitElement implements DatePickerProps {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
