/**
 * @description 数字输入框测试用例
 * @author 阿怪
 * @date 2022/4/30 10:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import WInputNumber from "../../../lib/base/inputNumber/WInputNumber";

describe('数字输入组件', () => {

  test('无参数渲染', () => {
    const wrapper = mount(WInputNumber);
    expect(wrapper.html()).toContain('w-input-number');
  });

  // todo 重构inputNumber组件后再测试这个用例
  test.skip('传递默认值', () => {
    const wrapper = mount(WInputNumber, {
      props: { modelValue: 5 }
    });
    expect(wrapper.element.querySelector('input')!.value).toBe(5);
  });

  test('修改默认值', async () => {
    const wrapper = mount(WInputNumber, {
      props: { modelValue: 5 }
    });
    await wrapper.setProps({ modelValue: 8 });
    expect(wrapper.element.querySelector('input')!.value).toBe('8');
  });

  test('设置最大值', async () => {
    const wrapper = mount(WInputNumber, {
      props: { modelValue: 5, max: 10 }
    });

    await wrapper.find('input').setValue(22);

    expect(wrapper.element.querySelector('input')!.value).toBe('10');
  });

  test('设置最小值', async () => {
    const wrapper = mount(WInputNumber, {
      props: { modelValue: 5, min: 4 }
    });

    await wrapper.find('input').setValue(3);

    expect(wrapper.element.querySelector('input')!.value).toBe('4');
  });
})
