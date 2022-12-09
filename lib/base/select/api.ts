/**
 * @description select api
 * @author 阿怪
 * @date 2022/4/16 21:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO, WPropType } from '../../dependents/_types';
import { SelectProps } from './index';

export const props: WCOPO<SelectProps> = {
  modelValue: { type: undefined, default: '' },
  options: { type: Array, default: () => [] },
  inputParam: { type: String, default: undefined },
  optionParam: { type: String, default: undefined },
  valueParam: { type: String, default: undefined },
  readonly: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '请选择...' },
  toMatch: { type: Function as WPropType<(option: any, value: any) => boolean>, default: undefined },
  multiple: { type: Boolean, default: false },
  checkbox: { type: Boolean, default: true },
  filter: { type: Function as WPropType<(option: any, inputValue: string) => boolean>, default: undefined }
};
