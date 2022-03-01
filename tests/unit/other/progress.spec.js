/**
 * @Description: progress滚动条测试用例
 * @Author: 阿怪
 * @Date: 2021/2/25 4:06 下午
 * @Version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */

import { mount } from '@vue/test-utils'
import { describe, test, expect } from "vitest";
import WProgress from "../../../lib/other/progress/WProgress";

describe('滚动条组件', () => {

  test('无参数渲染', () => {
    const wrapper = mount(WProgress);
    expect(wrapper.html()).toContain('w-progress');
  });

})
