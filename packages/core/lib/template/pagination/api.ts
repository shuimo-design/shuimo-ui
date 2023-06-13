/**
 * @description pagination api
 * @author 阿怪
 * @date 2022/4/17 01:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { PaginationProps } from './index';
import { MCOPO } from '@shuimo-design/types';

export const props: MCOPO<PaginationProps> = {
  total: { type: Number, default: 0 },
  current: { type: Number, default: undefined },
  defaultCurrent: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  pageSizes: { type: Array, default() {return [10, 20, 30, 40, 50, 100];} },
  layout: {
    default: 'prev, pager, next, jumper, total'
  },
  foldedMaxPageBtn: { type: Number, default: 5 },
  maxPageBtn: { type: Number, default: 10 },
  showEdgePageNum: { type: Boolean, default: true }
};
