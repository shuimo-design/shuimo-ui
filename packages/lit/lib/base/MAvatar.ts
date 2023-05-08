/**
 * @description web-component version avatar
 * @author 阿怪
 * @date 2023/05/08 22:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/base/avatar/api';
import { AvatarProps } from '@shuimo-design/core/lib/base/avatar';
import style from '@shuimo-design/core/lib/base/avatar/avatar.css?inline';
import { clsx } from '@shuimo-design/tools/index';

@createMElement({
  name: 'avatar',
  props
})
export default class  extends LitElement implements AvatarProps {
  img?: string;
  size?: "large" | "default" | "small" = 'default';
  variant?: "circle" | "square" = 'circle';



  static styles = unsafeCSS(style);

  render(){
    return html`
      <div class=${clsx(['m-avatar', `m-avatar-${this.variant}`, `m-avatar-${this.size}`])}>
        <img src=${this.img} alt=""/>
        <div class="m-avatar-mask"></div>
      </div>`
  }

}
