/**
 * @description dark mode api
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.1.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { DarkModeProps } from './props';

export const props: MCOPO<DarkModeProps> = {
  modelValue: { type: Boolean, default: false },
  autoMode: { type: Boolean, default: false },
  initHandler: { type: Function as MPropType<() => boolean>, default: undefined },
  storageKey: { type: String, default: undefined },
};
