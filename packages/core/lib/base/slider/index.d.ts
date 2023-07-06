/**
 * @description
 * @author 阿怪
 * @date 2023/06/29 17:54
 * @version v1.0.0
 *
 * @name m-slider
 * @docDescription slider component with shuimo-ui style.
 * @docUrl https://shuimo.janghood.com/slider,
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type SliderProps = {
  /**
   * @description slider value
   *              滑动条绑定值
   * @type number
   * @default 0
   * @vue
   */
  value?: number;
  /**
   * @description slider min
   *             滑动条最小值
   * @type number
   * @default 0
   */
  min?: number;
  /**
   * @description slider max
   *             滑动条最大值
   * @type number
   * @default 100
   */
  max?: number;
  /**
   * @description slider step
   *             滑动条步长
   * @type number
   * @default 1
   */
  step?: number;
  /**
   * @description slider disabled
   *             是否禁用
   * @type boolean
   * @default false
   */
  disabled?: boolean;
  /**
   * @description slider show-info
   *             是否显示信息
   * @type boolean
   * @default false
   */
  showInfo?: boolean
};
