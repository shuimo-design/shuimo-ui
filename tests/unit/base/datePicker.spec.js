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

import { mount } from '@vue/test-utils';
import { describe, test, expect, vi } from "vitest";
import WDatePicker from '../../../lib/base/datePicker/WDatePicker';

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
    const wrapper = mount(WDatePicker)
    await wrapper.setProps({ modelValue: '2021-02-18' })
    expect(wrapper.get('span').html()).toContain('2021-02-18');
    wrapper.unmount();
  })

  // todo 事件测试用例不应放在这里
  // test('日期选择', async () => {
  //   const map = {};
  //   window.addEventListener = vi.fn((event, cb) => {
  //     map[event] = cb;
  //   })
  //   const teleportTarget = new DOMWrapper(document.querySelector('body'))
  //   const wrapper = mount(WDatePicker);
  //   await wrapper.find('.w-date-picker-div').trigger('click');
  //   const calendar = teleportTarget.find('.calendar-dropdown');
  //   expect(calendar.isVisible()).toBe(true);
  //   map.mousedown({
  //     path: null
  //   })
  //   map.resize();
  //   await wrapper.find('.w-date-picker-div').trigger('click');
  //   expect(calendar.find('.date-table').isVisible()).toBe(true);
  //
  //   const spans = document.querySelectorAll('.calendar-dropdown-header span');
  //   const year = new Date().getFullYear();
  //   const month = (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : (new Date().getMonth() + 1);
  //   expect(spans[0].textContent).toContain(`${year}`);
  //   expect(spans[2].textContent).toContain(`${month}`);
  //
  //   await calendar.find('.calendar-year-prev').trigger('click');
  //   await calendar.find('.calendar-year-next').trigger('click');
  //   expect(calendar.find('.year').text()).toContain(`${year}`);
  //   await calendar.find('.year').trigger('click');
  //   await calendar.find('.calendar-year-prev').trigger('click');
  //   await calendar.find('.calendar-year-next').trigger('click');
  //   expect(calendar.find('.year-table').isVisible()).toBe(true);
  //
  //   await calendar.find('.month').trigger('click');
  //   expect(calendar.find('.month-table').isVisible()).toBe(true);
  //   await calendar.find('.calendar-month-prev').trigger('click');
  //   await calendar.find('.calendar-month-next').trigger('click');
  //   expect(calendar.find('.month').text()).toBe(`${month}`);
  //
  //
  //   await calendar.find('.year').trigger('click');
  //   await calendar.find('.year-table .today .w-cell').trigger('click');
  //   expect(calendar.find('.year').text()).toBe(`${year}`);
  //   expect(calendar.find('.month-table').isVisible()).toBe(true);
  //
  //   await calendar.find('.month-table td div .today').trigger('click');
  //   expect(calendar.find('.month').text()).toBe(`${month}`);
  //   expect(calendar.find('.date-table').isVisible()).toBe(true);
  //
  //   await calendar.find('.date-table td .today').trigger('click');
  //   expect(wrapper.vm.$props.modelValue).toBeDefined();
  //   map.mousedown({
  //     path: [{ classList: ['calendar-dropdown'] }]
  //   })
  //   setTimeout(async () => {
  //     expect(calendar.isVisible()).toBe(false);
  //     await calendar.trigger('onresize');
  //     done()
  //   }, 100);
  //
  //   map.mousedown({
  //     path: [{ classList: [] }]
  //   })
  //   wrapper.unmount();
  // })
  //
  // test('月份选择', async () => {
  //   const teleportTarget = new DOMWrapper(document.querySelector('body'))
  //   const wrapper = mount(WDatePicker, {
  //     props: {
  //       type: 'month'
  //     }
  //   });
  //   await wrapper.find('.w-date-picker-div').trigger('click');
  //   const calendar = teleportTarget.find('.calendar-dropdown');
  //   expect(calendar.isVisible()).toBe(true);
  //   expect(calendar.find('.month-table').isVisible()).toBe(true);
  //
  //   const spans = document.querySelectorAll('.calendar-dropdown-header span');
  //   const year = new Date().getFullYear();
  //   const month = (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : (new Date().getMonth() + 1);
  //   expect(spans[0].textContent).toContain(`${year}`);
  //   expect(spans[2].textContent).toContain(`${month}`);
  //
  //   await calendar.find('.month-table td div .today').trigger('click');
  //   expect(calendar.find('.month').text()).toBe(`${month}`);
  //   expect(wrapper.vm.$props.modelValue).toBeDefined();
  //   setTimeout(async () => {
  //     expect(calendar.isVisible()).toBe(false);
  //     done()
  //   }, 100);
  // })
})