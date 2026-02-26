/**
 * @description collapse 运行时 props
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { CollapseItemProps, CollapseProps } from './props';

export const props: MCOPO<CollapseProps> = {
  modelValue: { type: [Array, String, Number], required: true },
  accordion: { type: Boolean, default: false },
};

export const itemProps: MCOPO<CollapseItemProps> = {
  name: { type: [String, Number], required: true },
  title: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
};
