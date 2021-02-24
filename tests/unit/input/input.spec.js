/**
 * @Description: input输入框测试用例
 * @Author: 菩萨蛮
 * @Date: 2021/2/12 9:45 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

import { mount } from '@vue/test-utils'
import WInput from '../../../lib/input/WInput.vue';

describe('输入组件', () => {

  test('无参数渲染', () => {
    const wrapper = mount(WInput);
    expect(wrapper.html()).toContain('w-input');
  });

  test('传递默认值', () => {
    const wrapper = mount(WInput, {
      props: { modelValue: 'test' }
    });
    expect(wrapper.get('input').element.value).toBe('test');
  });

  test('校验placeholder', () => {
    const wrapper = mount(WInput, {
      props: { placeholder: 'test placeholder' }
    });
    expect(wrapper.get('input').element.placeholder).toBe('test placeholder');
  });

  test('修改默认值', async () => {
    const wrapper = mount(WInput, {
      props: { modelValue: 'test' }
    });
    await wrapper.setProps({ modelValue: 'hi' });
    expect(wrapper.get('input').element.value).toContain('hi');
  })

  test('测试类型为多文本输入框', () => {
    const wrapper = mount(WInput, {
      props: {
        type: 'textarea'
      }
    });
    expect(wrapper.find('input').exists()).toBe(false);
    expect(wrapper.get('textarea').element.value).toBe('');
  })
})


