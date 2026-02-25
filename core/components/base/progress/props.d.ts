/**
 * @description progress props type
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * @name m-progress
 * @docDescription Progress component.
 *                 进度条组件。
 * @docUrl https://shuimo.design/progress
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type ProgressProps = {
  /**
   * @description progress value
   *              进度条的值
   * @type number
   * @default 0
   */
  value?: number,
  /**
   * @description progress value max
   *              进度条最大值
   * @type number
   * @default 100
   */
  max?: number,
  /**
   * @description display value
   *              是否显示进度值
   * @type boolean
   * @default true
   */
  showInfo?: boolean,
};
