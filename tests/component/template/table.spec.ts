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
import MTable from "../../../lib/template/table/MTable";
import MTableColumn from "../../../lib/template/table/MTableColumn";

describe('列表组件', function () {
  test('普通渲染', () => {
    const wrapper = mount(MTable, {
      slots: {
        default: [
          h(MTableColumn, { param: 'param', label: 'label' })
        ]
      }
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-table\\">
        <div class=\\"m-table-header-img-top\\"></div>
        <div class=\\"m-table-header-img-bottom\\"></div>
        <div class=\\"m-table-wrap\\">
          <table class=\\"m-table-inner\\">
            <thead class=\\"m-thead\\">
              <tr class=\\"m-tr\\">
                <th class=\\"m-th\\">label</th>
              </tr>
            </thead>
            <tbody class=\\"m-tbody\\"></tbody>
          </table>
        </div>
        <div class=\\"m-table-border-img-bottom\\"></div>
      </div>"
    `);
  })
});
