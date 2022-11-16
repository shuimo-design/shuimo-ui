/**
 * @description 年份表格
 * @author youus
 * @date 2022/1/23 5:23 PM
 * @version v1.0.0
 *
 * Hello, humor
 */

import { defineComponent, computed, toRefs } from 'vue';
import { arrayFindIndex, coerceTruthyValueToArray } from '../../../dependents/_utils/dateUtil';

const YEAR_DISPLAY = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]];

export default defineComponent({
  name: 'YearTable',
  emits: ['pick'],
  props: {
    date: {
      type: Object,
      default: () => new Date()
    }
  },
  setup(props, { emit }) {
    const { date } = toRefs(props);

    const startYear = computed(() => Math.floor(date.value.getFullYear() / 10) * 10);

    const getCellStyle = (year: any) => {
      const style = Object.create({});
      const today = new Date();

      style['m-year-current'] =
        arrayFindIndex(coerceTruthyValueToArray([date.value]), (date: any) => date.getFullYear() === year) >= 0;
      style['m-year-today'] = today.getFullYear() === year;

      return style;
    };

    const yearTableClickHandler = (event: any) => {
      const target = event.target;
      if (target.tagName === 'SPAN') {
        const year = target.textContent || target.innerText;
        emit('pick', Number(year));
      }
    };

    return () => (
      <table onClick={yearTableClickHandler} class="m-year-table">
        <tbody>
        {YEAR_DISPLAY.map(years =>(
          <tr>
            {years.map(y => (
              <td class={["m-available", "m-cursor-pointer", getCellStyle(startYear.value + y)]}>
                <span class="m-cell m-cursor-pointer">{startYear.value + y}</span>
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
});
