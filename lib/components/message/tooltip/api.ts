/**
 * @description tooltip api
 * @author youus
 * @date 2022/4/4 01:22
 * @version v1.0.0
 *
 * Hello, humor
 */
import { TooltipProps } from './index';
import { MCOPO, MPropType } from '../../types/props';
import { Placement } from '../../../compositions/popper/usePopper.ts';

export const props: MCOPO<TooltipProps> = {
  placement: {
    type: String as MPropType<Placement>,
    default: 'bottom',
    // validator: (value: string) =>
    //   [
    //     'auto',
    //     'auto-start',
    //     'auto-end',
    //     'top',
    //     'top-start',
    //     'top-end',
    //     'bottom',
    //     'bottom-start',
    //     'bottom-end',
    //     'right',
    //     'right-start',
    //     'right-end',
    //     'left',
    //     'left-start',
    //     'left-end'
    //   ].includes(value)
  },
  mountRender: { type: Boolean, default: false },
  disableClickAway: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  content: { type: String, default: '' },
  popper: {
    type: Object, default: () => ({}),
  },
  teleport: { type: [Object, Boolean], default: undefined },
};
