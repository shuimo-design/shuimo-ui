/**
 * @description collapse test
 * @author 阿怪
 * @date 2025/02/17 20:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { MCollapse } from '../../../index';

describe('collapse', () => {
  describe('props', () => {
    test('basic render', () => {
      const wrapper = mount(MCollapse, {
        slots: {
          default: '标题',
          content: '内容',
        },
      });
      expect(wrapper.find('.m-collapse-header').exists()).toBe(true);
      expect(wrapper.find('.m-collapse-arrow').exists()).toBe(true);
      expect(wrapper.text()).toContain('标题');
    });

    test('custom class', () => {
      const wrapper = mount(MCollapse, {
        props: {
          class: 'custom-class',
        },
      });
      expect(wrapper.classes()).toContain('custom-class');
    });

    test('model value', async () => {
      const wrapper = mount(MCollapse, {
        props: {
          modelValue: true,
        },
        slots: {
          default: '标题',
          content: '内容区域',
        },
      });

      console.log(wrapper.html());

      // 展开状态下应该显示内容
      expect(wrapper.text()).toContain('内容区域');

      // 关闭状态下不应该显示内容
      await wrapper.setProps({ modelValue: false });
      expect(wrapper.text()).not.toContain('内容区域');
    });

    test('disabled state', () => {
      const wrapper = mount(MCollapse, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.classes()).toContain('m-collapse-disabled');
    });
  });

  describe('events', () => {
    test('click toggle', async () => {
      const wrapper = mount(MCollapse, {
        props: {
          modelValue: false,
        },
        slots: {
          default: '标题',
          content: '内容',
        },
      });

      // 测试点击切换状态
      await wrapper.find('.m-collapse-header').trigger('click');
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true]);
    });

    test('disabled click', async () => {
      const wrapper = mount(MCollapse, {
        props: {
          disabled: true,
        },
      });

      // 测试禁用状态下的点击
      await wrapper.find('.m-collapse-header').trigger('click');
      expect(wrapper.emitted()['update:modelValue']).toBeFalsy();
    });
  });
});
