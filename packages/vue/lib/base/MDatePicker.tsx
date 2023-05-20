/**
 * @description vue version datePicker
 * @author 阿怪
 * @date 2023/05/18 23:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref } from 'vue';
import { props } from '@shuimo-design/core/lib/base/datePicker/api';
import usePopover from '../../composition/usePopover';
import {
  BASE_MONTH_NAME,
  BASE_WEEK_NAME, CALENDAR_TYPE,
  CalendarItem,
  DateRefType, DisplayCalendarType, toDayjs,
  useDatePicker
} from '@shuimo-design/core/lib/base/datePicker/useDatePicker';
import useBorder from '../../composition/useBorder';
import MDivider from '../other/MDivider';


const MCalendarColumn = defineComponent(<T extends DisplayCalendarType>(props: { columns: T[] }, { emit }) => {
  const clickItem = (item: T) => {
    emit('click', item);
  };

  return () => {
    return <div class="m-date-picker-calendar-columns">
      {props.columns.map((item, index) => {
        return <div class={[
          'm-date-picker-calendar-column',
          item.isCurrentMonth ? '' : 'm-date-picker-not-current',
          item.isCurrent ? 'm-date-picker-current' : ''
        ]} key={index} onClick={() => clickItem(item)}>
          {item.day}
        </div>;
      })
      }
    </div>;
  };
}, {
  props: { columns: { type: Array, default: () => [] } },
  emits: ['click']
});

const MPrevMonthArrow = defineComponent(() => () => <div class="m-date-picker-m-arrow m-date-picker-prev-arrow"/>);
const MNextMonthArrow = defineComponent(() => () => <div class="m-date-picker-m-arrow m-date-picker-next-arrow"/>);
const MPrevYearArrow = defineComponent(() => () => <div class="m-date-picker-y-arrow m-date-picker-prev-year-arrow"/>);
const MNextYearArrow = defineComponent(() => () => <div class="m-date-picker-y-arrow m-date-picker-next-year-arrow"/>);

export default defineComponent({
  name: 'MDatePicker',
  props: {
    ...props,
    modelValue: props.value
  },
  emits: ['update:modelValue'],
  setup: (props, { slots, emit }) => {
    console.log('setup');
    const displayValue = ref('');
    const spanClass = ref<Array<string | undefined>>([]);
    const dateRef = ref<DateRefType>();
    const currentRef = ref(toDayjs(props.modelValue));
    const calendarTypeRef = ref<CALENDAR_TYPE>('date');
    const yearsRef = ref<Array<number>>([]);

    const {
      updateDateRef,
      popoverOptions, getCalendar,
      toPrevMonth, toNextMonth, toNextYear, toPrevYear,
      getValue,
      clickCurrentYear, clickYearItem, clickCurrentMonth, clickMonthItem
    } = useDatePicker({
      props: {
        ...props,
        value: props.modelValue
      },
      value: {
        displayValue,
        spanClass,
        dateRef,
        currentRef,
        calendarTypeRef,
        yearsRef
      }
    });
    const { popoverRef, withPopover } = usePopover(popoverOptions, 'm-date-picker');
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
        <span onClick={() => clickYear(dateRef.value?.year)}>{dateRef.value?.year}</span> ,
        <span onClick={() => clickMonth(dateRef.value?.month)}>{dateRef.value?.month}</span>
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
        </div>, 'm-date-picker-calendar')
      });
    };
  }
});
