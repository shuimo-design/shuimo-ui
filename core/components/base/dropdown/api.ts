/**
 * @description dropdown 运行时 props
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { DropdownItemProps, DropdownProps } from './props';

export const props: MCOPO<DropdownProps> = {
  trigger: {
    type: String as MPropType<'click' | 'hover'>,
    default: 'click',
  },
  placement: {
    type: String as MPropType<'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end'>,
    default: 'bottom',
  },
  disabled: { type: Boolean, default: false },
};

export const itemProps: MCOPO<DropdownItemProps> = {
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  divided: { type: Boolean, default: false },
  command: { type: [String, Number], default: undefined },
};
