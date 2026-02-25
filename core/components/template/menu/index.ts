/**
 * @description menu core 导出
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props, DEFAULT_MENU_CONFIG } from './api';

export const MenuCore = {
  props,
};

export { DEFAULT_MENU_CONFIG };
export type { MenuProps, MenuData, MenuNodeData, MenuConfig } from './props';
export { useMenu } from './useMenu';
