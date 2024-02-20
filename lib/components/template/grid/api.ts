/**
 * @description grid props
 * @author 阿怪
 * @date 2023/06/22 00:38
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { GridProps } from './index';

export const props: MCOPO<GridProps> = {
  h: { type: Number, default: undefined },
  w: { type: Number, default: undefined },
  gap: { type: [Number, String], default: undefined },
  colGap: { type: [Number, String], default: undefined },
  rowGap: { type: [Number, String], default: undefined },
  gapRotate: { type: Array, default: () => [] },
  direction: { type: String as MPropType<'column' | 'row'>, default: 'row' },
};
