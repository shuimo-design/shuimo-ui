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
import type { Placement } from '../../dependents/_composables/usePopper';

export type MTooltipProps = {
  /**
   * @description popover display placement
   * @type Placement
   * @default bottom
   */
  placement?: Placement,
  /**
   * @description Disables automatically closing the popover when the user clicks away from it
   * @type boolean
   * @default false
   */
  disableClickAway?: boolean,
  /**
   * @description Offset in pixels along the trigger element
   * @type string
   * @default '0'
   */
  offsetSkid?: string,
  /**
   * @description Offset in pixels away from the trigger element
   * @type string
   * @default '12'
   */
  offsetDistance?: string,
  /**
   * @description Trigger the popper on hover
   * @type boolean
   * @default false
   */
  hover?: boolean,
  /**
   * @description Disables the Popper. If it was already open, it will be closed.
   * @type boolean
   * @default false
   */
  disabled?: boolean,
  /**
   * @description Open the Popper after a delay (ms).
   * @type number
   * @default 0
   */
  openDelay?: number,
  /**
   * @description Close the Popper after a delay (ms).
   * @type number
   * @default 0
   */
  closeDelay?: number,
  /**
   * @description Stop arrow from reaching the edge of the popper
   * @type string
   * @default '0'
   */
  arrowPadding?: string,
  /**
   * @description If the Popper should be interactive, it will close when clicked/hovered if false
   * @type boolean
   * @default true
   */
  interactive?: boolean,
  /**
   * @description Lock the Popper into place, it will not flip dynamically when it runs out of space if true
   * @type boolean
   * @default false
   */
  locked?: boolean,
  /**
   * @description If the content is just a simple string, it can be passed in as a prop
   * @type string
   * @default ''
   */
  content?: string
};
