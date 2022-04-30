/**
 * @description DatePicker 日期下拉框内容
 * @author 阿怪
 * @date 2022/4/30 06:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 主要是为了适配vue-test
 *
 * 下拉框可以优化成popover
 */
import { defineComponent } from "vue";
import DateTable from "./DateTable";
import YearTable from "./YearTable";
import MonthTable from "./MonthTable";


export default defineComponent({
  name: 'CalendarDropdown',
  props: { datePickHook: Object },
  setup(props, { slots }) {
    const {
      date, year, month,
      isCalendarDropdown,
      dropdownStyle,
      currentView,
      defaultValue,
      prevYearHandler, prevMonthHandler,
      nextYearHandler, nextMonthHandler,
      showYearPicker, showMonthPicker,
      datePickHandler, monthPickerHandler, yearPickerHandler
    } = props.datePickHook!;

    return () => (
      <div v-show={isCalendarDropdown.value}
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
    )
  }
})
