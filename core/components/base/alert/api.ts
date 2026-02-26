/**
 * @description alert api
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { AlertProps } from './props';

export const props: MCOPO<AlertProps> = {
  type: { type: String as MPropType<'success' | 'warning' | 'error' | 'info'>, default: 'info' },
  title: { type: String, default: undefined },
  description: { type: String, default: undefined },
  closable: { type: Boolean, default: false },
  showIcon: { type: Boolean, default: false },
};
