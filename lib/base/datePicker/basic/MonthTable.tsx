/**
 * @Description 月份表格
 * @Author youus
 * @Date 2022/1/23 5:03 PM
 * @Version v1.0.0
 *
 * Hello, humor
 */

import {defineComponent, computed, toRefs, reactive} from 'vue';
import {arrayFind, arrayFindIndex, coerceTruthyValueToArray} from '../../../dependents/_utils/dateUtil';

const clearDate = (date: any) => {
  return new Date(date.getFullYear(), date.getMonth());
};

const getMonthTimestamp = (time: any) => {
  if (typeof time === 'number' || typeof time === 'string') {
    return clearDate(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return clearDate(time).getTime();
  } else {
    return NaN;
  }
};

type MonthCellType = {
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
  name: 'MonthTable',
  emits: ['pick'],
  props: {
    minDate: {},
    maxDate: {},
    date: {
      type: Date,
      default: () => new Date()
    },
    value: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const { minDate, maxDate, date, value } = toRefs(props)
  
    const tableRows = reactive<Array<Array<MonthCellType>>>([[], [], [], [], [], []])
    
    const rows = computed(() => {
      const rows = tableRows;
      const selectedDate: any = [];
      const now = getMonthTimestamp(new Date(new Date().getFullYear(), new Date().getMonth()));
  
      for (let i = 0; i < 3; i++) {
        const row = rows[i];
        for (let j = 0; j < 4; j++) {
          let cell = row[j];
          if (!cell) {
            cell = {row: i, column: j, type: 'normal', inRange: false, start: false, end: false};
          }
      
          cell.type = 'normal';
      
          const index = i * 4 + j;
          const time = new Date(date.value.getFullYear(), index).getTime();
          cell.inRange = time >= getMonthTimestamp(minDate.value) && time <= getMonthTimestamp(maxDate.value);
          // @ts-ignore
          cell.start = minDate.value && time === getMonthTimestamp(minDate.value);
          // @ts-ignore
          cell.end = maxDate.value && time === getMonthTimestamp(maxDate.value);
          const isToday = time === now;
      
          if (isToday) {
            cell.type = 'today';
          }
          cell.text = index;
          let cellDate = new Date(time);
          cell.selected = arrayFind(selectedDate, (date: any) => date.getTime() === cellDate.getTime());
      
          row[j] = cell;
        }
      }
      return rows;
    })
    
    const getCellStyle = (cell: MonthCellType) => {
      const style = Object.create({});
      const year = date.value.getFullYear();
      const today = new Date();
      const month = cell.text;
      const dateVal = new Date(value.value);
      style.current = arrayFindIndex(coerceTruthyValueToArray([dateVal]), (date: any) => date.getFullYear() === year && date.getMonth() === month) >= 0;
      style.today = today.getFullYear() === year && today.getMonth() === month;
  
      if (cell.inRange) {
        style['in-range'] = true;
    
        if (cell.start) {
          style['start-date'] = true;
        }
    
        if (cell.end) {
          style['end-date'] = true;
        }
      }
      return style;
    }
    
    const monthTableClickHandler = (event: any) => {
      let target = event.target;
      if (target.tagName === 'A') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }
      if (target.tagName !== 'TD') return;
      const column = target.cellIndex;
      const row = target.parentNode.rowIndex;
      const month = row * 4 + column;
      emit('pick', month);
    }
    
    return () => (
      <table class="month-table" onClick={monthTableClickHandler}>
        <tbody>
        {
          rows.value.map((row: any, key) => (
            <tr key={key}>
              {
                row.map((cell: any, k: number) => (
                  <td key={k}>
                    <div class="w-cursor">
                      <a class={["w-cell", "w-cursor", getCellStyle(cell)]}>
                        {`${cell.text + 1}月`}
                      </a>
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