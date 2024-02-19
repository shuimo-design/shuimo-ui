/**
 * @description avatar component test
 * @author 阿怪
 * @date 2023/5/8 23:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import MAvatar from '../../../components/base/avatar/MAvatar.tsx';

describe('avatar', () => {

  test('render', () => {
    const wrapper = mount(MAvatar);
    expect(wrapper.html()).toContain('<div class="m-avatar');
  });

});
