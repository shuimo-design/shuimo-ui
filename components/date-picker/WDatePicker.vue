<template>
  <div>
    <div class="w-date-picker-div" ref="select" @click="showCalendar">
      <span>{{ defaultValue }}</span>
      <button></button>
    </div>
    <Teleport to="body">
      <div v-show="calendarDropdown" :style="dropdownStyle"
           class="calendar-dropdown">
        <div class="calendar-dropdown-header">
          <button class="calendar-year-prev"></button>
          <button class="calendar-month-prev"></button>
          <span class="year">2021</span>
          <span class="month">，01</span>
          <button class="calendar-month-next"></button>
          <button class="calendar-year-next"></button>
        </div>
        <div class="content">
          <date-table :date="date"/>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
  /**
   * @description 日期选择框
   * @author: 南歌子
   * @date 2021/01/05 13:44
   * @version V1.0.0
   *
   * Hello, humor
   */

  import DateTable from './basic/date-table.vue'
  const DEFAULT_SELECT_BORDER = 3;
  const DEFAULT_MARGIN = 5;
  const getStyle = (selectStyle, type) => {
    const num = Number(selectStyle[type].replace('px', ''));
    return isNaN(num) ? 0 : num;
  };

  export default {
    name: 'WDatePicker',
    components: { DateTable },
    data() {
      return {
        defaultValue: '请选择日期',
        calendarDropdown: false,
        selectStyle: {
          offsetTop: null,
          offsetLeft: null,
          height: null,
          width: null
        },
        select: null,
        date: new Date()
      }
    },
    computed: {
      dropdownStyle() {
        const s = this.selectStyle;
        return {
          left: `${s.offsetLeft - DEFAULT_SELECT_BORDER}px`,
          top: `${s.offsetTop + s.height + DEFAULT_MARGIN}px`
        }
      }
    },
    mounted() {
      this.select = this.$refs['select'];
    },
    methods: {
      showCalendar() {
        this.setStyle();
        this.calendarDropdown = !this.calendarDropdown;
      },
      /**
       * 设置下拉框样式
       */
      setStyle() {
        const { select } = this;
        const selectStyle = window.getComputedStyle(select);
        this.selectStyle.offsetLeft = select.offsetLeft;
        this.selectStyle.offsetTop = select.offsetTop;
        this.selectStyle.height = getStyle(selectStyle, 'height');
        this.selectStyle.width = getStyle(selectStyle, 'width');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .w-date-picker-div {
    display: inline-block;
    width: 214px;
    height: 31px;
    border: 3px double transparent;
    padding: 0 5px;
    border-image: url("../assets/input/input244.png") 3;
    cursor: pointer;

    span {
      line-height: 31px;
    }

    button {
      background: transparent;
      border: none;
      outline: none;
      position: relative;
      bottom: -3px;
      float: right;

      &:before {
        content: url("/components/assets/date-picker/calendar.png");
        cursor: pointer;
      }
    }
  }

</style>
