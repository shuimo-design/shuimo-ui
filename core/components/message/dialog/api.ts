/**
 * @description dialog runtime props 定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { DialogProps } from './props';

export const props: MCOPO<DialogProps> = {
  visible: { type: Boolean, default: false },
  mask: { type: Object, default: () => ({ show: true, clickClose: true }) },
  closeBtn: { type: Boolean, default: true },
  teleport: { type: Object, default: () => ({ to: 'body' }) },
};
