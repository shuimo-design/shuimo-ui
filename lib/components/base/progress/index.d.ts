/**
 * @description process api type
 * @author 阿怪
 * @date 2022/4/17 01:12
 * @version v2.0.0
 *
 * @name m-progress
 * @docDescription progress component with shuimo-ui style.
 *                 水墨组件的进度条组件。
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
   * @default false
   */
  showInfo?: boolean,
};
