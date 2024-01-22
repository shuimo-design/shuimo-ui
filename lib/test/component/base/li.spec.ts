/**
 * @description li test
 * @author 阿怪
 * @date 2023/5/4 18:48
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import { MLi } from '../../../index.ts';

describe('li', () => {
  test('base render', () => {
    const wrapper = mount(MLi);
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<li class=\\"m-li\\">
        <!---->
      </li>"
    `);
  });

  test('active', () => {
    const wrapper = mount(MLi, {
      props: {
        active: true
      }
    });
    expect(wrapper.html()).toContain('m-li-active');
  });

  test('slot',()=>{
    const wrapper = mount(MLi, {
      slots: {
        default: 'test'
      }
    });
    expect(wrapper.html()).toContain('test');
  })
});
