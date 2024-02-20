/**
 * @description 宣纸组件测试用例
 * @author 阿怪
 * @date 2022/7/15 00:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MRicePaper from '../../../components/template/ricePaper/MRicePaper.tsx';

describe('rice paper', () => {
  test('render', () => {
    const wrapper = mount(MRicePaper, {
      slots: {
        default: '<div>test</div>',
      },
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="m-rice-paper m-rice-paper-default">
        <div class="mountains">
          <div class="m-m-left">
            <div class="m-l-base m-m-reflect"></div>
            <div class="m-l-mid m-m-reflect"></div>
            <div class="m-l-front m-m-reflect"></div>
            <div class="m-l-front-2 m-m-reflect"></div>
          </div>
          <div class="m-m-right">
            <div class="m-r-base m-m-reflect"></div>
            <div class="m-r-mid m-m-reflect"></div>
            <div class="m-r-front m-m-reflect"></div>
            <div class="m-r-front-2 m-m-reflect"></div>
          </div>
        </div>
        <div class="m-rice-paper-hover"></div>
        <div class="m-rice-paper-layout">
          <div>test</div>
        </div>
      </div>"
    `);
  });
});
