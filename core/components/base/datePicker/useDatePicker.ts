/**
 * @description datePicker 核心 composable
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 从 lib/useDatePicker 移植，去掉 usePopover / useBorder 依赖。
 * 纯日历数据管理，不含任何 popover 逻辑。
 */
import dayjs from 'dayjs';
import { computed, ref, Ref } from 'vue';
import { DatePickerProps, CalendarType, DateRefType, CalendarItem } from './props';

/** 基础星期头（汉字显示） */
export const BASE_WEEK_NAME: Array<{ day: string; isCurrentMonth: boolean }> = [
  { day: '日', isCurrentMonth: true },
  { day: '壹', isCurrentMonth: true },
  { day: '贰', isCurrentMonth: true },
  { day: '叁', isCurrentMonth: true },
  { day: '肆', isCurrentMonth: true },
  { day: '伍', isCurrentMonth: true },
  { day: '陆', isCurrentMonth: true },
];

/** 月份名称 */
export const BASE_MONTH_NAME = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月',
];

/**
 * 将 string | Date 转换为 dayjs 对象。
 * headless 组件需要用此函数更新 currentRef。
 */
export const toDayjs = (value: string | Date | undefined) => {
  return dayjs(value);
};

/** 简单的空值判断，内联避免从 lib 导入 */
const isEmpty = (value: unknown): boolean => {
  return value === '' || value === null || value === undefined;
};

