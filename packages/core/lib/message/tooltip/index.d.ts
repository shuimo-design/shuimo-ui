/**
 * @description tooltip api type
 * @author youus
 * @date 2022/4/4 01:22
 * @version v1.0.0
 *
 * @name m-tooltip
 * @docDescription Tooltip component with shuimo-ui style.
 *                 水墨组件的提示框组件。
 * @docUrl https://shuimo.janghood.com/tooltip
 *
 * Hello, humor
 */
import { Placement, PopperConfig } from '../../../composition/popper/usePopper';
import { MTeleportProps } from '../../../types/common/common';

export type TooltipProps = {
  /**
   * @description popover display placement
   * @type Placement
   * @default bottom
   */
  placement?: Placement,
  /**
   * @description Whether to render the popover content when the component is mounted
   * @type boolean
   * @default false
   */
  mountRender?: boolean,
  /**
   * @description Disables automatically closing the popover when the user clicks away from it
   * @type boolean
   * @default false
   */
  disableClickAway?: boolean,
  /**
   * @description If the content is just a simple string, it can be passed in as a prop
   * @type any
   * @default ''
   */
  content?: any,
  /**
   * @description Trigger the popper on hover
   * @type boolean
   * @default false
   */
  hover?: boolean,
  /**
   * @description floating-ui options, look: https://floating-ui.com/
   * @type PopperConfig
   * @default {}
   */
  popper?: PopperConfig,
  /**
   * @description popover teleport
   *              弹出框传送
   * @type teleport props
   * @default undefined
   */
  teleport?: MTeleportProps | undefined | boolean
};
