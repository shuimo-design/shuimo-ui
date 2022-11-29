/**
 * @description input-number api
 * @author 阿怪
 * @date 2022/4/17 00:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { InputNumberProps } from './index';

export const props: WCOPO<InputNumberProps> = {
  modelValue: { type: [Number, String], default: '', required: true },
  placeholder: { type: String, default: '' },
  max: { type: Number, default: Infinity },
  min: { type: Number, default: -Infinity },
  disabled: { type: Boolean, default: false },
  precision: { type: Number, default: 0 }
};
