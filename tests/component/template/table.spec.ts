/**
 * @description 列表组件测试用例
 * @author 阿怪
 * @date 2022/5/2 06:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect } from 'vitest';
import { h } from "vue";
import { mount } from "@vue/test-utils";
import WTable from "../../../lib/template/table/WTable";
import WTableColumn from "../../../lib/template/table/WTableColumn";

describe('列表组件', function () {
  test('普通渲染', () => {
    const wrapper = mount(WTable, {
      slots: {
        default: [
          h(WTableColumn, { param: 'param', label: 'label' })
        ]
      }
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"w-table\\">
        <div class=\\"w-table-header-img-top\\"></div>
        <div class=\\"w-table-header-img-bottom\\"></div>
        <div class=\\"w-table-wrap\\">
          <table class=\\"w-table-inner\\">
            <thead class=\\"w-thead\\">
              <tr class=\\"w-tr\\">
                <th class=\\"w-th\\">label</th>
              </tr>
            </thead>
            <tbody class=\\"w-tbody\\"></tbody>
          </table>
        </div>
        <div class=\\"w-table-border-img-bottom\\"></div>
      </div>"
    `);
  })
});
