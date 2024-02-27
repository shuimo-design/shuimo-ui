/**
 * @description datePicker api
 * @author 阿怪
 * @date 2022/4/16 20:51
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { DatePickerProps } from './index';

export const props: MCOPO<DatePickerProps> = {
  modelValue: { type: [String, Date], default: '' },
  placeholder: { type: String, default: '请选择日期...' },
  format: { type: String, default: undefined },
  type: { type: String as MPropType<'date' | 'month'>, default: 'date' },
};
