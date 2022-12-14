/**
 * @description pagination api type
 * @author 阿怪
 * @date 2022/4/17 01:47
 * @version v1.0.0
 *
 * @name m-pagination
 * @docDescription pagination component with shuimo-ui style.
 *                 水墨组件的分页组件。
 * @docUrl https://shuimo.janghood.com/pagination
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type PaginationProps = {
  /**
   * @description page total
   *              分页总数
   * @type number
   * @default 0
   */
  total?: number,
  /**
   * @description current page number
   *              当前页
   * @type number
   * @default undefined
   */
  current?: number,
  /**
   * @description current page number
   *              当前页
   * @type number
   * @default undefined
   */
  modelValue?: number,
  /**
   * @description default current page number
   *              默认当前页
   * @type number
   * @default undefined
   */
  defaultCurrent?: number,
  /**
   * @description page size
   *              每页数量
   * @type number
   * @default 10
   */
  pageSize?: number,
  /**
   * @description page size select list
   *              可选每页数量
   * @type number[]
   * @default [10, 20, 30, 40, 50, 100]
   */
  pageSizes?: number[],
  /**
   * @description component layout
   *              组件显示
   * @type string
   * @default 'prev, pager, next, jumper, total'
   */
  layout?: string,
  /**
   * @description show pages when folded
   *              折叠时最多显示页码按钮数
   * @type number
   * @default 5
   */
  foldedMaxPageBtn?: number,
  /**
   * @description the max display pages
   *              最大显示页数
   * @type number
   * @default 10
   */
  maxPageBtn?: number
};
