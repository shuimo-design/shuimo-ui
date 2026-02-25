/**
 * @description drawer api
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { DrawerProps } from './props';
import type { ModelMask } from '../../../types/common/model.d.ts';
import type { MTeleportProps } from '../../../types/common/common.d.ts';

export const props: MCOPO<DrawerProps> = {
  visible: { type: Boolean, default: false },
  mask: {
    type: Object as MPropType<ModelMask>,
    default: () => ({ show: true, clickClose: true }),
  },
  drawerClass: { type: Array, default: () => [] },
  direction: {
    type: String as MPropType<'top' | 'right' | 'bottom' | 'left'>,
    default: 'right',
  },
  teleport: {
    type: Object as MPropType<MTeleportProps>,
    default: () => ({ to: 'body' }),
  },
};
