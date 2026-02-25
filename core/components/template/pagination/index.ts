/**
 * @description pagination core 导出
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props } from './api';

export const PaginationCore = {
  props,
};

export type { PaginationProps } from './props';
export { usePagination, type Pager } from './usePagination';
