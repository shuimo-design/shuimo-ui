/**
 * @description table core 导出
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props } from './api';
import { useTable } from './useTable';

export const TableCore = {
  props,
  useTable,
};

export type { TableProps } from './props';
export { useTable } from './useTable';
