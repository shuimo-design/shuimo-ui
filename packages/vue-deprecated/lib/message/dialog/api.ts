/**
 * @description
 * @author 阿怪
 * @date 2022/4/16 23:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { DialogProps } from './index';

export const props: WCOPO<DialogProps> = {
  mask: { type: Object, default: { show: true, clickClose: true } },
  visible: { type: Boolean, default: false },
  closeBtn: { type: Boolean, default: true }
};
