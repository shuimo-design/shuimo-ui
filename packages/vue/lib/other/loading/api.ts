/**
 * @description
 * @author 阿怪
 * @date 2022/8/25 11:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { LoadingProps } from './index';

export const props: WCOPO<LoadingProps> = {
  speed: { type: Number, default: 400 },
  mask: { type: Boolean, default: false },
  sideLength: { type: [Number, String], default: 50 }
};
