/**
 * @description confirm runtime props 定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { ConfirmProps } from './props';

export const props: MCOPO<ConfirmProps> = {
  visible: { type: Boolean, default: false },
  mask: { type: Object, default: () => ({ show: true, clickClose: false }) },
  teleport: { type: Object, default: () => ({ to: 'body' }) },
  content: { type: String, default: '' },
  confirmText: { type: String, default: '确定' },
  cancelText: { type: String, default: '取消' },
};
