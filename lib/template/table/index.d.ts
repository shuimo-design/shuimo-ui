/**
 * @description table api type
 * @author 阿怪
 * @date 2022/4/17 02:04
 * @version v1.0.0
 *
 * @name w-table
 * @docDescription Table component with wash-painting-ui style.
 *                  水墨组件的表格组件。
 * @docUrl https://wash-painting.com/table
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type TableProps = {
  /**
   * @description table data
   *              表格内容
   * @type any[]
   */
  data?: Array<any>;
  /**
   * @description table height
   *              表格高度
   * @type string
   */
  height?: string | null;
}
