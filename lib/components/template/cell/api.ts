/**
 * @description cell props
 * @author 阿怪
 * @date 2023/06/21 01:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { CellProps } from './index';

export const props: MCOPO<CellProps> = {
  h: { type: Number, default: 0 },
  w: { type: Number, default: 0 },
  // points: { type: [Object, Number, String] as MPropType<OptionPoints>, default: undefined },
  points: { type: [Number, String] as MPropType<OptionPoints>, default: undefined },
  a: { type: [Object, Number, String] as MPropType<OptionPoint>, default: undefined },
  b: { type: [Object, Number, String] as MPropType<OptionPoint>, default: undefined },
  c: { type: [Object, Number, String] as MPropType<OptionPoint>, default: undefined },
  d: { type: [Object, Number, String] as MPropType<OptionPoint>, default: undefined },
  style: { type: Object as MPropType<Record<string, string | number>>, default: undefined }
};
