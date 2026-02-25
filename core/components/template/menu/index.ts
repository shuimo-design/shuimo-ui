/**
 * @description menu core 导出
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props, DEFAULT_MENU_CONFIG } from './api';
import { useMenu } from './useMenu';

export const MenuCore = {
  props,
  useMenu,
};

export { DEFAULT_MENU_CONFIG };
export { useMenu } from './useMenu';
export type { MenuProps, MenuData, MenuNodeData, MenuConfig } from './props';
