/**
 * @description pagination props 类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type PaginationProps = {
  /**
   * @description 分页总条数
   * @type number
   * @default 0
   */
  total?: number;
  /**
   * @description 当前页（受控）
   * @type number
   * @default undefined
   */
  modelValue?: number;
  /**
   * @description 默认当前页（非受控初始值）
   * @type number
   * @default 1
   */
  defaultCurrent?: number;
  /**
   * @description 每页数量
   * @type number
   * @default 10
   */
  pageSize?: number;
  /**
   * @description 可选每页数量列表
   * @type number[]
   * @default [10, 20, 30, 40, 50, 100]
   */
  pageSizes?: number[];
  /**
   * @description 组件布局，逗号分隔，可选值：prev, pager, next, total
   * @type string
   * @default 'prev, pager, next, total'
   */
  layout?: string;
  /**
   * @description 折叠时最多显示的页码按钮数（必须为奇数，偶数自动 +1）
   * @type number | null
   * @default 5
   */
  foldedMaxPageBtn?: number | null;
  /**
   * @description 不折叠时最大显示页数，超过后启用折叠逻辑
   * @type number | null
   * @default 10
   */
  maxPageBtn?: number | null;
  /**
   * @description 是否显示首尾边缘页码
   * @type boolean
   * @default true
   */
  showEdgePageNum?: boolean;
};
