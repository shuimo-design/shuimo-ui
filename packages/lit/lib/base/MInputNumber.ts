/**
 * @description web-component version inputNumber
 * @author 阿怪
 * @date 2023/06/06 23:33
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/base/inputNumber/api';
import { InputNumberProps } from '@shuimo-design/core/lib/base/inputNumber';
import style from '@shuimo-design/core/lib/base/inputNumber/inputNumber.css?inline';

@createMElement({
  name: 'input-number',
  props
})
export default class  extends LitElement implements InputNumberProps {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
