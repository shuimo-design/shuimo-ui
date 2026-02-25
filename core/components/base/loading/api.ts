/**
 * @description loading api
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { LoadingProps } from './props';

export const props: MCOPO<LoadingProps> = {
  modelValue: { type: Boolean, default: false },
  speed: { type: Number, default: 1500 },
  size: { type: Number, default: 1 },
  mask: { type: Boolean, default: false },
  sideLength: { type: [Number, String] as MPropType<number | string>, default: 64 },
};
