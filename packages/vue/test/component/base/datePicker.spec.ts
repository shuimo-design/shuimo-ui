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

import { beforeEach, describe, expect, test, beforeAll, vi ,afterEach} from 'vitest';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';
import MDatePicker from '../../../lib/base/MDatePicker';

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
  };
});
describe('datePicker', () => {
  test('render', () => {
    const wrapper = mount(MDatePicker);
    expect(wrapper.html()).toContain('m-date-picker');
    wrapper.unmount();
  });

  test.skip('month type', () => {
    const wrapper = mount(MDatePicker, {
      props: {
        type: 'month'
      }
    });
    expect(wrapper.html()).toContain('m-date-picker');
    wrapper.unmount();
  });

  test('modelValue', async () => {
    const wrapper = mount(MDatePicker);
    await wrapper.setProps({ modelValue: '2021-02-18' });
    expect(wrapper.find('.m-date-picker-span').html()).toContain('2021-02-18');
    wrapper.unmount();
  });
});

describe('with event', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<any>>;

  const year = 2022;
  const month = 5;
  const day = 4;
  beforeEach(() => {
    wrapper = mount(MDatePicker, {
      props: { modelValue: `${year}-0${month}-0${day}` }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  })

  const showOptions = async (wrapper: VueWrapper) => {
    vi.useFakeTimers();
    await wrapper.find('.m-date-picker-active').trigger('click');
    await vi.runOnlyPendingTimersAsync();
  };

  test('click show calendar', async () => {
    expect(wrapper.findAll('.m-date-picker-calendar').length).toBe(0)
    await showOptions(wrapper);
    expect(wrapper.findAll('.m-date-picker-calendar').length).not.toBe(0);
  });

  describe('calendar', () => {


    beforeEach(async () => {
      await showOptions(wrapper);
    });

    test('calendar head', async () => {
      const calendarHead = wrapper.find('.m-date-picker-calendar-head');
      const spans = calendarHead.findAll('span');
      expect(spans[0].text()).toBe(year.toString());
      expect(spans[1].text()).toBe(month.toString());
    });

    test('show year calendar', async () => {
      const calendarHead = wrapper.find('.m-date-picker-calendar-head');
      const spans = calendarHead.findAll('span');
      await spans[0].trigger('click');
      expect(wrapper.find('.m-date-picker-calendar-column-year').exists()).toBe(true);
    });

    test('show month calendar', async () => {
      const calendarHead = wrapper.find('.m-date-picker-calendar-head');
      const spans = calendarHead.findAll('span');
      await spans[1].trigger('click');
      expect(wrapper.find('.m-date-picker-calendar-column-month').exists()).toBe(true);
    });

    test('update:modelValue', async () => {
      const calendarBody = wrapper.find('.m-date-picker-calendar-body');
      const spans = calendarBody.findAll('.m-date-picker-calendar-column');
      await spans[0].trigger('click');
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['2022-04-24']);
    });
  });

  // not support month type right now;
  test.skip('月份选择', async done => {
    // const teleportTarget = new DOMWrapper(document.querySelector('body')!);
    // const wrapper = mount(MDatePicker, {
    //   props: {
    //     type: 'month'
    //   }
    // });
    // await wrapper.find('.m-date-picker-div').trigger('click');
    // const calendar = teleportTarget.find('.m-calendar-dropdown');
    // expect(calendar.isVisible()).toBe(true);
    // expect(calendar.find('.month-table').isVisible()).toBe(true);
    //
    // const spans = document.querySelectorAll('.m-calendar-dropdown-header span');
    // const year = new Date().getFullYear();
    // const month = (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : (new Date().getMonth() + 1);
    // expect(spans[0].textContent).toContain(`${year}`);
    // expect(spans[2].textContent).toContain(`${month}`);
    //
    // await calendar.find('.month-table td div .today').trigger('click');
    // expect(calendar.find('.month').text()).toBe(`${month}`);
    // expect(wrapper.vm.$props.modelValue).toBeDefined();
    // setTimeout(async () => {
    //   expect(calendar.isVisible()).toBe(false);
    //   done();
    // }, 100);
  });
});
