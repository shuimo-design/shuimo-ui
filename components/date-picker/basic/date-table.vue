<template>
  <table
      cellspacing="0"
      cellpadding="0"
      class="date-table">
    <tbody>
    <tr>
      <th>日</th>
      <th>壹</th>
      <th>贰</th>
      <th>叁</th>
      <th>肆</th>
      <th>伍</th>
      <th>陆</th>
    </tr>
    <tr v-for="(row, key) in rows"
        :class="{ current: isWeekActive(row[1]) }"
        :key="key">
      <td v-for="(cell, key) in row"
          :key="key">
        <div :class="getCellClasses(cell)">
          <span>
            {{ cell.text }}
          </span>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {
    getFirstDayOfMonth,
    getDayCountOfMonth,
    getStartDateOfMonth,
    clearTime as _clearTime,
    nextDate,
    arrayFind,
    isDate,
    prevDate
  } from "../../_utils/date-util";

  const getDateTimestamp = function(time) {
    if (typeof time === 'number' || typeof time === 'string') {
      return _clearTime(new Date(time)).getTime();
    } else if (time instanceof Date) {
      return _clearTime(time).getTime();
    } else {
      return NaN;
    }
  };

  export default {
    name: "date-table",
    props: {
      firstDayOfWeek: {
        default: 7,
        type: Number
      },
      disabledDate: {},
      cellClassName: {},
      minDate: {},
      maxDate: {},
      date: {}
    },
    data() {
      return {
        tableRows: [ [], [], [], [], [], [] ]
      }
    },
    computed: {
      offsetDay() {
        const week = this.firstDayOfWeek;
        // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
        return week > 3 ? 7 - week : -week;
      },
      startDate() {
        return getStartDateOfMonth(this.year, this.month);
      },
      year() {
        return this.date.getFullYear();
      },

      month() {
        return this.date.getMonth();
      },
      rows() {
        const date = new Date(this.year, this.month, 1);
        let day = getFirstDayOfMonth(date); // day of first day
        const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth());
        const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1));

        day = (day === 0 ? 7 : day);

        const offset = this.offsetDay;
        const rows = this.tableRows;
        let count = 1;

        const startDate = this.startDate;
        const disabledDate = this.disabledDate;
        const cellClassName = this.cellClassName;
        const selectedDate = [];
        const now = getDateTimestamp(new Date());

        for (let i = 0; i < 6; i++) {
          const row = rows[i];

          for (let j = 0; j < 7; j++) {
            let cell = row[j];
            if (!cell) {
              cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
            }

            cell.type = 'normal';

            const index = i * 7 + j;
            const time = nextDate(startDate, index - offset).getTime();
            cell.inRange = time >= getDateTimestamp(this.minDate) && time <= getDateTimestamp(this.maxDate);
            cell.start = this.minDate && time === getDateTimestamp(this.minDate);
            cell.end = this.maxDate && time === getDateTimestamp(this.maxDate);
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
            cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
            cell.selected = arrayFind(selectedDate, date => date.getTime() === cellDate.getTime());
            cell.customClass = typeof cellClassName === 'function' && cellClassName(cellDate);
            row[j] = cell;
          }
        }
        console.log(rows);
        return rows;
      }
    },
    methods: {
      isWeekActive(cell) {
        const newDate = new Date(this.year, this.month, 1);
        const year = newDate.getFullYear();
        const month = newDate.getMonth();

        if (cell.type === 'prev-month') {
          newDate.setMonth(month === 0 ? 11 : month - 1);
          newDate.setFullYear(month === 0 ? year - 1 : year);
        }

        if (cell.type === 'next-month') {
          newDate.setMonth(month === 11 ? 0 : month + 1);
          newDate.setFullYear(month === 11 ? year + 1 : year);
        }

        newDate.setDate(parseInt(cell.text, 10));

        if (isDate(this.value)) {
          const dayOffset = (this.value.getDay() - this.firstDayOfWeek + 7) % 7 - 1;
          const weekDate = prevDate(this.value, dayOffset);
          return weekDate.getTime() === newDate.getTime();
        }
        return false;
      },
      cellMatchesDate(cell, date) {
        const value = new Date(date);
        return this.year === value.getFullYear() &&
          this.month === value.getMonth() &&
          Number(cell.text) === value.getDate();
      },
      getCellClasses(cell) {
        const selectionMode = 'day';
        const defaultValue = this.defaultValue ? Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue] : [];

        let classes = [];
        if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
          classes.push('available');
          if (cell.type === 'today') {
            classes.push('today');
          }
        } else {
          classes.push(cell.type);
        }

        if (cell.type === 'normal' && defaultValue.some(date => this.cellMatchesDate(cell, date))) {
          classes.push('default');
        }

        if (selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today') && this.cellMatchesDate(cell, this.value)) {
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

        if (cell.customClass) {
          classes.push(cell.customClass);
        }

        return classes.join(' ');
      }
    }
  }
</script>

<style scoped>

</style>
