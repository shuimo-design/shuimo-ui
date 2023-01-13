/**
 * @description drawer api
 * @author 阿怪
 * @date 2022/4/16 23:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { DrawerProps } from './index';

export const props: WCOPO<DrawerProps> = {
  width: { type: String, default: '524px' },
  mask: { type: Object, default: { show: true, clickClose: true } },
  visible: { type: Boolean, default: false },
  drawerClass: { type: Array, default: [] },
  closeBtn: { type: Boolean, default: true }
};
