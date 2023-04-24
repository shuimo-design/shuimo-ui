/**
 * @description checkbox api
 * @author 阿怪
 * @date 2023/4/20 21:55
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { CheckboxProps } from './index';

export const props: MCOPO<CheckboxProps> = {
  label: { type: String, default: '' },
  checked: { type: Boolean, default: undefined },
  value: { type: null, default: undefined },
  modelValue: { type: null, default: undefined },
  indeterminate: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
};
