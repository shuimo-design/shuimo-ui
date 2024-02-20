/**
 * @description input输入框测试用例
 * @author 阿怪
 * @date 2021/2/12 9:45 下午
 * @version v1.0.1
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 * -- revert from version 9f76444d --
 */

import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { MInput } from '../../../index.ts';

describe('input', () => {
  test('base render', () => {
    const wrapper = mount(MInput);
    expect(wrapper.html()).toContain('m-input');
  });


  test('type=textarea', () => {
    const wrapper = mount(MInput, {
      props: {
        type: 'textarea',
      },
    });
    expect(wrapper.element.querySelector('input')).toBe(null);
    expect(wrapper.element.querySelector('textarea')!.value).toBe('');
  });


  describe('props', function () {

    test('modelValue', () => {
      const wrapper = mount(MInput, {
        props: { modelValue: 'test' },
      });
      expect(wrapper.element.querySelector('input')!.value).toBe('test');
    });

    test('placeholder', () => {
      const wrapper = mount(MInput, {
        props: { placeholder: 'test placeholder' },
      });
      expect(wrapper.element.querySelector('input')!.placeholder).toBe('test placeholder');
    });

    test('disabled', () => {
      const wrapper = mount(MInput, {
        props: { disabled: true },
      });
      expect(wrapper.element.querySelector('input')!.disabled).toBeTruthy();
    });

    test('readonly', () => {
      const wrapper = mount(MInput, {
        props: { readonly: true },
      });
      expect(wrapper.element.querySelector('input')!.readOnly).toBeTruthy();
    });


    test('set modelValue', async () => {
      const wrapper = mount(MInput, {
        props: { modelValue: 'test' },
      });
      await wrapper.setProps({ modelValue: 'hi' });
      expect(wrapper.element.querySelector('input')!.value).toContain('hi');
    });

    test('autofocus', () => {
      const wrapper = mount(MInput, {
        props: { autofocus: true },
      });
      expect(wrapper.element.querySelector('input')!.autofocus).toBeTruthy();
    });

  });

  describe('event', () => {

    test('onInput', () => {
      const wrapper = mount(MInput);
      wrapper.find('input').setValue('test');
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test']);
      expect(wrapper.emitted('input')![0]).toEqual(['test']);
    });

    test('onFocus', async () => {
      const wrapper = mount(MInput, { props: { modelValue: 'test' } });
      await wrapper.find('input').trigger('focus');
      expect(wrapper.emitted('focus')!.length).toBe(1);
    });

    test('onBlur', async () => {
      const wrapper = mount(MInput, { props: { modelValue: 'test' } });
      await wrapper.find('input').trigger('blur');
      expect(wrapper.emitted('blur')!.length).toBe(1);
    });

  });


});
