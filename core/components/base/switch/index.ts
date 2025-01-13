/**
 * @description
 * @author 阿怪
 * @date 2025/1/13 10:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props } from './api.ts';
import useSwitch, { getIsActive, switchIsBoolean } from './useSwitch.tsx';

export const SwitchCore = {
  props,
  switchIsBoolean,
  getIsActive,
  useSwitch,
}
