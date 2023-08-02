/**
 * @description
 * @author 阿怪
 * @date 2023/4/23 11:57
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { LoadingProps } from './index';

export const defaultSpeed = 3000;
export const props: MCOPO<LoadingProps> = {
  speed: { type: Number, default: defaultSpeed },
  mask: { type: Boolean, default: false },
  sideLength: { type: [Number, String], default: 50 }
};
