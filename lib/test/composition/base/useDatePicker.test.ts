/**
 * @description useDatePicker test
 * @author 阿怪
 * @date 2023/5/20 00:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, beforeEach } from 'vitest';
import { DateRefType, DisplayCalendarType, toDayjs, useDatePicker } from '../../../components/base/datePicker/useDatePicker.ts';
import { DatePickerProps } from '../../../components/base/datePicker';


describe.skip('useDatePicker core test', function () {
  //
  // const baseProps:Required<DatePickerProps> = {
  //   modelValue: '',
  //   format: 'YYYY-MM-DD',
  //   placeholder: '请选择日期...',
  //   type: 'date'
  // };
  //
  // const getBaseInfo = () => {
  //   const displayValue = { value: '' };
  //   const spanClass = { value: [] };
  //   const dateRef = { value: { year: 2023, month: 5, day: 20 } };
  //   const currentRef = { value: toDayjs('2023-05-20') };
  //   return { displayValue, spanClass, dateRef, currentRef };
  // };
  //
  // describe('date calculation', function () {
  //
  //
  //   describe('value to displayValue', function () {
  //
  //     it('empty value will be placeholder', () => {
  //       const { displayValue, spanClass, dateRef, currentRef } = getBaseInfo();
  //       useDatePicker({
  //         props: baseProps,
  //       });
  //       expect(displayValue.value).toBe(baseProps.placeholder);
  //       expect(spanClass.value).toMatchObject(['m-date-picker-span', 'm-date-picker-placeholder']);
  //     });
  //
  //     it('value is date', () => {
  //       const { displayValue, spanClass, dateRef, currentRef } = getBaseInfo();
  //       const res = useDatePicker({
  //         props: {
  //           ...baseProps,
  //           modelValue: new Date()
  //         },
  //       });
  //       expect(displayValue.value).not.toBe(baseProps.placeholder);
  //       expect(spanClass.value).toMatchObject(['m-date-picker-span', undefined]);
  //     });
  //
  //   });
  //
  //   describe('func', () => {
  //     let datePicker: ReturnType<typeof useDatePicker>;
  //     const props = {
  //       value: '2022-01-01',
  //       format: 'YYYY-MM-DD',
  //       placeholder: '请选择日期',
  //       type: 'date'
  //     };
  //     const value = {
  //       displayValue: { value: '' },
  //       spanClass: { value: [] },
  //       dateRef: { value: { year: 2022, month: 1, day: 1 } },
  //       currentRef: { value: toDayjs('2022-01-01') }
  //     };
  //     const options = { props, value };
  //
  //     beforeEach(() => {
  //       datePicker = useDatePicker(options);
  //     });
  //
  //     it('should update dateRef correctly when toPrevMonth is called', () => {
  //       datePicker.toPrevMonth();
  //       expect(value.dateRef.value).toMatchObject({ year: 2021, month: 12, day: 1 });
  //     });
  //
  //     it('should update dateRef correctly when toNextMonth is called', () => {
  //       datePicker.toNextMonth();
  //       expect(value.dateRef.value).toMatchObject({ year: 2022, month: 2, day: 1 });
  //     });
  //
  //     it('should update dateRef correctly when toPrevYear is called', () => {
  //       datePicker.toPrevYear();
  //       expect(value.dateRef.value).toMatchObject({ year: 2021, month: 1, day: 1 });
  //     });
  //
  //     it('should update dateRef correctly when toNextYear is called', () => {
  //       datePicker.toNextYear();
  //       expect(value.dateRef.value).toMatchObject({ year: 2023, month: 1, day: 1 });
  //     });
  //   });
  //
  //
  //
  //
  // });
  //
  //
  // describe('getCalendar', () => {
  //   const dateRef: DateRefType = { year: 2022, month: 1, day: 1 };
  //   const MDateRefValue = { value: dateRef };
  //   const currentRef = { value: () => ({ year: () => 2022, month: () => 1, date: () => 1 }) };
  //   const options = { MDateRefValue, currentRef };
  //   let calendar: Array<Array<DisplayCalendarType>>;
  //
  //   beforeEach(() => {
  //     const {getCalendar} = useDatePicker({
  //       props: baseProps,
  //       value:getBaseInfo()
  //     });
  //     calendar = getCalendar(MDateRefValue);
  //   });
  //
  //   it('should return a 6x7 array', () => {
  //     expect(calendar).toHaveLength(6);
  //     expect(calendar[0]).toHaveLength(7);
  //   });
  //
  //   it('should fill in the previous month correctly', () => {
  //     expect(calendar[0][0]).toMatchObject({ day: 26, isCurrentMonth: false, month: 12, year: 2021 });
  //     expect(calendar[0][1]).toMatchObject({ day: 27, isCurrentMonth: false, month: 12, year: 2021 });
  //     expect(calendar[0][2]).toMatchObject({ day: 28, isCurrentMonth: false, month: 12, year: 2021 });
  //     expect(calendar[0][3]).toMatchObject({ day: 29, isCurrentMonth: false, month: 12, year: 2021 });
  //     expect(calendar[0][4]).toMatchObject({ day: 30, isCurrentMonth: false, month: 12, year: 2021 });
  //     expect(calendar[0][5]).toMatchObject({ day: 31, isCurrentMonth: false, month: 12, year: 2021 });
  //     expect(calendar[0][6]).toMatchObject({ day: 1, isCurrentMonth: true, month: 1, year: 2022 });
  //   });
  //
  //   it('should fill in the current month correctly', () => {
  //     expect(calendar[1][0]).toMatchObject({ day: 2, isCurrentMonth: true, isCurrent: false, month: 1, year: 2022 });
  //     expect(calendar[1][1]).toMatchObject({ day: 3, isCurrentMonth: true, isCurrent: false, month: 1, year: 2022 });
  //     expect(calendar[1][2]).toMatchObject({ day: 4, isCurrentMonth: true, isCurrent: false, month: 1, year: 2022 });
  //     expect(calendar[1][3]).toMatchObject({ day: 5, isCurrentMonth: true, isCurrent: false, month: 1, year: 2022 });
  //     expect(calendar[1][4]).toMatchObject({ day: 6, isCurrentMonth: true, isCurrent: false, month: 1, year: 2022 });
  //     expect(calendar[1][5]).toMatchObject({ day: 7, isCurrentMonth: true, isCurrent: false, month: 1, year: 2022 });
  //     expect(calendar[1][6]).toMatchObject({ day: 8, isCurrentMonth: true, isCurrent: false, month: 1, year: 2022 });
  //   });
  //
  //   it('should fill in the next month correctly', () => {
  //     expect(calendar[5][0]).toMatchObject({ day: 30, isCurrentMonth: true, month: 1, year: 2022 });
  //     expect(calendar[5][1]).toMatchObject({ day: 31, isCurrentMonth: true, month: 1, year: 2022 });
  //     expect(calendar[5][2]).toMatchObject({ day: 1, isCurrentMonth: false, month: 2, year: 2022 });
  //     expect(calendar[5][3]).toMatchObject({ day: 2, isCurrentMonth: false, month: 2, year: 2022 });
  //     expect(calendar[5][4]).toMatchObject({ day: 3, isCurrentMonth: false, month: 2, year: 2022 });
  //     expect(calendar[5][5]).toMatchObject({ day: 4, isCurrentMonth: false, month: 2, year: 2022 });
  //     expect(calendar[5][6]).toMatchObject({ day: 5, isCurrentMonth: false, month: 2, year: 2022 });
  //   });
  // });
});
