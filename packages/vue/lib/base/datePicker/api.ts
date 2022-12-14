/**
 * @description datePicker api
 * @author 阿怪
 * @date 2022/4/16 20:51
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { DatePickerProps } from './index';

export const props: WCOPO<DatePickerProps> = {
  modelValue: { type: [String, Date], default: '' },
  placeholder: { type: String, default: '请选择日期' },
  type: { type: String, default: 'date' }
};
