/**
 * @description progress滚动条测试用例
 * @author 阿怪
 * @date 2021/2/25 4:06 下午
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */

import { mount } from '@vue/test-utils'
import { describe, test, expect } from "vitest";
import MProgress from "../../../lib/other/progress/MProgress";

describe('滚动条组件', () => {

  test('无参数渲染', () => {
    const wrapper = mount(MProgress);
    expect(wrapper.html()).toContain('m-progress');
  });

})
