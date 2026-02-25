/**
 * @description menu 运行时 props
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { MenuProps } from './props';

export const DEFAULT_MENU_CONFIG = {
  key: 'key',
  label: 'label',
  children: 'children',
};

export const props: MCOPO<MenuProps> = {
  data: { type: Array, default: () => [] },
  config: { type: Object, default: () => ({ ...DEFAULT_MENU_CONFIG }) },
  checkbox: { type: Boolean, default: false },
  defaultExpandAll: { type: Boolean, default: false },
  checkedKeys: { type: Array, default: () => [] },
};
