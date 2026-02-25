/**
 * @description pagination 运行时 props
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { PaginationProps } from './props';

export const props: MCOPO<PaginationProps> = {
  total: { type: Number, default: 0 },
  modelValue: { type: Number, default: undefined },
  defaultCurrent: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  pageSizes: { type: Array, default: () => [10, 20, 30, 40, 50, 100] },
  layout: { type: String, default: 'prev, pager, next, total' },
  foldedMaxPageBtn: { type: Number, default: 5 },
  maxPageBtn: { type: Number, default: 10 },
  showEdgePageNum: { type: Boolean, default: true },
};
