/**
 * @description loading api type
 * @author 阿怪
 * @date 2022/8/25 11:07
 * @version v1.0.0
 *
 * @name m-loading
 * @docDescription loading component with shuimo-ui style.
 *                 水墨组件的加载组件。
 * @docUrl https://shuimo.janghood.com/loading
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type LoadingProps = {
  /**
   * @description transform speed
   * @type number
   * @default 1500
   */
  speed?: number,
  /**
   * @description with mask or not
   * @type boolean
   * @default false
   */
  mask?: boolean,
  /**
   * @description length of loading item's side (px)
   * @type number | string
   * @default 50
   */
  sideLength?: number | string
};
