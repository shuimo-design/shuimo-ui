/**
 * @description list props type
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * @name m-list
 * @docDescription List component.
 *                 列表组件。
 * @docUrl https://shuimo.design/list
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type ListProps = {
  /**
   * @description List data
   *              列表数据
   * @default []
   */
  data?: Record<string, unknown>[],
  /**
   * @description all item use active style
   *              所有项使用激活样式
   * @default false
   */
  autoActive?: boolean
};
