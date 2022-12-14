/**
 * @description loading指令测试用例
 * @author 阿怪
 * @date 2022/8/28 05:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { loadingDirective } from '../../lib/other/loading/directive';

describe('loading指令', function () {
  test('测试loading指令', () => {
    const wrapper = mount(
      { template: '<div v-loading></div>' },
      {
        global: { directives: { loading: loadingDirective } }
      }
    );
    expect(wrapper.find('.m-loading').exists()).toBe(true);
    wrapper.unmount();
  });

  test('修改loading指令', async () => {
    vi.useFakeTimers();
    const wrapper = mount(
      {
        template: '<div v-loading="loadingValue"></div>',
        props: {
          loadingValue: { type: Boolean, default: false }
        }
      },
      {
        props: { loadingValue: false },
        global: { directives: { loading: loadingDirective } }
      }
    );
    expect(wrapper.find('.m-loading').exists()).toBe(false);
    await vi.runOnlyPendingTimers();
    await wrapper.setProps({ loadingValue: true });
    expect(wrapper.find('.m-loading').exists()).toBe(true);
    wrapper.unmount();
  });

  test('初始化后移除', async () => {
    vi.useFakeTimers();
    const wrapper = mount(
      {
        template: '<div v-loading="loadingValue"></div>',
        props: { loadingValue: { type: Boolean, default: false } }
      },
      {
        props: { loadingValue: true },
        global: { directives: { loading: loadingDirective } }
      }
    );
    await wrapper.setProps({ loadingValue: false });
    expect(wrapper.find('.m-loading').exists()).toBe(false);
    await vi.runOnlyPendingTimers();
    wrapper.unmount();
  });

  test('存在多个指令', async () => {
    const wrapper = mount(
      {
        template:
          '<div>' + '<span v-loading="loadingValue"></span>' + '<span v-loading="loadingValue2"></span>' + '</div>',
        props: {
          loadingValue: { type: Boolean, default: false },
          loadingValue2: { type: Boolean, default: false }
        }
      },
      {
        props: {
          loadingValue: true,
          loadingValue2: false
        },
        global: { directives: { loading: loadingDirective } }
      }
    );
    await wrapper.setProps({ loadingValue: true });
    const spanList = wrapper.findAll('span');

    expect(spanList[0].find('.m-loading').exists()).toBe(true);
    expect(spanList[1].find('.m-loading').exists()).toBe(false);
    await wrapper.setProps({ loadingValue2: true });
    expect(spanList[0].find('.m-loading').exists()).toBe(true);
    expect(spanList[1].find('.m-loading').exists()).toBe(true);
    await wrapper.setProps({ loadingValue: false });

    expect(spanList[0].find('.m-loading').exists()).toBe(false);
    expect(spanList[1].find('.m-loading').exists()).toBe(true);

    wrapper.unmount();
  });
});
