/**
 * @Description: input输入框测试用例
 * @Author: 菩萨蛮
 * @Date: 2021/2/12 9:45 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

import {mount} from '@vue/test-utils'
import WInput from '../../../lib/input/WInput.vue';

describe('输入组件', () => {

  test('无参数渲染', () => {
    const wrapper = mount(WInput);
    expect(wrapper.html()).toContain('w-input');
  });

  test('测试参数', () => {
    const wrapper = mount(WInput, {
      props: {
        modelValue: 'test'
      }
    });
    expect(wrapper.get('input').element.value).toContain('test');
  })
})


