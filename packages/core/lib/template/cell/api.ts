/**
 * @description cell props
 * @author 阿怪
 * @date 2023/06/21 01:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '@shuimo-design/types';
import { CellProps, CellRotatePosition } from './index';

export const props: MCOPO<CellProps> = {
  rotatePosition: { type: String as MPropType<CellRotatePosition>, default: undefined },
  deg: { type: Number, default: undefined },
  h: { type: Number, default: 0 },
  w: { type: Number, default: 0 },
};
