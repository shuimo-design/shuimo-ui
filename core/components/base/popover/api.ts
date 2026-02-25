/**
 * @description popover 运行时 props
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { PopoverProps } from './props';
import { MCOPO, MPropType } from '../../types/props';
import { Placement } from '../../../compositions/popper/usePopper.ts';

export const props: MCOPO<PopoverProps> = {
  placement: {
    type: String as MPropType<Placement>,
    default: 'bottom',
  },
  mountRender: { type: Boolean, default: false },
  disableClickAway: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  show: { type: Boolean, default: null },
  content: { type: String, default: '' },
  popper: {
    type: Object, default: () => ({}),
  },
  teleport: { type: [Object, Boolean], default: undefined },
};
