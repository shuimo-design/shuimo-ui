/**
 * @description progress滚动条测试用例
 * @author 阿怪
 * @date 2021/2/25 4:06 下午
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */

import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { MProgress } from '../../../index.ts';
import { h } from 'vue';

describe('progress', () => {
  test('render', () => {
    const wrapper = mount(MProgress);
    expect(wrapper.html()).toContain('m-progress');
  });

  test('show info', () => {
    const wrapper = mount(MProgress, {
      props: { showInfo: true },
      slots: {
        default: h('span', 'default info'),
      },
    });
    expect(wrapper.html()).toContain('default info');
  });

  test('change size', () => {
    const wrapper = mount(MProgress, {
      props: { width: 123, height: 456 },
    });
    expect(wrapper.html()).toContain('--m-progress-width: 123px');
    expect(wrapper.html()).toContain('--m-progress-height: 456px');
  });
});
