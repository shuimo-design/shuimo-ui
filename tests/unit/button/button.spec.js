/**
 * @description: button按钮测试用例
 * @author: 南歌子
 * @date 2021/02/22 11:44
 * @version V1.0.0
 *
 * Hello, humor
 */

import {mount} from '@vue/test-utils';
import WButton from '../../../lib/button/WButton.vue';

describe('按钮组件', () => {
  test('无参数渲染', () => {
    const wrapper = mount(WButton);
    expect(wrapper.html()).toContain('w-button');
  });

  test('测试text参数', () => {
    const wrapper = mount(WButton, {
      props: {
        text: 'test'
      }
    });
    expect(wrapper.text()).toContain('test');
  });

  test('测试type参数', () => {
    const wrapper = mount(WButton, {
      props: {
        type: 'gray'
      }
    });
    expect(wrapper.html()).toContain('w-button-gray');
  });
})
