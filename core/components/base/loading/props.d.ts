/**
 * @description loading api type
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * @name m-loading
 * @docDescription Loading component with shuimo-ui style.
 *                 水墨组件的加载组件。
 * @docUrl https://shuimo.design/loading
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type LoadingProps = {
  /**
   * @description 是否显示 loading
   * @type boolean
   * @default false
   */
  modelValue?: boolean,
  /**
   * @description transform speed
   *              动画速度（毫秒）
   * @type number
   * @default 1500
   */
  speed?: number,
  /**
   * @description logo size
   *              logo 大小倍数
   * @type number
   * @default 1
   */
  size?: number,
  /**
   * @description with mask or not
   *              是否显示遮罩
   * @type boolean
   * @default false
   */
  mask?: boolean,
  /**
   * @description length of loading item's side (px)
   *              loading 元素的边长（px）
   * @type number | string
   * @default 64
   */
  sideLength?: number | string
};
