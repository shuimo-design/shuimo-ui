/**
 * @Description:
 * @Author: youus
 * @Date: 2022/1/22 9:23 PM
 * @Version v1.0.0
 *
 * Hello, humor
 */

import { defineComponent, watch, Teleport, onMounted, Transition } from 'vue';
import {
  valueFormatByType,
} from '../../dependents/_utils/dateUtil';
import DateTable from './basic/DateTable';
import MonthTable from './basic/MonthTable';
import YearTable from './basic/YearTable';
import {useDatePicker} from './uesDatePicker';

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
    const {
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
    } = useDatePicker(props, emit)
    watch(() => props.modelValue, () => setDefaultValue());
    
    const setDefaultValue = () => {
      defaultValue.value = valueFormatByType(props.modelValue, props.type);
      date.value = (props.modelValue && new Date(props.modelValue)) || new Date();
      if (props.type === 'month') {
        currentView.value = 'month';
      }
    };
    
    onMounted(() => {
      setDefaultValue();
    });
    
    return () => (
      <div class="w-date-picker">
        <div class="w-date-picker-div w-cursor-pointer" ref={selectRef} onClick={showCalendar}>
          <span>{defaultValue.value || props.placeholder}</span>
          <div class="calendar-icon w-cursor-pointer"/>
        </div>
        <Teleport to="body">
          <Transition name="w-opacity">
            <div v-show={calendarDropdown.value}
                 style={dropdownStyle.value}
                 class="calendar-dropdown">
              <div class="calendar-dropdown-header">
                <button class="calendar-year-prev w-cursor-pointer" onClick={prevYearHandler}/>
                <button class="calendar-month-prev w-cursor-pointer"
                        v-show={currentView.value === 'date'}
                        onClick={prevMonthHandler}/>
                <span class="w-year w-cursor-pointer"
                      onClick={showYearPicker}>{year.value}</span>
                <span class="w-block-between w-cursor-pointer" v-show={currentView.value === 'date'}>，</span>
                <span class="w-month w-cursor-pointer"
                      onClick={showMonthPicker}
                      v-show={currentView.value === 'date'}>{month.value}</span>
                <button class="calendar-month-next w-cursor-pointer"
                        v-show={currentView.value === 'date'}
                        onClick={nextMonthHandler}/>
                <button class="calendar-year-next w-cursor-pointer" onClick={nextYearHandler}/>
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
          </Transition>
        </Teleport>
      </div>
    )
  }
})