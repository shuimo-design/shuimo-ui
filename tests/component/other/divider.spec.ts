/**
 * @description 分割线测试用例
 * @author 阿怪
 * @date 2021/2/23 4:14 下午
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */

import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import MDivider from '../../../lib/other/divider/MDivider';

describe('分割线组件', function () {
  test('无参数渲染', () => {
    const wrapper = mount(MDivider);
    expect(wrapper.html()).toContain('m-divider');
  });
});
