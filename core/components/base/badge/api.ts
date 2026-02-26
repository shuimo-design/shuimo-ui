/**
 * @description badge api
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { BadgeProps } from './props';

export const props: MCOPO<BadgeProps> = {
  value: { type: [String, Number], default: undefined },
  max: { type: Number, default: 99 },
  isDot: { type: Boolean, default: false },
  hidden: { type: Boolean, default: false },
  type: { type: String as MPropType<'primary' | 'success' | 'warning' | 'error' | 'info'>, default: 'error' },
};
