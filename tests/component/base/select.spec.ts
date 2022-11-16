/**
 * @description: select选择框测试用例
 * @author: 南歌子
 * @date 2021/02/23 11:11
 * @version v1.0.1
 *
 * Hello, humor
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */

import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import MSelect from '../../../lib/base/select/MSelect';
import { SelectProps } from '../../../lib/base/select';
import { h } from 'vue';
import { Slot } from '@vue/test-utils/dist/types';
import MPopover from '../../../lib/message/popover/MPopover';

describe('选择框组件', () => {
  const getWrapper = (props?: SelectProps, slots?: Record<string, Slot>) => {
    return mount(MSelect, { props, slots });
  };

  test('无参数渲染)', () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toContain('m-select');
    wrapper.unmount();
  });

  const baseProps = {
    modelValue: 1,
    options: [1, 2, 3, 4]
  };

  type OptionType = { title: string; value: number; inputParam: string; value2: number };

  const options: OptionType[] = [
    { title: 'option1', value: 1, inputParam: 'input1', value2: 4 },
    { title: 'option2', value: 2, inputParam: 'input2', value2: 5 },
    { title: 'option3', value: 3, inputParam: 'input3', value2: 6 },
    { title: 'option4', value: 4, inputParam: 'input4', value2: 7 }
  ];

  describe('参数相关测试用例', () => {
    test('仅modelValue和options参数渲染（即最佳实践）', async () => {
      const wrapper = getWrapper(baseProps);
      expect(wrapper.element.querySelector('input')!.value).toBe('1');
    });

    test('修改modelValue', async () => {
      const wrapper = getWrapper(baseProps);
      expect(wrapper.element.querySelector('input')!.value).toBe('1');
      await wrapper.setProps({ modelValue: 2 });
      expect(wrapper.element.querySelector('input')!.value).toBe('2');
    });

    test('指定输入框渲染param', () => {
      const wrapper = getWrapper({
        modelValue: options[0],
        options,
        inputParam: 'inputParam'
      });
      expect(wrapper.element.querySelector('input')!.value).toMatchInlineSnapshot('"input1"');
    });

    test('指定对象框渲染param', () => {
      const wrapper = getWrapper({
        modelValue: options[0],
        options,
        inputParam: 'inputParam',
        optionParam: 'title'
      });

      expect(wrapper.findAll('.m-option').map(e => e.element.innerHTML)).toMatchInlineSnapshot(`
        [
          "option1",
          "option2",
          "option3",
          "option4",
        ]
      `);
    });

    test('指定参数param', async () => {
      const wrapper = getWrapper({
        modelValue: undefined,
        options,
        inputParam: 'inputParam',
        valueParam: 'value'
      });

      await wrapper.find('.m-option').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toMatchObject([[1]]);
    });

    test('修改参数param', async () => {
      const wrapper = getWrapper({
        modelValue: undefined,
        options,
        inputParam: 'inputParam',
        valueParam: 'value'
      });

      await wrapper.setProps({ valueParam: 'value2' });
      await wrapper.find('.m-option').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toMatchObject([[4]]);
    });

    test('开启为可输入模式', () => {
      const wrapper = getWrapper({
        ...baseProps,
        inputReadonly: false
      });
      expect(wrapper.find('input').attributes().readonly).toBeUndefined();
    });

    test('禁用模式', () => {
      const wrapper = getWrapper({
        ...baseProps,
        disabled: true
      });
      expect(wrapper.find('input').attributes().disabled).not.toBeUndefined();
    });

    test('placeholder', () => {
      const placeholder = 'here is placeholder';
      const wrapper = getWrapper({
        ...baseProps,
        placeholder
      });
      expect(wrapper.find('input').attributes().placeholder).toBe(placeholder);
    });

    test('toMatch功能测试', () => {
      const wrapper = getWrapper({
        modelValue: options[0],
        options,
        inputParam: 'value',
        optionParam: 'title',
        toMatch: (option: OptionType, value: OptionType) => {
          return value.value === option.value && value.value2 === option.value2;
        }
      });
      expect(wrapper.find('.m-option-selected').element).toMatchInlineSnapshot(`
        <div
          class="m-option m-option-selected"
        >
          option1
        </div>
      `);
    });
  });

  describe('slot测试', () => {
    test('slot覆盖optionParam', () => {
      const wrapper = getWrapper(
        {
          modelValue: options[0],
          options,
          inputParam: 'inputParam',
          optionParam: 'title'
        },
        {
          option: ({ option }) => h('span', option.value2)
        }
      );

      expect(wrapper.findAll('.m-option').map(e => e.element.innerHTML)).toMatchInlineSnapshot(`
        [
          "<span>4</span>",
          "<span>5</span>",
          "<span>6</span>",
          "<span>7</span>",
        ]
      `);
    });
  });

  describe('事件相关测试用例', () => {
    test('点击打开下拉框', async () => {
      const wrapper = getWrapper(baseProps);
      expect(wrapper.findComponent(MPopover).props('show')).toMatchInlineSnapshot('false');
      await wrapper.find('input').trigger('click');
      expect(wrapper.findComponent(MPopover).props('show')).toMatchInlineSnapshot('true');
    });

    test('输入冒泡', async () => {
      const wrapper = getWrapper(baseProps);
      await wrapper.find('input').setValue(2);
      expect(wrapper.emitted('input')!.length).toBe(1);
    });

    describe('focus冒泡', async () => {
      test('普通场景无冒泡', async () => {
        const wrapper = getWrapper(baseProps);
        await wrapper.find('input').trigger('focus');
        expect(wrapper.emitted('focus')).toBeUndefined();
      });

      test('可输入场景可以冒泡', async () => {
        const wrapper = getWrapper({ ...baseProps, inputReadonly: false });
        await wrapper.find('input').trigger('focus');
        expect(wrapper.emitted('focus')!.length).toBe(1);
      });
    });

    test('选择冒泡', async () => {
      const wrapper = getWrapper({
        modelValue: options[1],
        options,
        inputParam: 'inputParam',
        optionParam: 'title'
      });
      await wrapper.find('.m-option').trigger('click');
      expect(wrapper.emitted()['select'][0]).toMatchInlineSnapshot(`
        [
          {
            "inputParam": "input1",
            "title": "option1",
            "value": 1,
            "value2": 4,
          },
        ]
      `);
    });

    test.skip('查询用冒泡');
  });
});
