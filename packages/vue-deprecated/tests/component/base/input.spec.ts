/**
 * @description input输入框测试用例
 * @author 阿怪
 * @date 2021/2/12 9:45 下午
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */

import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import MInput from '../../../lib/base/input/MInput';

describe('输入组件', () => {
  test('无参数渲染', () => {
    const wrapper = mount(MInput);
    expect(wrapper.html()).toContain('m-input');
  });

  test('传递默认值', () => {
    const wrapper = mount(MInput, {
      props: { modelValue: 'test' }
    });
    expect(wrapper.element.querySelector('input')!.value).toBe('test');
  });

  test('校验placeholder', () => {
    const wrapper = mount(MInput, {
      props: { placeholder: 'test placeholder' }
    });
    expect(wrapper.element.querySelector('input')!.placeholder).toBe('test placeholder');
  });

  test('校验disabled', () => {
    const wrapper = mount(MInput, {
      props: { disabled: true }
    });
    expect(wrapper.element.querySelector('input')!.disabled).toBeTruthy();
  });

  test('校验readonly', () => {
    const wrapper = mount(MInput, {
      props: { readonly: true }
    });
    expect(wrapper.element.querySelector('input')!.readOnly).toBeTruthy();
  });

  test('修改默认值', async () => {
    const wrapper = mount(MInput, {
      props: { modelValue: 'test' }
    });
    await wrapper.setProps({ modelValue: 'hi' });
    expect(wrapper.element.querySelector('input')!.value).toContain('hi');
  });

  test('测试类型为多文本输入框', () => {
    const wrapper = mount(MInput, {
      props: {
        type: 'textarea'
      }
    });
    expect(wrapper.element.querySelector('input')).toBe(null);
    expect(wrapper.element.querySelector('textarea')!.value).toBe('');
  });

  test('focus冒泡', async () => {
    const wrapper = mount(MInput, { props: { modelValue: 'test' } });
    await wrapper.find('input').trigger('focus');
    expect(wrapper.emitted('focus')!.length).toBe(1);
  });
  test('blur冒泡', async () => {
    const wrapper = mount(MInput, { props: { modelValue: 'test' } });
    await wrapper.find('input').trigger('blur');
    expect(wrapper.emitted('blur')!.length).toBe(1);
  });
});
