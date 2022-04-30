/**
 * @description: datePicker日期选择框测试用例
 * @author: 南歌子
 * @date 2021/02/18 15:20
 * @version v1.0.1
 *
 * Hello, humor
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */

import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { describe, test, expect, beforeEach } from "vitest";
import WDatePicker from '../../../lib/base/datePicker/WDatePicker';
import DateTable from "../../../lib/base/datePicker/basic/DateTable";
import CalendarDropdown from "../../../lib/base/datePicker/basic/CalendarDropdown";
import { ComponentPublicInstance } from "@vue/runtime-core";
import YearTable from "../../../lib/base/datePicker/basic/YearTable";
import MonthTable from "../../../lib/base/datePicker/basic/MonthTable";

describe('日期选择组件', () => {
  test('无参数渲染', () => {
    const wrapper = mount(WDatePicker);
    expect(wrapper.html()).toContain('w-date-picker');
    wrapper.unmount();
  })

  test('无参数月份选择渲染', () => {
    const wrapper = mount(WDatePicker, {
      props: {
        type: 'month'
      }
    })
    expect(wrapper.html()).toContain('w-date-picker');
    wrapper.unmount();
  })

  test('测试参数', async () => {
    const wrapper = mount(WDatePicker);
    await wrapper.setProps({ modelValue: '2021-02-18' });
    expect(wrapper.find('span').html()).toContain('2021-02-18');
    wrapper.unmount();
  })

})

describe('伴随事件', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<any>>;

  const year = 2022;
  const month = 5;
  const day = 4;
  beforeEach(() => {
    wrapper = mount(WDatePicker, {
      props: { modelValue: `${year}-0${month}-0${day}` }
    });
  })

  test('日期选择下拉框正常渲染', async () => {
    const dateTableWrapper = wrapper.getComponent(DateTable);
    expect(dateTableWrapper.isVisible()).toBe(false);
    await wrapper.find('.w-date-picker-div').trigger('click');
    expect(dateTableWrapper.isVisible()).toBe(true);
  });

  type AnyVueWrapper = Omit<VueWrapper<InstanceType<any>>, 'exists'>;
  describe('下拉模块', () => {
    let calendarDropdown: AnyVueWrapper;
    let calendar: DOMWrapper<any>;
    let yearTable: AnyVueWrapper;
    let monthTable: AnyVueWrapper;
    let dateTable: AnyVueWrapper;


    beforeEach(async () => {
      await wrapper.find('.w-date-picker-div').trigger('click');
      calendarDropdown = wrapper.getComponent(CalendarDropdown);
      yearTable = wrapper.getComponent(YearTable);
      monthTable = wrapper.getComponent(MonthTable);
      dateTable = wrapper.getComponent(DateTable);
      calendar = calendarDropdown.find('.calendar-dropdown');
    })

    test('Header模块渲染', async () => {
      expect(calendar.isVisible()).toBe(true);
      const spans = calendar.findAll('.calendar-dropdown-header span');
      expect(spans[0].text()).toBe(year.toString());
      expect(spans[2].text()).toBe(`0${month}`);
    });

    test('点击年份后显示年份选择内容', async () => {
      expect(yearTable.isVisible()).toBe(false);
      await calendar.find('.w-year').trigger('click');
      expect(yearTable.isVisible()).toBe(true);

      await calendar.find('.calendar-year-prev').trigger('click');
      expect(calendar.find('.w-year').text()).toBe('2010 - 2019');
      await calendar.find('.calendar-year-next').trigger('click');
      expect(calendar.find('.w-year').text()).toBe('2020 - 2029');
    });

    test('点击月份后显示月份选择内容', async () => {
      expect(monthTable.isVisible()).toBe(false);
      await calendar.find('.w-month').trigger('click');
      expect(monthTable.isVisible()).toBe(true);
      await calendar.find('.calendar-month-prev').trigger('click');
      expect(calendar.find('.w-month').text()).toBe(`0${month - 1}`);
      await calendar.find('.calendar-month-next').trigger('click');
      expect(calendar.find('.w-month').text()).toBe(`0${month}`);
    });

    test('点击日期后数据更新',async ()=>{
      expect(dateTable.isVisible()).toBe(true);
      await dateTable.find('.w-date-prev-month').trigger('click');
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['2022-04-25']);
    })

  });

  test.skip('月份选择', async (done) => {
    const teleportTarget = new DOMWrapper(document.querySelector('body')!)
    const wrapper = mount(WDatePicker, {
      props: {
        type: 'month'
      }
    });
    await wrapper.find('.w-date-picker-div').trigger('click');
    const calendar = teleportTarget.find('.calendar-dropdown');
    expect(calendar.isVisible()).toBe(true);
    expect(calendar.find('.month-table').isVisible()).toBe(true);

    const spans = document.querySelectorAll('.calendar-dropdown-header span');
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : (new Date().getMonth() + 1);
    expect(spans[0].textContent).toContain(`${year}`);
    expect(spans[2].textContent).toContain(`${month}`);

    await calendar.find('.month-table td div .today').trigger('click');
    expect(calendar.find('.month').text()).toBe(`${month}`);
    expect(wrapper.vm.$props.modelValue).toBeDefined();
    setTimeout(async () => {
      expect(calendar.isVisible()).toBe(false);
      done()
    }, 100);
  })
})
