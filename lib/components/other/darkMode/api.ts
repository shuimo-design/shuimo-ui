/**
 * @description dark mode api
 * @author 阿怪
 * @date 2023/4/23 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { DarkModeProps } from './index';

export const props: MCOPO<DarkModeProps> = {
  modelValue: { type: Boolean, default: undefined },
  autoMode: { type: Boolean, default: true },
  initHandler: { type: Function as MPropType<() => boolean>, default: undefined },
  isRotate: { type: Boolean, default: true },
};
