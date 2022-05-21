/**
 * @description checkbox测试用例
 * @author 阿怪
 * @date 2022/5/1 19:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import WCheckbox from "../../../lib/base/checkbox/WCheckbox";
import WCheckboxGroup from "../../../lib/base/checkbox/WCheckboxGroup";
import { h, ref } from "vue";

describe('多选组件', () => {
  test('无参数渲染', () => {
    const wrapper = mount(WCheckbox);
    expect(wrapper.find('input').html()).toContain('type="checkbox"');
  });

  test('设置label', () => {
    const wrapper = mount(WCheckbox, {
      props: { label: '测试label' }
    });
    expect(wrapper.find('.w-checkbox__label').text()).toBe('测试label');
  });

  test('点击修改选中', async () => {
    const wrapper = mount(WCheckbox, {
      props: {
        label: '测试label',
        modelValue: false
      }
    });
    expect(wrapper.html()).not.toContain('w-checkbox__inner_checked');
    await wrapper.find('input[type=checkbox]').setValue(true);
    expect(wrapper.emitted('update:modelValue'))
      .toMatchObject([[true, { e: { isTrusted: false } }]])
  });

  test('使用slot', () => {
    const wrapper = mount(WCheckbox, {
      slots: {
        default: () => h('div', '测试slot')
      }
    })
    expect(wrapper.find('.w-checkbox__label').text()).toBe('测试slot');
  })
});


describe('伴随group', () => {
  const slotA = h(WCheckbox, { label: 'A', value: 'a' });
  const slotB = h(WCheckbox, { label: 'B', value: 'b' });
  const slotC = h(WCheckbox, { label: 'C', value: 'c' });
  const wrapper = mount(WCheckboxGroup, {
    props: { modelValue: ['a', 'c'] },
    slots: {
      default: [slotA, slotB, slotC]
    }
  });

  test('插槽渲染正确', () => {
    expect(wrapper.find('.w-checkbox-group').findAllComponents(WCheckbox).length).toBe(3);
  })

  test('选中两个参数a,c渲染', () => {
    const slots = wrapper.find('.w-checkbox-group').findAllComponents(WCheckbox);
    expect(slots[0].html()).toContain('w-checkbox__inner_checked');
    expect(slots[1].html()).not.toContain('w-checkbox__inner_checked');
    expect(slots[2].html()).toContain('w-checkbox__inner_checked');
  });

})
