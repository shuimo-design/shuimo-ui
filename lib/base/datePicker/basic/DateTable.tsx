/**
 * @Description 日期表格
 * @Author youus
 * @Date 2022/1/23 5:00 PM
 * @Version v1.0.0
 *
 * Hello, humor
 */

import { computed, defineComponent, reactive, toRefs } from 'vue';
import {
  arrayFind,
  clearTime as _clearTime,
  getDayCountOfMonth,
  getFirstDayOfMonth,
  getStartDateOfMonth,
  nextDate
} from '../../../dependents/_utils/dateUtil';

const getDateTimestamp = (time: any) => {
  if (typeof time === 'number' || typeof time === 'string') {
    return _clearTime(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return _clearTime(time).getTime();
  }
  return NaN;
};

type DateCellType = {
  row: number,
  column: number,
  type: string,
  inRange: boolean,
  start: boolean,
  end: boolean,
  text?: number,
  selected?: boolean,
  disabled?: boolean
}

export default defineComponent({
  name: 'DateTable',
  props: {
    firstDayOfWeek: {
      default: 1,
      type: Number
    },
    minDate: {},
    maxDate: {},
    date: {
      type: Date,
      default: () => new Date()
    },
    value: {},
    defaultValue: {
      type: String,
      default: ''
    }
  },
  emits: ['pick'],
  setup(props, {emit}) {
    const { firstDayOfWeek, minDate, maxDate, date, value } = toRefs(props)
    const tableRows = reactive<Array<Array<DateCellType>>>([[], [], [], [], [], []])
    
    const offsetDay = computed(() => firstDayOfWeek.value > 3 ? 7 - firstDayOfWeek.value : -firstDayOfWeek.value)
    
    const month = computed(() => date.value.getMonth())
    const year = computed(() => date.value.getFullYear())
    
    const startDate = computed(() => getStartDateOfMonth(year.value, month.value))
    
    const rows = computed(() => {
      const currentDate = new Date(year.value, month.value, 1);
      let day = getFirstDayOfMonth(currentDate); // day of first day
      const dateCountOfMonth = getDayCountOfMonth(currentDate.getFullYear(), currentDate.getMonth());
      const dateCountOfLastMonth = getDayCountOfMonth(currentDate.getFullYear(), (currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1));
  
      day = (day === 0 ? 7 : day);
  
      const offset = offsetDay.value;
      const rows = tableRows;
      let count = 1;
      
      const selectedDate: any = [];
      const now = getDateTimestamp(new Date());
  
      for (let i = 0; i < 6; i++) {
        const row = rows[i];
    
        for (let j = 0; j < 7; j++) {
          let cell = row[j];
          if (!cell) {
            cell  = {row: i, column: j, type: 'normal', inRange: false, start: false, end: false};
          }
      
          cell.type = 'normal';
      
          const index = i * 7 + j;
          const time = nextDate(startDate.value, index - offset).getTime();
          cell.inRange = time >= getDateTimestamp(minDate.value) && time <= getDateTimestamp(maxDate.value);
          // @ts-ignore
          cell.start = minDate.value && time === getDateTimestamp(minDate.value);
          // @ts-ignore
          cell.end = maxDate.value && time === getDateTimestamp(maxDate.value);
          const isToday = time === now;
      
          if (isToday) {
            cell.type = 'today';
          }
      
          if (i >= 0 && i <= 1) {
            const numberOfDaysFromPreviousMonth = day + offset < 0 ? 7 + day + offset : day + offset;
        
            if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
              cell.text = count++;
            } else {
              cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - j % 7) + 1 + i * 7;
              cell.type = 'prev-month';
            }
          } else {
            if (count <= dateCountOfMonth) {
              cell.text = count++;
            } else {
              cell.text = count++ - dateCountOfMonth;
              cell.type = 'next-month';
            }
          }
      
          let cellDate = new Date(time);
          cell.selected = arrayFind(selectedDate, (d: any) => d.getTime() === cellDate.getTime());
          row[j] = cell;
        }
      }
      return rows;
    })
    
    const cellMatchesDate = (cell: DateCellType, date: any) => {
      const currentDate = new Date(date)
      return year.value === currentDate.getFullYear()
        && month.value === currentDate.getMonth()
        && Number(cell.text) === currentDate.getDate()
    }
    
    const getCellClasses = (cell: DateCellType) => {
      const selectionMode = 'day';
  
      let classes = [];
      if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
        classes.push('w-available');
        if (cell.type === 'today') {
          classes.push('today');
        }
      } else {
        classes.push(cell.type);
      }
  
      if (selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today') && cellMatchesDate(cell, value.value)) {
        classes.push('current');
      }
  
      if (cell.inRange && ((cell.type === 'normal' || cell.type === 'today'))) {
        classes.push('in-range');
    
        if (cell.start) {
          classes.push('start-date');
        }
    
        if (cell.end) {
          classes.push('end-date');
        }
      }
  
      if (cell.disabled) {
        classes.push('disabled');
      }
  
      if (cell.selected) {
        classes.push('selected');
      }
  
      return classes.join(' ');
    }
    
    const getDateOfCell = (row: number, column: number) => {
      const offsetFromStart = row * 7 + column - offsetDay.value
      return nextDate(startDate.value, offsetFromStart)
    }
    
    const clickHandler = (event: any) => {
      let target = event.target;
      if (target.tagName === 'SPAN') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }
  
      if (target.tagName !== 'TD') return;
      const row = target.parentNode.rowIndex - 1;
      const column = target.cellIndex;
      const cell = rows.value[row][column];
      if (cell.disabled || cell.type === 'week') return;
  
      const newDate = getDateOfCell(row, column);
      emit('pick', newDate);
    }
    
    return () => (
      <table onClick={clickHandler}
             class="date-table"
             cellspacing="0"
             cellpadding="0">
        <tbody>
          <tr>
            <th>壹</th>
            <th>贰</th>
            <th>叁</th>
            <th>肆</th>
            <th>伍</th>
            <th>陆</th>
            <th>日</th>
          </tr>
          {
            rows.value.map((row: any, key) => (
              <tr key={key}>
                {
                  row.map((cell: any, k: number) => (
                    <td key={k} class="w-cursor">
                      <div class={getCellClasses(cell)}>
                        <span>{ cell.text }</span>
                      </div>
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
})