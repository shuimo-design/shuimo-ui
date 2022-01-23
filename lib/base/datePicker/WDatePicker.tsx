/**
 * @Description:
 * @Author: youus
 * @Date: 2022/1/22 9:23 PM
 * @Version v1.0.0
 *
 * Hello, humor
 */

import { defineComponent, watch, computed, ref, Teleport, onMounted } from 'vue';
import {
  modifyDate,
  setDate,
  valueFormatByType,
  prevMonth,
  nextMonth,
  prevYear,
  nextYear,
  changeYearMonthAndClampDate
} from '../../dependents/_utils/dateUtil';
import DateTable from './basic/DateTable';
import MonthTable from './basic/MonthTable';
import YearTable from './basic/YearTable';
const DEFAULT_SELECT_BORDER = 3;
const DEFAULT_MARGIN = 5;
const getStyle = (selectStyle: any, type: string) => {
  const num = Number(selectStyle[type].replace('px', ''));
  return isNaN(num) ? 0 : num;
};

type selectStyleType = {
  offsetTop: number,
  offsetLeft: number,
  width: number,
  height: number
}

export default defineComponent({
  name: 'WDatePicker',
  props: {
    modelValue: {
      type: null,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    type: {
      type: String,
      default: 'date'
    }
  },
  emits:['change', 'update:modelValue'],
  setup(props, {emit}) {
    const defaultValue = ref('')
    const calendarDropdown = ref(false)
    const selectStyle = ref<selectStyleType>({
      offsetTop: 0,
      offsetLeft: 0,
      height: 0,
      width: 0
    })
    const select = ref(null)
    const date = ref(new Date())
    const currentView = ref('date')
    
    const dropdownStyle = computed(() => ({
      left: `${selectStyle.value.offsetLeft - DEFAULT_SELECT_BORDER}px`,
      top: `${selectStyle.value.offsetTop + selectStyle.value.height + DEFAULT_MARGIN}px`
    }))
    
    const year = computed(() => {
      if (currentView.value === 'year') {
        const startYear = Math.floor(date.value.getFullYear() / 10) * 10
        return `${startYear} - ${startYear + 9}`
      }
      return date.value.getFullYear()
    })
    
    const month = computed(() => {
      const m = date.value.getMonth() + 1
      return m < 10 ? `0${m}` : m
    })
    
    watch(() => props.modelValue, () => setDefaultValue())
    
    const setDefaultValue = () => {
      defaultValue.value = props.modelValue ? valueFormatByType(props.modelValue, props.type) : ''
      date.value = props.modelValue ? new Date(props.modelValue) : new Date()
      if (props.type === 'month') {
        currentView.value = 'month'
      }
    }
    
    const showCalendar = () => {
      setStyle()
      setEvents()
      calendarDropdown.value = !calendarDropdown.value
    }
    
    const setStyle = () => {
      const style = select.value && window.getComputedStyle(select.value)
      selectStyle.value = {
        // @ts-ignore
        offsetLeft: select.value && select.value.getBoundingClientRect().left + window.scrollX || 0,
        // @ts-ignore
        offsetTop: select.value && select.value.getBoundingClientRect().top + window.scrollY || 0,
        height: getStyle(style, 'height'),
        width: getStyle(style, 'width')
      }
    }
    
    const setEvents = () => {
      window.addEventListener('mousedown', mousedownEvent)
      window.addEventListener('resize', resizeWindow)
    }
    
    const mousedownEvent = (e: any) => {
      if (e.path && e.path.length > 0) {
        const isSelectDropdown = e.path.some((q: any) => q.classList && Array(...q.classList).includes('calendar-dropdown'))
        if (!isSelectDropdown) {
          leaveDropdown()
        }
      } else {
        leaveDropdown()
      }
    }
    
    const leaveDropdown = () => {
      calendarDropdown.value = false
      window.removeEventListener('mousedown', mousedownEvent)
      window.removeEventListener('resize', resizeWindow)
    }
    
    const resizeWindow = () => {
      setStyle()
    }
    
    const datePickHandler = (d: Date) => {
      console.log(d)
      let newDate = modifyDate(d, d.getFullYear(), d.getMonth(), d.getDate())
      defaultValue.value = setDate(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate())
      emit('update:modelValue', defaultValue.value)
      emit('change', defaultValue.value)
      calendarDropdown.value = false
      date.value = newDate
    }
    
    const prevMonthHandler = () => date.value = prevMonth(date.value)
    
    const nextMonthHandler = () => date.value = nextMonth(date.value)
    
    const prevYearHandler = () => {
      if (currentView.value === 'year') {
        date.value = prevYear(date.value, 10)
      } else {
        date.value = prevYear(date.value)
      }
    }
    
    const nextYearHandler = () => {
      if (currentView.value === 'year') {
        date.value = nextYear(date.value, 10)
      } else {
        date.value = nextYear(date.value)
      }
    }
    
    const showMonthPicker = () => currentView.value = 'month'
    
    const showYearPicker = () => currentView.value = 'year'
    
    const monthPickerHandler = (month: number) => {
      if (typeof year.value === 'number') {
        date.value = changeYearMonthAndClampDate(date.value, year.value, month)
      }
      if (props.type === 'month') {
        defaultValue.value = valueFormatByType(date.value, 'month')
        emit('update:modelValue', defaultValue)
        emit('change', defaultValue)
        calendarDropdown.value = false
        return
      }
      currentView.value = 'date'
    }
    
    const yearPickerHandler = (y: number) => {
      if (typeof month.value === 'number') {
        date.value = changeYearMonthAndClampDate(date.value, y, month.value)
      }
      currentView.value = 'month'
    }
  
    onMounted(() => {
      setDefaultValue()
    })
    
    return () => (
      <div class="w-date-picker">
        <div class="w-date-picker-div w-cursor" ref={select} onClick={showCalendar}>
          <span>{defaultValue.value ? defaultValue.value : props.placeholder}</span>
          <div class="calendar-icon w-cursor"/>
        </div>
        <Teleport to="body">
          <div v-show={calendarDropdown.value}
            // @ts-ignore
               style={dropdownStyle.value}
               class="calendar-dropdown">
            <div class="calendar-dropdown-header">
              <button class="calendar-year-prev w-cursor" onClick={prevYearHandler}/>
              <button class="calendar-month-prev w-cursor"
                      v-show={currentView.value === 'date'}
                      onClick={prevMonthHandler}/>
              <span class="year w-cursor"
                    onClick={showYearPicker}>{year.value}</span>
              <span class="between w-cursor" v-show={currentView.value === 'date'}>，</span>
              <span class="month w-cursor"
                    onClick={showMonthPicker}
                    v-show={currentView.value === 'date'}>{month.value}</span>
              <button class="calendar-month-next w-cursor"
                      v-show={currentView.value === 'date'}
                      onClick={nextMonthHandler}/>
              <button class="calendar-year-next w-cursor" onClick={nextYearHandler}/>
            </div>
            <div class="content">
              <DateTable date={date.value}
                         v-show={currentView.value === 'date'}
                         onPick={datePickHandler}
                         value={defaultValue.value}/>
              <YearTable v-show={currentView.value === 'year'}
                         onPick={yearPickerHandler}/>
              <MonthTable v-show={currentView.value === 'month'}
                          value={defaultValue.value}
                          date={date.value}
                          onPick={monthPickerHandler}/>
            </div>
          </div>
        </Teleport>
      </div>
    )
  }
})