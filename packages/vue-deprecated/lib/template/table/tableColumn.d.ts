/**
 * @description table item api type
 * @author 阿怪
 * @date 2022/4/17 02:05
 * @version v1.0.0
 *
 * @name m-table-column
 * @docDescription Table column component with shuimo-ui style.
 *                  水墨组件的表格列组件。
 * @docUrl https://shuimo.janghood.com/table#column
 * @sourceSymbol MTableColumn
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
  width?: string,
  /**
   * @description table column param
   *              列对应的参数
   * @type string
   * @default ''
   */
  param?: string,
  /**
   * @description table column label
   *              列名
   * @type string
   * @default ''
   */
  label?: string
}
