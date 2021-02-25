/**
 * @Description: process滚动条测试用例
 * @Author: 菩萨蛮
 * @Date: 2021/2/25 4:06 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

import { mount } from '@vue/test-utils'
import WProcess from "../../../lib/process/WProcess";

describe('滚动条组件', () => {

  test('无参数渲染', () => {
    const wrapper = mount(WProcess);
    expect(wrapper.html()).toContain('w-process');
  });

})
