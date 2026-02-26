/**
 * @description tabs api
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { TabsProps, TabPaneProps } from './props';

export const props: MCOPO<TabsProps> = {
  modelValue: { type: [String, Number], required: true },
  items: { type: Array, default: () => [] },
  type: { type: String as MPropType<'line' | 'card'>, default: 'line' },
};

export const tabPaneProps: MCOPO<TabPaneProps> = {
  label: { type: String, required: true },
  name: { type: [String, Number], required: true },
  disabled: { type: Boolean, default: false },
  lazy: { type: Boolean, default: false },
};
