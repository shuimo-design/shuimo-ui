/**
 * @description switch props
 * @author 阿怪
 * @date 2022/8/16 23:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SwitchProps } from './index';
import { WCOPO } from '../../dependents/_types';

export const props: WCOPO<SwitchProps> = {
  modelValue: { type: undefined, required: true },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  activeInfo: { type: String, default: '' },
  inactiveInfo: { type: String, default: '' },
  activeValue: { type: undefined, default: undefined },
  inactiveValue: { type: undefined, default: undefined },
  onControl: { type: Boolean, default: false }
};
