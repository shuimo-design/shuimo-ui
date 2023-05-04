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
import { MRicePaper } from '../../../index';

describe('rice paper', () => {
  test('render', () => {
    const wrapper = mount(MRicePaper, {
      slots: {
        default: '<div>test</div>'
      }
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-rice-paper\\">
        <div class=\\"m-rice-paper-mountain\\"></div>
        <div class=\\"m-rice-paper-crane\\"></div>
        <div class=\\"m-rice-paper-main\\">
          <div>test</div>
        </div>
      </div>"
    `);
  });

  test('hidden mountains and cranes', () => {
    const wrapper = mount(MRicePaper, {
      props: {
        mountain: false,
        crane: false
      },
      slots: {
        default: '<div>test</div>'
      }
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-rice-paper\\">
        <!---->
        <!---->
        <div class=\\"m-rice-paper-main\\">
          <div>test</div>
        </div>
      </div>"
    `);
  });

  test('use warn', () => {
    const wrapper = mount(MRicePaper, {
      props: {
        cold: false
      },
      slots: {
        default: '<div>test</div>'
      }
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-rice-paper m-rice-paper-warm\\">
        <div class=\\"m-rice-paper-mountain\\"></div>
        <div class=\\"m-rice-paper-crane\\"></div>
        <div class=\\"m-rice-paper-main\\">
          <div>test</div>
        </div>
      </div>"
    `);
  });
});
