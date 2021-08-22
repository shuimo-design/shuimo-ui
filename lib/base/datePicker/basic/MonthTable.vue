<template>
  <table class="month-table" @click="handleMonthTableClick">
    <tbody>
    <tr v-for="(row, key) in rows" :key="key">
      <td v-for="(cell, key) in row" :key="key">
        <div>
          <a class="cell" :class="getCellStyle(cell)">{{cell.text + 1}}月</a>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {arrayFind, arrayFindIndex, coerceTruthyValueToArray} from "../../../dependents/_utils/dateUtil";

  const clearDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth());
  };

  const getMonthTimestamp = function (time) {
    if (typeof time === 'number' || typeof time === 'string') {
      return clearDate(new Date(time)).getTime();
    } else if (time instanceof Date) {
      return clearDate(time).getTime();
    } else {
      return NaN;
    }
  };

  export default {
    name: "month-table",
    props: {
      minDate: {},
      maxDate: {},
      date: {},
      value: {}
    },
    data() {
      return {
        tableRows: [[], [], []]
      };
    },
    computed: {
      rows() {
        const rows = this.tableRows;
        const selectedDate = [];
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
            const time = new Date(this.date.getFullYear(), index).getTime();
            cell.inRange = time >= getMonthTimestamp(this.minDate) && time <= getMonthTimestamp(this.maxDate);
            cell.start = this.minDate && time === getMonthTimestamp(this.minDate);
            cell.end = this.maxDate && time === getMonthTimestamp(this.maxDate);
            const isToday = time === now;

            if (isToday) {
              cell.type = 'today';
            }
            cell.text = index;
            let cellDate = new Date(time);
            cell.selected = arrayFind(selectedDate, date => date.getTime() === cellDate.getTime());

            row[j] = cell;
          }
        }
        return rows;
      }
    },
    methods: {
      getCellStyle(cell) {
        const style = {};
        const year = this.date.getFullYear();
        const today = new Date();
        const month = cell.text;
        const dateVal = new Date(this.value);
        style.current = arrayFindIndex(coerceTruthyValueToArray([dateVal]), date => date.getFullYear() === year && date.getMonth() === month) >= 0;
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
      },
      handleMonthTableClick(event) {
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
        this.$emit('pick', month);
      }
    }
  }
</script>

<style scoped lang="scss">
  .month-table {
    margin-top: 14px;

    td {
      padding: 8px 8px;

      div {
        height: 40px;
        padding: 0;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;

        .cell {
          width: 40px;
          height: 40px;
          display: block;
          line-height: 40px;
          color: #606266;
          margin: 0 auto;
          border-radius: 18px;
          transition: all 0.4s;
          cursor: pointer;

          &:hover {
            transform: scale(1.2);
          }

        }

        .today {
          font-weight: 700;
          color: #1a336d;
        }

        .current {
          background: url("/lib/assets/date-picker/circle.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
