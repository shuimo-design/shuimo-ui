/**
 * @Description 年份表格
 * @Author youus
 * @Date 2022/1/23 5:23 PM
 * @Version v1.0.0
 *
 * Hello, humor
 */

import { defineComponent, computed, toRefs } from 'vue';
import { arrayFindIndex, coerceTruthyValueToArray } from '../../../dependents/_utils/dateUtil';

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
    const { date } = toRefs(props)
    
    const startYear = computed(() => Math.floor(date.value.getFullYear() / 10) * 10)
    
    const getCellStyle = (year: any) => {
      const style = Object.create({})
      const today = new Date()
  
      style.current = arrayFindIndex(coerceTruthyValueToArray([date.value]), (date: any) => date.getFullYear() === year) >= 0;
      style.today = today.getFullYear() === year;
  
      return style;
    }
    
    const yearTableClickHandler = (event: any) => {
      const target = event.target;
      if (target.tagName === 'A') {
        const year = target.textContent || target.innerText;
        emit('pick', Number(year));
      }
    }
    
    return () => (
      <table onClick={yearTableClickHandler} class="year-table">
        <tbody>
          <tr>
            <td class={["w-available", "w-cursor", getCellStyle(startYear.value)]}>
              <a class="w-cell w-cursor">{startYear.value}</a>
            </td>
            <td class={["w-available", "w-cursor", getCellStyle(startYear.value + 1)]}>
              <a class="w-cell w-cursor">{startYear.value + 1}</a>
            </td>
            <td class={["w-available", "w-cursor", getCellStyle(startYear.value + 2)]}>
              <a class="w-cell w-cursor">{startYear.value + 2}</a>
            </td>
            <td class={["w-available", "w-cursor", getCellStyle(startYear.value + 3)]}>
              <a class="w-cell w-cursor">{startYear.value + 3}</a>
            </td>
          </tr>
          <tr>
            <td class={["w-available", "w-cursor", getCellStyle(startYear.value + 4)]}>
              <a class="w-cell w-cursor">{startYear.value + 4}</a>
            </td>
            <td class={["w-available", "w-cursor", getCellStyle(startYear.value + 5)]}>
              <a class="w-cell w-cursor">{startYear.value + 5}</a>
            </td>
            <td class={["w-available", "w-cursor", getCellStyle(startYear.value + 6)]}>
              <a class="w-cell w-cursor">{startYear.value + 6}</a>
            </td>
            <td class={["w-available", "w-cursor", getCellStyle(startYear.value + 7)]}>
              <a class="w-cell w-cursor">{startYear.value + 7}</a>
            </td>
          </tr>
          <tr>
            <td class={["w-available", "w-cursor", getCellStyle(startYear.value + 8)]}>
              <a class="w-cell w-cursor">{startYear.value + 8}</a>
            </td>
            <td class={["w-available", "w-cursor", getCellStyle(startYear.value + 9)]}>
              <a class="w-cell w-cursor">{startYear.value + 9}</a>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
})