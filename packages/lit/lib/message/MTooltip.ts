/**
 * @description web-component version tooltip
 * @author 阿怪
 * @date 2023/06/05 01:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/message/tooltip/api';
import { TooltipProps } from '@shuimo-design/core/lib/message/tooltip';
import style from '@shuimo-design/core/lib/message/tooltip/tooltip.css?inline';

@createMElement({
  name: 'tooltip',
  props
})
export default class  extends LitElement implements TooltipProps {
  content?: any;
  disableClickAway?: boolean;
  hover?: boolean;
  mountRender?: boolean;
  // placement?: Placement;
  // popper?: PopperConfig;
  // teleport?: MTeleportProps | boolean | undefined;



  static styles = unsafeCSS(style);

  render(){
    return html``
  }

}
