/**
 * @description 数字输入框测试用例
 * @author 阿怪
 * @date 2022/4/30 10:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MInputNumber from '../../../lib/base/inputNumber/MInputNumber';

describe('数字输入组件', () => {
  test('无参数渲染', () => {
    const wrapper = mount(MInputNumber, { modelValue: null });
    expect(wrapper.html()).toContain('m-input-number');
  });

  // 测试用例
  test.skip('传递默认值', () => {
    const wrapper = mount(MInputNumber, {
      props: { modelValue: '' }
    });
    expect(wrapper.element.querySelector('input')!.value).toBe('');
  });

  test('修改默认值', async () => {
    const wrapper = mount(MInputNumber, {
      props: { modelValue: 5 }
    });
    await wrapper.setProps({ modelValue: 8 });
    expect(wrapper.element.querySelector('input')!.value).toBe('8');
  });

  test('设置最大值', async () => {
    const wrapper = mount(MInputNumber, {
      props: { modelValue: 11, max: 10 }
    });

    await wrapper.find('input').setValue(11);

    expect(wrapper.element.querySelector('input')!.value).toBe('10');
  });

  test('设置最小值', async () => {
    const wrapper = mount(MInputNumber, {
      props: { modelValue: 5, min: 4 }
    });

    await wrapper.find('input').setValue(4);

    expect(wrapper.element.querySelector('input')!.value).toBe('4');
  });

  test('保留2位小数', async () => {
    const wrapper = mount(MInputNumber, {
      props: { modelValue: 5.545, precision: 2 }
    });

    await wrapper.find('input').setValue(5.545);

    expect(wrapper.element.querySelector('input')!.value).toBe('5.54');
  });



  test('输入负值', async () => {
    const wrapper = mount(MInputNumber, {
      props: { modelValue: 5, precision: 2 }
    });
    await wrapper.find('input').setValue(-12);
    expect(wrapper.element.querySelector('input')!.value).toBe('-12');
  });

  test('输入小数开头的值', async () => {
    const wrapper = mount(MInputNumber, {
      props: { modelValue: 5, precision: 2 }
    });
    await wrapper.find('input').setValue('.1');
    expect(wrapper.element.querySelector('input')!.value).toBe('0.1');
  });

});
