/**
 * @description li test
 * @author 阿怪
 * @date 2023/5/4 18:48
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { MLi } from '../../../index.ts';

describe('li', () => {
  test('base render', () => {
    const wrapper = mount(MLi);
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<li class="m-li">
        <div class="m-marker">
          <div class="m-svg-icon m-marker" style="width: 27px; height: 27px;">
            <!----><svg xmlns="http://www.w3.org/2000/svg" width="10px" height="13px" class="m-svg-icon-inner" viewBox="0 0 34 34">
              <use href="#m-shuimo-svg-icon"></use>
            </svg>
          </div>
        </div>
        <div class="m-li-inner">
          <!---->
        </div>
      </li>"
    `);
  });

  test('active', () => {
    const wrapper = mount(MLi, {
      props: {
        active: true,
      },
    });
    expect(wrapper.html()).toContain('m-li-active');
  });

  test('slot', () => {
    const wrapper = mount(MLi, {
      slots: {
        default: 'test',
      },
    });
    expect(wrapper.html()).toContain('test');
  });
});
