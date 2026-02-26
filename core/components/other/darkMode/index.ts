/**
 * @description dark mode core 导出
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.1.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props } from './api';
import { useDarkMode } from './useDarkMode';

export const DarkModeCore = {
  props,
  useDarkMode,
};

export type { DarkModeProps } from './props';
