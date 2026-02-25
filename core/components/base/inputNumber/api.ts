/**
 * @description inputNumber 运行时 props
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { InputNumberProps } from './props';

export const props: MCOPO<InputNumberProps> = {
  modelValue: { type: [Number, String], default: '', required: true },
  placeholder: { type: String, default: '' },
  max: { type: Number, default: Infinity },
  min: { type: Number, default: -Infinity },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  precision: { type: Number, default: 0 },
};
