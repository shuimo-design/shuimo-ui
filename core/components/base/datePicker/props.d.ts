/**
 * @description datePicker props 类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type DatePickerProps = {
  /**
   * @description 日期值
   * @type string | Date
   * @default ''
   */
  modelValue?: string | Date;
  /**
   * @description 提示文字
   * @type string
   * @default '请选择日期...'
   */
  placeholder?: string;
  /**
   * @description 日期格式
   * @type string
   * @default undefined
   */
  format?: string;
  /**
   * @description 选择类型：date 按日选择，month 按月选择
   * @type 'date' | 'month'
   * @default 'date'
   */
  type?: 'date' | 'month';
};

/** 日历面板的显示模式 */
export type CalendarType = 'date' | 'month' | 'year';

/** 日历内部日期引用 */
export type DateRefType = {
  year: number;
  month: number;
  day: number;
};

/** 日历单元格数据 */
export type CalendarItem = {
  day: number | string;
  isCurrentMonth: boolean;
  isCurrent?: boolean;
  month: number;
  year: number;
};
