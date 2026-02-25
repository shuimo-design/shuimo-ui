/**
 * @description datePicker core 导出
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props } from './api';

export const DatePickerCore = {
  props,
};

export type { DatePickerProps, CalendarType, DateRefType, CalendarItem } from './props';
export { useDatePicker, toDayjs, BASE_WEEK_NAME, BASE_MONTH_NAME } from './useDatePicker';
