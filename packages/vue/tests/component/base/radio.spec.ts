/**
 * @description radio测试用例
 * @author 阿怪
 * @date 2022/4/30 09:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect } from 'vitest';
import MRadio from '../../../lib/base/radio/MRadio';
import { mount } from '@vue/test-utils';

describe('单选组件', () => {
  test('正确渲染单选组件', () => {
    const wrapper = mount(MRadio);
    expect(wrapper.find('label').html()).toContain('m-radio');

    const wrapperWithValue = mount(MRadio, {
      props: {
        modelValue: 'labelValue',
        label: 'labelValue'
      }
    });
    expect(wrapperWithValue.find('label').html()).toContain('selected');
  });

  test('修改选项', async () => {
    const wrapper = mount(MRadio, {
      props: {
        modelValue: '',
        label: 'labelValue'
      }
    });
    expect(wrapper.find('label').html()).not.toContain('selected');
    await wrapper.setProps({
      modelValue: 'labelValue'
    });
    expect(wrapper.find('label').html()).toContain('selected');
  });

  test('点击更新', async () => {
    const wrapper = mount(MRadio, {
      props: {
        modelValue: '',
        label: 'labelValue'
      }
    });
    await wrapper.find('input').trigger('click');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['labelValue']);
  });
});
