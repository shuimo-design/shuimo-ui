/**
 * @description deleteIcon test
 * @author 阿怪
 * @date 2023/5/18 15:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test, vi } from 'vitest';
import { DOMWrapper, mount } from '@vue/test-utils';
import MDeleteIcon from '../../../lib/other/MDeleteIcon';

describe('deleteIcon', function () {

  test('render', () => {
    const wrapper = mount(MDeleteIcon);
    expect(wrapper.html()).toContain('<div class="m-delete-icon');
  });

  test('click event', async () => {
    const wrapper = mount(MDeleteIcon);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });

});
