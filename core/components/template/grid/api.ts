/**
 * @description grid 运行时 props
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { GridProps } from './props';

export const props: MCOPO<GridProps> = {
  h: { type: Number, default: undefined },
  w: { type: Number, default: undefined },
  gap: { type: [Number, String], default: 0 },
  colGap: { type: [Number, String], default: undefined },
  rowGap: { type: [Number, String], default: undefined },
  direction: { type: String as MPropType<'column' | 'row'>, default: 'row' },
};
