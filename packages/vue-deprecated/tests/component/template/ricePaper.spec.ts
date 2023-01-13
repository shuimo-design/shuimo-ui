/**
 * @description 宣纸组件测试用例
 * @author 阿怪
 * @date 2022/7/15 00:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MRicePaper from '../../../lib/template/ricePaper/MRicePaper';

describe('宣纸组件', () => {
  test('无参数渲染', () => {
    const wrapper = mount(MRicePaper, {
      slots: {
        default: '<div>测试</div>'
      }
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-rice-paper\\">
        <div class=\\"m-rice-paper-mountain\\"></div>
        <div class=\\"m-rice-paper-crane\\"></div>
        <div class=\\"m-rice-paper-main\\">
          <div>测试</div>
        </div>
      </div>"
    `);
  });

  test('隐藏山脉和仙鹤', () => {
    const wrapper = mount(MRicePaper, {
      props: {
        mountain: false,
        crane: false
      },
      slots: {
        default: '<div>测试</div>'
      }
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-rice-paper\\">
        <!---->
        <!---->
        <div class=\\"m-rice-paper-main\\">
          <div>测试</div>
        </div>
      </div>"
    `);
  });

  test('使用暖色调', () => {
    const wrapper = mount(MRicePaper, {
      props: {
        cold: false
      },
      slots: {
        default: '<div>测试</div>'
      }
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-rice-paper m-rice-paper-warm\\">
        <div class=\\"m-rice-paper-mountain\\"></div>
        <div class=\\"m-rice-paper-crane\\"></div>
        <div class=\\"m-rice-paper-main\\">
          <div>测试</div>
        </div>
      </div>"
    `);
  });
});
