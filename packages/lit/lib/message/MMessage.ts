/**
 * @description web-component version message
 * @author 阿怪
 * @date 2023/05/22 16:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/message/message/api';
import { MessageProps } from '@shuimo-design/core/lib/message/message';
import style from '@shuimo-design/core/lib/message/message/message.css?inline';

@createMElement({
  name: 'message'
  // props
})
// export default class  extends LitElement implements MessageProps {
export default class extends LitElement {

  static styles = unsafeCSS(style);

  render() {
    return html``;
  }

}
