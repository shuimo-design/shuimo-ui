/**
 * @description web-component version confirm
 * @author 阿怪
 * @date 2023/05/10 20:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/message/confirm/api';
import { ConfirmProps } from '@shuimo-design/core/lib/message/confirm';
import style from '@shuimo-design/core/lib/message/confirm/confirm.css?inline';

@createMElement({
  name: 'confirm',
  props
})
export default class  extends LitElement implements ConfirmProps {

  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
