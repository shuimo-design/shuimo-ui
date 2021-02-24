/**
 * @Description: 分割线测试用例
 * @Author: 菩萨蛮
 * @Date: 2021/2/23 4:14 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

import { mount } from '@vue/test-utils';
import WDivider from '../../../lib/divider';

describe('分割线组件', function () {
  test('无参数渲染', () => {
    const wrapper = mount(WDivider);
    expect(wrapper.html()).toContain('w-divider');
  })

  test('粗分割线渲染', () => {
    const wrapper = mount(WDivider, {
      props: {
        type: 'strong'
      }
    });
    expect(wrapper.get('img').html()).toContain('strong');
  })
});
