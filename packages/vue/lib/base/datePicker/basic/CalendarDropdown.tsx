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
import { defineComponent } from 'vue';
import DateTable from './DateTable';
import YearTable from './YearTable';
import MonthTable from './MonthTable';

export default defineComponent({
  name: 'CalendarDropdown',
  props: { datePickHook: Object },
  setup(props) {
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
      <div v-show={isCalendarDropdown.value} style={dropdownStyle.value} class="m-calendar-dropdown">
        <div class="m-calendar-dropdown-header">
          <button class="m-calendar-year-prev m-cursor-pointer" onClick={prevYearHandler}/>
          <button class="m-calendar-month-prev m-cursor-pointer"
                  v-show={currentView.value === 'date'}
                  onClick={prevMonthHandler}/>
          <span class="m-year m-cursor-pointer"
                onClick={showYearPicker}>{year.value}</span>
          <span class="m-block-between m-cursor-pointer" v-show={currentView.value === 'date'}>，</span>
          <span class="m-month m-cursor-pointer"
                onClick={showMonthPicker}
                v-show={currentView.value === 'date'}>{month.value}</span>
          <button class="m-calendar-month-next m-cursor-pointer"
                  v-show={currentView.value === 'date'}
                  onClick={nextMonthHandler}/>
          <button class="m-calendar-year-next m-cursor-pointer" onClick={nextYearHandler}/>
        </div>
        <div class="m-calendar-content">
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
    );
  }
});
