/**
 * @description table 组件类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type TableProps = {
  /**
   * @description table data
   *              表格内容
   * @type any[]
   */
  data?: Array<any>,
  /**
   * @description table height
   *              表格高度
   * @type string
   */
  height?: string | null,
  /**
   * @description auto add param class
   *             自动添加key class
   * @type boolean
   * @default false
   */
  paramClass?: boolean
};
