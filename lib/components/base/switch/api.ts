/**
 * @description switch api
 * @author 阿怪
 * @date 2023/4/23 11:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { SwitchProps } from './index';


export const props: MCOPO<SwitchProps> = {
  modelValue: { type: undefined, required: true },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  activeInfo: { type: String, default: '' },
  inactiveInfo: { type: String, default: '' },
  activeValue: { type: undefined, default: undefined },
  inactiveValue: { type: undefined, default: undefined },
  onControl: { type: Boolean, default: false },
};
