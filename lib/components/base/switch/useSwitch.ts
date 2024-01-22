/**
 * @description switch hook
 * @author 阿怪
 * @date 2023/4/23 21:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SwitchProps } from './index';



export const switchIsBoolean = (value: SwitchProps['modelValue']) => {
  return typeof value === 'boolean';
}

export const getIsActive = (value: SwitchProps['modelValue'], activeValue: SwitchProps['activeValue']) => {
  return value === activeValue;
}


