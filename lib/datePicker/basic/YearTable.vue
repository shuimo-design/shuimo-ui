<template>
  <table @click="handleYearTableClick" class="year-table">
    <tbody>
    <tr>
      <td class="available" :class="getCellStyle(startYear + 0)">
        <a class="cell">{{ startYear }}</a>
      </td>
      <td class="available" :class="getCellStyle(startYear + 1)">
        <a class="cell">{{ startYear + 1 }}</a>
      </td>
      <td class="available" :class="getCellStyle(startYear + 2)">
        <a class="cell">{{ startYear + 2 }}</a>
      </td>
      <td class="available" :class="getCellStyle(startYear + 3)">
        <a class="cell">{{ startYear + 3 }}</a>
      </td>
    </tr>
    <tr>
      <td class="available" :class="getCellStyle(startYear + 4)">
        <a class="cell">{{ startYear + 4 }}</a>
      </td>
      <td class="available" :class="getCellStyle(startYear + 5)">
        <a class="cell">{{ startYear + 5 }}</a>
      </td>
      <td class="available" :class="getCellStyle(startYear + 6)">
        <a class="cell">{{ startYear + 6 }}</a>
      </td>
      <td class="available" :class="getCellStyle(startYear + 7)">
        <a class="cell">{{ startYear + 7 }}</a>
      </td>
    </tr>
    <tr>
      <td class="available" :class="getCellStyle(startYear + 8)">
        <a class="cell">{{ startYear + 8 }}</a>
      </td>
      <td class="available" :class="getCellStyle(startYear + 9)">
        <a class="cell">{{ startYear + 9 }}</a>
      </td>
      <td></td>
      <td></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {arrayFindIndex, coerceTruthyValueToArray} from "../../dependents/_utils/dateUtil";

  export default {
    name: "year-table",
    props: {
      date: {}
    },
    computed: {
      startYear() {
        return Math.floor(this.date.getFullYear() / 10) * 10;
      }
    },
    methods: {
      getCellStyle(year) {
        const style = {};
        const today = new Date();

        style.current = arrayFindIndex(coerceTruthyValueToArray([this.date]), date => date.getFullYear() === year) >= 0;
        style.today = today.getFullYear() === year;

        return style;
      },
      handleYearTableClick(event) {
        const target = event.target;
        if (target.tagName === 'A') {
          const year = target.textContent || target.innerText;
          this.$emit('pick', Number(year));
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .year-table {
    margin-top: 10px;
    td {
      text-align: center;
      padding: 15px 3px;
      cursor: pointer;

      .cell {
        width: 48px;
        height: 30px;
        display: block;
        line-height: 30px;
        color: #606266;
        margin: 0 auto;
        transition: all 0.4s;
        cursor: pointer;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .today .cell {
      font-weight: 700;
      color: #1a336d;
    }
  }
</style>
