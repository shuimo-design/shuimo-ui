/**
 * @description 时间控制util
 * @author: 南歌子
 * @date 2021/01/05 16:36
 * @version V1.0.0
 *
 * Hello, humor
 */

import Printer from '../../other/printer/Printer';

/**
 * 获取本月第一天
 * @param date
 */
export const getFirstDayOfMonth = (date: Date) => {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

/**
 * 获取本月天数
 * @param year
 * @param month
 */
export const getDayCountOfMonth = (year: number, month: number) => {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

/**
 * 往前补全42天
 * @param date
 * @param amount
 */
export const prevDate = (date: Date, amount = 1) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
};

/**
 * 获取本月开始的日期位置
 * @param year
 * @param month
 */
export const getStartDateOfMonth = (year: number, month: number) => {
  const result = new Date(year, month, 1);
  const day = result.getDay();

  if (day === 0) {
    return prevDate(result, 7);
  } else {
    return prevDate(result, day);
  }
};

/**
 * 初始化日期
 * @param date
 * @param type
 */
export const clearTime = (date: Date, type: string) => {
  return new Date(date.getFullYear(), date.getMonth(), type === 'date' ? date.getDate() : undefined);
};

/**
 * 完后几天
 * @param date
 * @param amount
 */
export const nextDate = (date: Date, amount = 1) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};

export const arrayFindIndex = (arr: string | any[], pred: any) => {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};

export const arrayFind = (arr: any[], pred: any) => {
  const idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};

/**
 * 格式化数组
 * @param val
 */
export const coerceTruthyValueToArray = (val: any[]) => {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};

/**
 * 判断是否为日期
 * @param date
 */
export const isDate = (date: any) => {
  if (date === null || date === undefined) return false;
  if (isNaN(new Date(date).getTime())) return false;
  return !Array.isArray(date);
};

/**
 * 选择日期后 形成新的日期
 * @param date
 * @param y
 * @param m
 * @param d
 */
export const modifyDate = (date: Date, y: number, m: number, d: number) => {
  return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};

/**
 * 日期格式化
 * @param y
 * @param m
 * @param d
 */
export const setDate = (y: number, m: number | string, d: number | string) => {
  if (m < 10) {
    m = `0${m}`;
  }
  if (d < 10) {
    d = `0${d}`;
  }
  return `${y}-${m}-${d}`;
};

/**
 * (2010-1-31, 2010, 2) => 2010-2-28
 * @param date
 * @param year
 * @param month
 */
export const changeYearMonthAndClampDate = (date: Date, year: number, month: number) => {
  const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
  return modifyDate(date, year, month, monthDate);
};

/**
 * 前一个月
 * @param date
 */
export const prevMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month === 0
    ? changeYearMonthAndClampDate(date, year - 1, 11)
    : changeYearMonthAndClampDate(date, year, month - 1);
};

/**
 * 后一个月
 * @param date
 */
export const nextMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month === 11
    ? changeYearMonthAndClampDate(date, year + 1, 0)
    : changeYearMonthAndClampDate(date, year, month + 1);
};

/**
 * 前一年
 * @param date
 * @param amount
 */
export const prevYear = (date: Date, amount = 1) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year - amount, month);
};

/**
 * 后一年
 * @param date
 * @param amount
 */
export const nextYear = (date: Date, amount = 1) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year + amount, month);
};

/**
 * 根据类型格式化日期
 * @param val
 * @param type
 */
export const valueFormatByType = (val: string | Date, type: string) => {
  if (!val) {
    return '';
  }
  const date = new Date(val);
  const year = date.getFullYear();
  const m = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return type === 'date' ? `${year}-${m}-${d}` : `${year}-${m}`;
};

/**
 * 获取时间戳
 * @param time
 * @param type
 */
export const getTimestamp = (time: any, type = 'date') => {
  if (typeof time === 'number' || typeof time === 'string') {
    return clearTime(new Date(time), type).getTime();
  } else if (time instanceof Date) {
    return clearTime(time, type).getTime();
  }
  Printer('水墨UI表格组件').error('须传入正确的日期格式');
  return NaN;
};
