<template>
  <div>
    <div class="w-date-picker-div w-date-picker" ref="select" @click="showCalendar">
      <span>{{ defaultValue ? defaultValue : placeholder }}</span>
      <div class="calendar-icon"></div>
    </div>
    <Teleport to="body">
      <transition name="w-opacity">
        <div v-show="calendarDropdown" :style="dropdownStyle"
             class="calendar-dropdown"
             @onresize="leaveDropdown">
          <div class="calendar-dropdown-header">
            <button class="calendar-year-prev" @click="prevYear"></button>
            <button class="calendar-month-prev"
                    v-show="currentView === 'date'"
                    @click="prevMonth"></button>
            <span class="year"
                  @click="showYearPicker">{{ year }}</span>
            <span class="between" v-show="currentView === 'date'">，</span>
            <span class="month"
                  @click="showMonthPicker"
                  v-show="currentView === 'date'">{{ month }}</span>
            <button class="calendar-month-next"
                    v-show="currentView === 'date'"
                    @click="nextMonth"></button>
            <button class="calendar-year-next" @click="nextYear"></button>
          </div>
          <div class="content">
            <date-table :date="date"
                        v-show="currentView === 'date'"
                        @pick="handleDatePick"
                        :value="defaultValue"/>
            <year-table v-show="currentView === 'year'"
                        @pick="handleYearPick"
                        :value="defaultValue"
                        :date="date"/>
            <month-table v-show="currentView === 'month'"
                         :date="date"
                         :value="defaultValue"
                         @pick="handleMonthPick"/>
          </div>
        </div>
      </transition>
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

import DateTable from './basic/DateTable.vue'
import MonthTable from './basic/MonthTable.vue'
import YearTable from './basic/YearTable.vue'
import {
  modifyDate,
  setDate,
  prevYear,
  nextYear,
  prevMonth,
  nextMonth,
  changeYearMonthAndClampDate,
  valueFormatByType
} from "../_utils/dateUtil";

const DEFAULT_SELECT_BORDER = 3;
const DEFAULT_MARGIN = 5;
const getStyle = (selectStyle, type) => {
  const num = Number(selectStyle[type].replace('px', ''));
  return isNaN(num) ? 0 : num;
};

export default {
  name: 'WDatePicker',
  components: { DateTable, MonthTable, YearTable },
  props: {
    value: {
      type: null,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    type: {
      type: String,
      default: 'date'
    }
  },
  data() {
    return {
      defaultValue: '',
      calendarDropdown: false,
      selectStyle: {
        offsetTop: null,
        offsetLeft: null,
        height: null,
        width: null
      },
      select: null,
      date: new Date(),
      currentView: 'date'
    }
  },
  computed: {
    dropdownStyle() {
      const s = this.selectStyle;
      return {
        left: `${s.offsetLeft - DEFAULT_SELECT_BORDER}px`,
        top: `${s.offsetTop + s.height + DEFAULT_MARGIN}px`
      }
    },
    year() {
      if (this.currentView === 'year') {
        const startYear = Math.floor(this.date.getFullYear() / 10) * 10;
        return startYear + ' - ' + (startYear + 9);
      }
      return this.date.getFullYear();
    },
    month() {
      const month = this.date.getMonth() + 1;
      return month < 10 ? `0${month}` : month;
    }
  },
  watch: {
    value() {
      this.setDefault();
    }
  },
  mounted() {
    this.select = this.$refs['select'];
    this.setDefault();
  },
  unmounted() {
    window.removeEventListener('mousedown', this.mousedownEvent);
    window.removeEventListener('resize', this.resizeWindow);
  },
  methods: {
    showCalendar() {
      this.setStyle();
      this.setEvents();
      this.calendarDropdown = !this.calendarDropdown;
    },
    /**
     * 设置下拉框样式
     */
    setStyle() {
      const { select } = this;
      // todo 需要优化offset的获取
      const parent = select.offsetParent;
      const selectStyle = window.getComputedStyle(select);
      this.selectStyle.offsetLeft = parent.offsetLeft + select.offsetLeft;
      this.selectStyle.offsetTop = parent.offsetTop + select.offsetTop;
      this.selectStyle.height = getStyle(selectStyle, 'height');
      this.selectStyle.width = getStyle(selectStyle, 'width');
    },
    /**
     * 离开下拉框方法
     */
    leaveDropdown() {
      this.calendarDropdown = false;
      window.removeEventListener('mousedown', this.mousedownEvent);
      window.removeEventListener('resize', this.resizeWindow);
    },
    /**
     * 隐藏下拉框关联鼠标事件
     * @param e event
     */
    mousedownEvent(e) {
      // todo switch to utils func
      if (e.path && e.path.length > 0) {
        const isSelectDropdown = e.path.some(q => q.classList &&
          Array(...q.classList).includes('calendar-dropdown'));
        if (!isSelectDropdown) {
          this.leaveDropdown();
        }
      } else {
        this.leaveDropdown();
      }
    },
    /**
     * 改变窗口大小方法
     */
    resizeWindow() {
      this.setStyle();
    },
    /**
     * 事件绑定
     */
    setEvents() {
      window.addEventListener('mousedown', this.mousedownEvent);
      window.addEventListener('resize', this.resizeWindow)
    },
    setDefault() {
      this.defaultValue = this.value ? valueFormatByType(this.value, this.type) : '';
      this.date = this.value ? new Date(this.value) : new Date();
      if (this.type === 'month') {
        this.currentView = 'month';
      }
    },
    handleDatePick(date) {
      let newDate = modifyDate(date, date.getFullYear(), date.getMonth(), date.getDate());
      this.defaultValue = setDate(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate());
      this.$emit('update:value', this.defaultValue);
      this.calendarDropdown = false;
      this.date = newDate;
    },
    prevMonth() {
      this.date = prevMonth(this.date);
    },

    nextMonth() {
      this.date = nextMonth(this.date);
    },
    prevYear() {
      if (this.currentView === 'year') {
        this.date = prevYear(this.date, 10);
      } else {
        this.date = prevYear(this.date);
      }
    },

    nextYear() {
      if (this.currentView === 'year') {
        this.date = nextYear(this.date, 10);
      } else {
        this.date = nextYear(this.date);
      }
    },
    showMonthPicker() {
      this.currentView = 'month';
    },
    showYearPicker() {
      this.currentView = 'year';
    },
    handleMonthPick(month) {
      this.date = changeYearMonthAndClampDate(this.date, this.year, month);
      if (this.type === 'month') {
        this.defaultValue = valueFormatByType(this.date, 'month');
        this.$emit('update:value', this.defaultValue);
        this.calendarDropdown = false;
        return;
      }
      this.currentView = 'date';
    },
    handleYearPick(year) {
      this.date = changeYearMonthAndClampDate(this.date, year, this.month);
      this.currentView = 'month';
    },
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
  border-image: url("/lib/assets/input/input244.png") 3;
  cursor: pointer;

  span {
    line-height: 31px;
  }

  .calendar-icon {
    background: transparent;
    position: relative;
    bottom: -3px;
    float: right;
    cursor: pointer;

    &:before {
      content: url("/lib/assets/date-picker/calendar.png");
    }
  }
}

</style>
