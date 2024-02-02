/**
 * @description vue version datePicker
 * @author 阿怪
 * @date 2023/05/18 23:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo fix month type
 */
import { defineComponent, watch } from 'vue';
import {
  BASE_MONTH_NAME,
  BASE_WEEK_NAME,
  CalendarItem,
  DisplayCalendarType, toDayjs,
  useDatePicker,
} from './useDatePicker';
import MDivider from '../../other/divider/MDivider';
import { props } from './api.ts';

import usePopover from '../../../compositions/usePopover.tsx';
import useBorder from '../../../compositions/useBorder.tsx';
import { DatePickerProps } from './index';

const MCalendarColumn = defineComponent((props: { columns: DisplayCalendarType[] }, { emit }) => {
  const clickItem = (item: DisplayCalendarType) => {
    emit('click', item);
  };

  return () => {
    return <div class="m-date-picker-calendar-columns">
      {props.columns.map((item, index) => {
        return <div class={[
          'm-date-picker-calendar-column',
          item.isCurrentMonth ? '' : 'm-date-picker-not-current',
          item.isCurrent ? 'm-date-picker-current' : '',
        ]} key={index} onClick={() => clickItem(item)}>
          {item.day}
        </div>;
      })
      }
    </div>;
  };
}, {
  props: { columns: { type: Array, default: () => [] } },
  emits: ['click'],
});

const MPrevMonthArrow = defineComponent(() => () => <div class="m-date-picker-m-arrow m-date-picker-prev-arrow"/>);
const MNextMonthArrow = defineComponent(() => () => <div class="m-date-picker-m-arrow m-date-picker-next-arrow"/>);
const MPrevYearArrow = defineComponent(() => () => <div class="m-date-picker-y-arrow m-date-picker-prev-year-arrow"/>);
const MNextYearArrow = defineComponent(() => () => <div class="m-date-picker-y-arrow m-date-picker-next-year-arrow"/>);

export default defineComponent((_props: DatePickerProps, { emit }) => {
  const props = _props as Required<DatePickerProps>;

  const {
    updateDateRef,
    popoverOptions, getCalendar,
    toPrevMonth, toNextMonth, toNextYear, toPrevYear,
    getValue,
    clickCurrentYear, clickYearItem, clickCurrentMonth, clickMonthItem,
    dateRef, spanClass, displayValue, calendarTypeRef, currentRef, yearsRef,
  } = useDatePicker({ props });
  const { withPopover } = usePopover(popoverOptions, 'm-date-picker');
  const { withBorder } = useBorder();

  const clickDay = (item: CalendarItem) => {
    const value = getValue(item);
    updateDateRef(value);
    currentRef.value = toDayjs(value);
    emit('update:modelValue', value);
  };

  const clickMonth = (month: number) => {
    clickCurrentMonth(month);
  };

  const clickYear = (year: number) => {
    clickCurrentYear(year);
  };

  const clickYearDiv = (year: number) => {
    clickYearItem(year);
  };

  const clickMonthDiv = (month: number) => {
    clickMonthItem(month);
  };

  watch(() => props.modelValue, (value) => {
    currentRef.value = toDayjs(value);
    updateDateRef(value);
  });

  return () => {
    const getDateCalendar = () => {
      return getCalendar(dateRef)?.map((column, index) => {
        return <MCalendarColumn columns={column} key={index} onClick={clickDay}/>;
      });
    };

    const getMonthCalendar = () => {
      const isCurrent = (month: number) => {
        return month === dateRef.value?.month;
      };

      return (
        <div>
          {BASE_MONTH_NAME.map((month, index) => (
            <div class={['m-date-picker-calendar-column-month', { 'm-date-picker-current': isCurrent(index + 1) }]}
                 key={index}
                 onClick={() => clickMonthDiv(index + 1)}>
              {month}
            </div>
          ))}
        </div>
      );
    };

    const getYearCalendar = () => {

      const isCurrent = (year: number) => {
        return year === dateRef.value?.year;
      };

      return <div>
        {yearsRef.value.map((year, index) => {
          return <div class={['m-date-picker-calendar-column-year', { 'm-date-picker-current': isCurrent(year) }]}
                      key={index}
                      onClick={() => clickYearDiv(year)}>{year}</div>;
        })
        }
      </div>;
    };

    const getCalendarRender = () => {
      switch (calendarTypeRef.value) {
        case 'date':
          return getDateCalendar();
        case 'month':
          return getMonthCalendar();
        case 'year':
          return getYearCalendar();
      }
    };


    const calenderHead = () => <div class="m-date-picker-calendar-head">
      <MPrevYearArrow onClick={toPrevYear}/>
      <MPrevMonthArrow onClick={toPrevMonth}/>
      <span onClick={() => clickYear(dateRef.value!.year)}>{dateRef.value?.year}</span> ,
      <span onClick={() => clickMonth(dateRef.value!.month)}>{dateRef.value?.month}</span>
      <MNextMonthArrow onClick={toNextMonth}/>
      <MNextYearArrow onClick={toNextYear}/>
    </div>;

    return withPopover({
      default: () => withBorder(<div>
        <span class={spanClass.value}>{displayValue.value}</span>
      </div>, 'm-date-picker-active'),
      content: () => withBorder(<div>
        {calenderHead()}
        {calendarTypeRef.value === 'date' ? <MCalendarColumn columns={BASE_WEEK_NAME}/> : undefined}
        <MDivider/>
        <div class="m-date-picker-calendar-body">
          {getCalendarRender()}
        </div>
      </div>, 'm-date-picker-calendar'),
    });
  };
}, {
  name: 'MDatePicker',
  props,
  emits: ['update:modelValue'],
});
