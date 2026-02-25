/**
 * @description tableColumn 组件类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type TableColumnProps = {
  /**
   * @description table column width
   *              列宽
   * @type string
   * @default ''
   */
  width?: string;
  /**
   * @description table column param
   *              列对应的参数字段名
   * @type string
   * @default ''
   */
  param?: string;
  /**
   * @description table column label
   *              列标题
   * @type string
   * @default ''
   */
  label?: string;
};
