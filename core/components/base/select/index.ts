/**
 * @description select core 导出
 * @author 阿怪
 * @date 2026/2/25 14:50
 * @version v2.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props } from './api';
import { useSelect } from './useSelect';

export const SelectCore = {
  props,
  useSelect,
};

export type { SelectProps } from './props';
export type { SelectOptionItem } from './useSelect';
