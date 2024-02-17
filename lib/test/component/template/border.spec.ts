/**
 * @description 边框组件测试用例
 * @author 阿怪
 * @date 2022/5/2 10:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MBorder from '../../../components/template/border/MBorder.tsx';

describe('border', () => {
  test('render', () => {
    const wrapper = mount(MBorder, {
      slots: {
        default: '<div>test</div>'
      }
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="m-border">
        <div class="m-border-main">
          <div>test</div>
        </div>
        <div class="m-border-line m-border-top-line"></div>
        <div class="m-border-line m-border-left-line"></div>
        <div class="m-border-line m-border-right-line"></div>
        <div class="m-border-line m-border-bottom-line"></div>
      </div>"
    `);
  });
});
