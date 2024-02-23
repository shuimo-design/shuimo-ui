/**
 * @description tree component test
 * @author 阿怪
 * @date 2024/2/23 18:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';

import { mount } from '@vue/test-utils';
import MTree from '../../../components/base/tree/MTree.tsx';

describe('tree', () => {

  test('render', () => {
    const wrapper = mount(MTree);
    expect(wrapper.html()).toContain('<div class="m-tree');
  });

});
