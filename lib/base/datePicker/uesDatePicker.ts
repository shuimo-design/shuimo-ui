/**
 * @Description
 * @Author youus
 * @Date 2022/1/25 10:43 PM
 * @Version v1.0.0
 *
 * Hello, humor
 */

import { computed, reactive, ref } from 'vue';
import { getStyle } from '../../dependents/_utils/tools';
import {
  changeYearMonthAndClampDate,
  modifyDate,
  nextMonth,
  nextYear,
  prevMonth,
  prevYear,
  setDate,
  valueFormatByType
} from '../../dependents/_utils/dateUtil';

const useEvents = (setStyle: Function) => {
  const calendarDropdown = ref<boolean>(false)
  
  const mousedownEvent = (e: any) => {
    if (e.path && e.path.length > 0) {
      const isSelectDropdown = e.path.some((q: any) => q.classList && Array(...q.classList).includes('calendar-dropdown'));
      if (!isSelectDropdown) {
        leaveDropdown();
      }
    } else {
      leaveDropdown();
    }
  };
  
  const resizeWindow = () => {
    setStyle();
  };
  
  const setEvents = () => {
    window.addEventListener('mousedown', mousedownEvent);
    window.addEventListener('resize', resizeWindow);
  }
  
  const leaveDropdown = () => {
    calendarDropdown.value = false;
    window.removeEventListener('mousedown', mousedownEvent);
    window.removeEventListener('resize', resizeWindow);
  };
  
  return {
    calendarDropdown,
    mousedownEvent,
    setEvents,
    leaveDropdown
  }
}


export type selectStyleType = {
  offsetTop: number,
  offsetLeft: number,
  height: number,
  width: number,
}

const DEFAULT_SELECT_BORDER = 3;
const DEFAULT_MARGIN = 5;

const useDom = () => {
  const selectRef = ref<HTMLElement | null>(null);
  
  const selectStyle = reactive<selectStyleType>({
    offsetTop: 0,
    offsetLeft: 0,
    height: 0,
    width: 0
  });
  
  const dropdownStyle = computed<object>(() => ({
    left: `${selectStyle.offsetLeft - DEFAULT_SELECT_BORDER}px`,
    top: `${selectStyle.offsetTop + selectStyle.height + DEFAULT_MARGIN}px`
  }));
  
  const setStyle = () => {
    if (selectRef && selectRef.value) {
      const cssStyleDeclaration = window.getComputedStyle(selectRef.value);
      selectStyle.offsetLeft = selectRef.value.getBoundingClientRect().left + window.scrollX;
      selectStyle.offsetTop = selectRef.value.getBoundingClientRect().top + window.scrollY;
      selectStyle.height = getStyle(cssStyleDeclaration, 'height');
      selectStyle.width = getStyle(cssStyleDeclaration, 'width');
    }
  }
  
  return {
    selectRef,
    dropdownStyle,
    setStyle
  }
}

const useDate = () => {
  const date = ref<Date>(new Date());
  const currentView = ref<string>('date')
  
  const year = computed(() => {
    if (currentView.value === 'year') {
      const startYear = Math.floor(date.value.getFullYear() / 10) * 10;
      return `${startYear} - ${startYear + 9}`;
    }
    return date.value.getFullYear();
  });
  
  const month = computed(() => {
    const m = date.value.getMonth() + 1;
    return m < 10 ? `0${m}` : m;
  });
  
  const showMonthPicker = () => currentView.value = 'month';
  
  const showYearPicker = () => currentView.value = 'year';
  
  return {
    date,
    currentView,
    year,
    month,
    showMonthPicker,
    showYearPicker
  };
}

export const useDatePicker = (props: any, emit: any) => {
  const { setStyle, selectRef, dropdownStyle } = useDom()
  const { setEvents, calendarDropdown }  = useEvents(setStyle)
  const { date, year, month, currentView, showMonthPicker, showYearPicker } = useDate();
  
  const defaultValue = ref<string>('')
  
  const datePickHandler = (d: Date) => {
    let newDate = modifyDate(d, d.getFullYear(), d.getMonth(), d.getDate());
    defaultValue.value = setDate(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate());
    emitHandler(defaultValue.value)
    calendarDropdown.value = false;
    date.value = newDate;
  };
  
  // [prev, next]month
  const prevMonthHandler = () => date.value = prevMonth(date.value);
  
  const nextMonthHandler = () => date.value = nextMonth(date.value);
  
  // [prev, next]year
  const prevYearHandler = () => {
    if (currentView.value === 'year') {
      date.value = prevYear(date.value, 10);
    } else {
      date.value = prevYear(date.value);
    }
  };
  
  const nextYearHandler = () => {
    if (currentView.value === 'year') {
      date.value = nextYear(date.value, 10);
    } else {
      date.value = nextYear(date.value);
    }
  };
  
  const monthPickerHandler = (month: number) => {
    if (typeof year.value === 'number') {
      date.value = changeYearMonthAndClampDate(date.value, year.value, month);
    }
    if (props.type === 'month') {
      defaultValue.value = valueFormatByType(date.value, 'month');
      calendarDropdown.value = false;
      emitHandler(defaultValue.value)
      return;
    }
    currentView.value = 'date';
  };
  
  const yearPickerHandler = (y: number) => {
    if (typeof month.value === 'number') {
      date.value = changeYearMonthAndClampDate(date.value, y, month.value);
    }
    currentView.value = 'month';
  };
  
  const showCalendar = () => {
    setStyle();
    setEvents();
    calendarDropdown.value = !calendarDropdown.value;
  }
  
  const emitHandler = (value: string) => {
    emit('update:modelValue', value);
    emit('change', value);
  }
  
  return {
    defaultValue,
    date, year, month,
    currentView,
    selectRef,
    calendarDropdown,
    dropdownStyle,
    showCalendar,
    prevYearHandler, prevMonthHandler,
    nextYearHandler, nextMonthHandler,
    showYearPicker, showMonthPicker,
    datePickHandler, monthPickerHandler, yearPickerHandler
  }
}