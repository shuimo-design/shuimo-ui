/**
 * @description space api
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { SpaceProps } from './props';

export const props: MCOPO<SpaceProps> = {
  direction: { type: String as MPropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  size: { type: [String, Number] as MPropType<'small' | 'medium' | 'large' | number>, default: 'medium' },
  wrap: { type: Boolean, default: false },
  align: { type: String as MPropType<'start' | 'center' | 'end' | 'baseline'>, default: 'center' },
};
