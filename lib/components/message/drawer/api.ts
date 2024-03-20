/**
 * @description drawer api
 * @author 阿怪
 * @date 2022/4/16 23:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { DrawerProps } from './index';

export const props: MCOPO<DrawerProps> = {
  mask: { type: Object, default: { show: true, clickClose: true } },
  visible: { type: Boolean, default: false },
  drawerClass: { type: Array, default: [] },
  direction: { type: String as MPropType<'top' | 'right' | 'bottom' | 'left'>, default: 'right' },
  teleport: { type: Object, default: { to: 'body' } },
};