export function useDatePicker(props: DatePickerProps) {
  const today = dayjs();

  /** 当前日历视图所在年月日 */
  const dateRef = ref<DateRefType>({
    year: today.year(),
    month: today.month() + 1,
    day: today.date(),
  });

  /** trigger 显示的格式化文本 */
  const displayValue = ref('');

  /** trigger span 的 class 列表（含 placeholder 状态） */
  const spanClass = ref<Array<string | undefined>>([]);

  /** 当前选中的日期（dayjs 对象），用于日历格高亮） */
  const currentRef = ref(toDayjs(props.modelValue));

  /** 日历面板显示模式：date / month / year */
  const calendarTypeRef = ref<CalendarType>(props.type ?? 'date');

  /** 年份选择模式下展示的 12 个年份 */
  const yearsRef = ref<number[]>([]);

  /** 是否处于 placeholder 状态 */
  let needPlaceholder = false;

  /** 根据 type 和 format prop 计算实际使用的日期格式 */
  const format = computed(() => {
    if (props.format) return props.format;
    switch (props.type) {
      case 'month': return 'YYYY-MM';
      case 'date':
      default: return 'YYYY-MM-DD';
    }
  });

  /**
   * 根据传入值更新内部状态（dateRef、displayValue、spanClass）。
   * 空值时显示 placeholder，有效日期时解析并同步。
   */
  const updateDateRef = (value: string | Date | undefined) => {
    if (isEmpty(value)) {
      displayValue.value = props.placeholder ?? '请选择日期...';
      needPlaceholder = true;
    } else {
      needPlaceholder = false;
      const dayjsValue = dayjs(value as string | Date);
      if (dayjsValue.isValid()) {
        displayValue.value = dayjsValue.format(format.value).toString();
        dateRef.value = {
          year: dayjsValue.year(),
          month: dayjsValue.month() + 1,
          day: dayjsValue.date(),
        };
      }
      // 无效日期时保持原状，不做处理
    }
    spanClass.value = [
      'm-date-picker-span',
      needPlaceholder ? 'm-date-picker-placeholder' : undefined,
    ];
  };

  // 初始化
  updateDateRef(props.modelValue);

  /**
   * 生成 6×7 日历网格数据。
   * 返回按 7 天分组的二维数组，每格包含日期信息。
   */
  const getCalendar = (MDateRefValue: Ref<DateRefType>): CalendarItem[][] => {
    const dr = MDateRefValue.value;

    // 当月第一天的 dayjs
    const monthDayjs = dayjs().set('year', dr.year).set('month', dr.month - 1);
    const dateDayjs = monthDayjs.set('date', dr.day);
    const firstDayWeek = dateDayjs.startOf('month');
    const firstDayWeekDay = firstDayWeek.day();

    // 上个月信息
    const prevDaysYear = dr.month === 1 ? dr.year - 1 : dr.year;
    const lastMonthDayjs = dateDayjs.subtract(1, 'month');
    const lastMonth = lastMonthDayjs.month() + 1;

    // 填充上月日期（到当月第一天前的周日）
    const prevDays: CalendarItem[] = Array.from({ length: firstDayWeekDay }, (_, i) => {
      const day = firstDayWeek.subtract(firstDayWeekDay - i, 'day').date();
      return { day, isCurrentMonth: false, month: lastMonth, year: prevDaysYear };
    });

    // 判断某日是否是当前选中日
    const isCurrent = (dayNum: number): boolean => {
      if (dr.year !== currentRef.value.year()) return false;
      if (dr.month !== currentRef.value.month() + 1) return false;
      return dayNum === currentRef.value.date();
    };

    // 当月所有日期
    const currentDays: CalendarItem[] = Array.from({ length: monthDayjs.daysInMonth() }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
      isCurrent: isCurrent(i + 1),
      month: dr.month,
      year: dr.year,
    }));

    // 下个月信息：填充到当月最后一天所在周的周六
    const nextDaysYear = dr.month === 12 ? dr.year + 1 : dr.year;
    const lastDayOfMonth = dayjs(`${dr.year}-${dr.month}`).daysInMonth();
    const lastDayWeekDay = dayjs(`${dr.year}-${dr.month}-${lastDayOfMonth}`).day();
    const nextDays: CalendarItem[] = Array.from({ length: 6 - lastDayWeekDay }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: false,
      month: dr.month === 12 ? 1 : dr.month + 1,
      year: nextDaysYear,
    }));

    // 总格数不足 42（6 行）时补齐
    if (prevDays.length + currentDays.length + nextDays.length < 42) {
      if (firstDayWeekDay === 0) {
        // 当月第一天是周日，需在前面多补一行上月日期
        const lastMonthDays = lastMonthDayjs.daysInMonth();
        prevDays.unshift(...Array.from({ length: 7 }, (_, i) => ({
          day: lastMonthDays - 6 + i,
          isCurrentMonth: false,
          month: lastMonth,
          year: prevDaysYear,
        })));
      } else {
        // 末尾补充下月日期，补足一行
        const nextMonth = dateDayjs.add(1, 'month');
        const nextMonthFirstDayWeek = nextMonth.set('date', 1).day();
        const baseDay = nextMonthFirstDayWeek === 0 ? 0 : (6 - nextMonthFirstDayWeek);
        nextDays.push(...Array.from({ length: 7 }, (_, i) => ({
          day: i + baseDay + 1,
          isCurrentMonth: false,
          month: dr.month === 12 ? 1 : dr.month + 1,
          year: nextDaysYear,
        })));
      }
    }

    // 按 7 天一组切分为二维数组
    const allDays = [...prevDays, ...currentDays, ...nextDays];
    const result: CalendarItem[][] = [];
    for (let i = 0; i < allDays.length; i += 7) {
      result.push(allDays.slice(i, i + 7) as CalendarItem[]);
    }
    return result;
  };

  /** 切换到上一个月 */
  const toPrevMonth = () => {
    if (!dateRef.value) return;
    dateRef.value.month -= 1;
    if (dateRef.value.month === 0) {
      dateRef.value.month = 12;
      dateRef.value.year -= 1;
    }
  };

  /** 切换到下一个月 */
  const toNextMonth = () => {
    if (!dateRef.value) return;
    dateRef.value.month += 1;
    if (dateRef.value.month === 13) {
      dateRef.value.month = 1;
      dateRef.value.year += 1;
    }
  };

  /** 切换到下一年 */
  const toNextYear = () => {
    if (!dateRef.value) return;
    dateRef.value.year += 1;
    // 年份选择模式下，若当前年不在范围内则重新生成年份列表
    if (calendarTypeRef.value === 'year') {
      if (!yearsRef.value.includes(dateRef.value.year)) {
        const startYear = dateRef.value.year;
        yearsRef.value = Array.from({ length: 12 }, (_, i) => startYear + i);
      }
    }
  };

  /** 切换到上一年 */
  const toPrevYear = () => {
    if (!dateRef.value) return;
    dateRef.value.year -= 1;
    if (calendarTypeRef.value === 'year') {
      if (!yearsRef.value.includes(dateRef.value.year)) {
        const startYear = dateRef.value.year - 11;
        yearsRef.value = Array.from({ length: 12 }, (_, i) => startYear + i);
      }
    }
  };

  /**
   * 根据日历格数据生成格式化后的日期字符串值。
   */
  const getValue = (item: CalendarItem): string => {
    return dayjs()
      .set('year', item.year)
      .set('month', (item.month as number) - 1)
      .set('date', Number(item.day))
      .format(format.value);
  };

  /**
   * 点击头部年份文字 → 切换到年份选择模式，生成以 year 为中心的 12 个年份列表。
   */
  const clickCurrentYear = (year: number) => {
    calendarTypeRef.value = 'year';
    const startYear = year - 6;
    const endYear = year + 5;
    yearsRef.value = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  };

  /**
   * 点击年份列表中某一年 → 更新 dateRef.year 并根据 type 切换模式。
   */
  const clickYearItem = (year: number) => {
    if (!dateRef.value) return;
    dateRef.value.year = year;
    if (props.type === 'date') calendarTypeRef.value = 'date';
    else if (props.type === 'month') calendarTypeRef.value = 'month';
  };

  /**
   * 点击头部月份文字 → 切换到月份选择模式。
   */
  const clickCurrentMonth = (_month: number) => {
    calendarTypeRef.value = 'month';
  };

  /**
   * 点击月份列表中某一月 → 更新 dateRef.month，若 type="date" 则切换回日期模式。
   */
  const clickMonthItem = (month: number) => {
    dateRef.value.month = month;
    if (props.type === 'date') calendarTypeRef.value = 'date';
  };

  return {
    // 状态
    dateRef,
    displayValue,
    spanClass,
    currentRef,
    calendarTypeRef,
    yearsRef,
    // 方法
    updateDateRef,
    getCalendar,
    toPrevMonth,
    toNextMonth,
    toPrevYear,
    toNextYear,
    getValue,
    clickCurrentYear,
    clickYearItem,
    clickCurrentMonth,
    clickMonthItem,
    // 工具
    toDayjs,
  };
}
