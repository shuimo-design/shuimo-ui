/**
 * @description headless DatePicker 日期选择器组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   .m-date-picker
 *     .m-date-picker-trigger  （显示当前值或 placeholder）
 *     .m-date-picker-panel    （日历下拉面板，点击 trigger 展开/收起）
 *       .m-date-picker-head   （导航：上一年 / 上一月 / 年月文字 / 下一月 / 下一年）
 *       .m-date-picker-divider
 *       .m-date-picker-week-row  （日期模式：星期头）
 *       日期模式：6×7 日期格
 *       月份模式：12 个月份格
 *       年份模式：12 个年份格
 *
 * 点击外部自动收起下拉面板。不依赖 MPopover，使用原生 click outside 实现。
 */
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import {
  DatePickerCore,
  useDatePicker,
  toDayjs,
  BASE_WEEK_NAME,
  BASE_MONTH_NAME,
} from '@shuimo-design/ui-core/components/base/datePicker';
import { DatePickerProps, CalendarItem } from '@shuimo-design/ui-core/components/base/datePicker/props';
import './datePicker.css';

const { props: datePickerProps } = DatePickerCore;

export default defineComponent((_props: DatePickerProps, { emit }) => {
  const props = _props as Required<DatePickerProps>;

  const {
    updateDateRef,
    getCalendar,
    toPrevMonth,
    toNextMonth,
    toPrevYear,
    toNextYear,
    getValue,
    clickCurrentYear,
    clickYearItem,
    clickCurrentMonth,
    clickMonthItem,
    dateRef,
    displayValue,
    calendarTypeRef,
    currentRef,
    yearsRef,
    spanClass,
  } = useDatePicker(props);

  // 面板展开状态
  const visible = ref(false);
  // 整个组件根元素引用，用于 click outside 判断
  const wrapperRef = ref<HTMLElement | null>(null);

  const toggle = () => {
    visible.value = !visible.value;
  };

  const close = () => {
    visible.value = false;
  };

  /** 点击外部时关闭面板 */
  const handleClickOutside = (e: MouseEvent) => {
    if (!visible.value) return;
    if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
      close();
    }
  };

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  // 监听 modelValue 变化，同步内部状态
  watch(
    () => props.modelValue,
    value => {
      currentRef.value = toDayjs(value);
      updateDateRef(value);
    },
  );

  /** 点击日期格 */
  const clickDay = (item: CalendarItem) => {
    const value = getValue(item);
    updateDateRef(value);
    currentRef.value = toDayjs(value);
    close();
    emit('update:modelValue', value);
  };

  /** 点击月份格（type="month" 时直接 emit 值） */
  const handleClickMonthCell = (month: number) => {
    clickMonthItem(month);
    if (props.type === 'month') {
      const calendarItem: CalendarItem = {
        year: dateRef.value.year,
        month,
        day: 1,
        isCurrentMonth: false,
      };
      const value = getValue(calendarItem);
      updateDateRef(value);
      currentRef.value = toDayjs(value);
      close();
      emit('update:modelValue', value);
    }
  };

  return () => {
    /** 渲染日历头部导航 */
    const renderHead = () => (
      <div class="m-date-picker-head">
        {/* 上一年箭头 */}
        <span class="m-date-picker-arrow" onClick={toPrevYear}>{'«'}</span>
        {/* 上一月箭头（年份/月份模式下隐藏） */}
        {calendarTypeRef.value === 'date' && (
          <span class="m-date-picker-arrow" onClick={toPrevMonth}>{'‹'}</span>
        )}

        {/* 中间：年份 + 月份文字，可点击切换模式 */}
        <div class="m-date-picker-head-center">
          <span
            class="m-date-picker-head-year"
            onClick={() => clickCurrentYear(dateRef.value.year)}
          >
            {dateRef.value.year}年
          </span>
          {/* 非年份模式下显示月份 */}
          {calendarTypeRef.value !== 'year' && (
            <span
              class="m-date-picker-head-month"
              onClick={() => clickCurrentMonth(dateRef.value.month)}
            >
              {dateRef.value.month}月
            </span>
          )}
        </div>

        {/* 下一月箭头 */}
        {calendarTypeRef.value === 'date' && (
          <span class="m-date-picker-arrow" onClick={toNextMonth}>{'›'}</span>
        )}
        {/* 下一年箭头 */}
        <span class="m-date-picker-arrow" onClick={toNextYear}>{'»'}</span>
      </div>
    );

    /** 渲染星期头行 */
    const renderWeekRow = () => (
      <div class="m-date-picker-week-row">
        {BASE_WEEK_NAME.map((w, i) => (
          <div class="m-date-picker-week-cell" key={i}>{w.day}</div>
        ))}
      </div>
    );

    /** 渲染 6×7 日期网格 */
    const renderDateGrid = () => {
      const calendar = getCalendar(dateRef);
      return calendar.map((row, rowIdx) => (
        <div class="m-date-picker-calendar-row" key={rowIdx}>
          {row.map((item, colIdx) => (
            <div
              class={[
                'm-date-picker-cell',
                !item.isCurrentMonth && 'm-date-picker-cell-not-current',
                item.isCurrent && 'm-date-picker-cell-current',
              ]}
              key={colIdx}
              onClick={() => clickDay(item)}
            >
              {item.day}
            </div>
          ))}
        </div>
      ));
    };

    /** 渲染 12 个月份格子 */
    const renderMonthGrid = () => (
      <div class="m-date-picker-months">
        {BASE_MONTH_NAME.map((name, i) => {
          const month = i + 1;
          const isCurrent = month === dateRef.value.month;
          return (
            <div
              class={['m-date-picker-month-cell', isCurrent && 'm-date-picker-month-cell-current']}
              key={i}
              onClick={() => handleClickMonthCell(month)}
            >
              {name}
            </div>
          );
        })}
      </div>
    );

    /** 渲染年份格子 */
    const renderYearGrid = () => (
      <div class="m-date-picker-years">
        {yearsRef.value.map((year, i) => {
          const isCurrent = year === dateRef.value.year;
          return (
            <div
              class={['m-date-picker-year-cell', isCurrent && 'm-date-picker-year-cell-current']}
              key={i}
              onClick={() => clickYearItem(year)}
            >
              {year}
            </div>
          );
        })}
      </div>
    );

    /** 根据 calendarTypeRef 决定渲染哪种内容 */
    const renderBody = () => {
      switch (calendarTypeRef.value) {
        case 'date': return renderDateGrid();
        case 'month': return renderMonthGrid();
        case 'year': return renderYearGrid();
      }
    };

    return (
      <div class="m-date-picker" ref={(el) => { wrapperRef.value = el as HTMLElement; }}>
        {/* Trigger 区域 */}
        <span
          class={spanClass.value}
          onClick={toggle}
        >
          {displayValue.value}
        </span>

        {/* 日历面板 */}
        {visible.value && (
          <div class="m-date-picker-panel">
            {renderHead()}
            <div class="m-date-picker-divider" />
            {/* 日期模式下显示星期头 */}
            {calendarTypeRef.value === 'date' && renderWeekRow()}
            {renderBody()}
          </div>
        )}
      </div>
    );
  };
}, {
  name: 'MDatePicker',
  props: datePickerProps,
  emits: ['update:modelValue'],
});
