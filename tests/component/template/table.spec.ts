/**
 * @description 列表组件测试用例
 * @author 阿怪
 * @date 2022/5/2 06:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test, vi } from 'vitest';
import { h } from "vue";
import { mount } from "@vue/test-utils";
import MTable from "../../../lib/template/table/MTable";
import MTableColumn from "../../../lib/template/table/MTableColumn";
import { TableProps } from "../../../lib/template/table";
import { Slot } from "@vue/test-utils/dist/types";

describe('列表组件', function () {

  const getWrapper = (props?: TableProps, slots?: Record<string, Slot>) => {
    return mount(MTable, { props, slots });
  }

  test('普通渲染', () => {
    const wrapper = getWrapper(
      { data: [{ param: 'hi' }] },
      { default: [h(MTableColumn, { param: 'param', label: 'label' })] }
    );
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
            <tbody class=\\"m-tbody\\">
              <tr class=\\"m-tr\\">
                <td class=\\"m-td\\">hi</td>
                <td class=\\"m-table-tbody-img\\"></td>
              </tr>
            </tbody>
          </table>
          <!---->
        </div>
        <div class=\\"m-table-border-img-bottom\\"></div>
      </div>"
    `);
  })

  test('列表slot', () => {
    const wrapper = getWrapper(
      { data: [{ param: 'hi' }] },
      {
        default: [
          h(
            MTableColumn,
            { param: 'param', label: 'label' },
            {
              default: (data: { data: { param: string } }) => {
                return h('div', {}, `slot数据：${data.data.param}`)
              }
            }
          )
        ],
      }
    );
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
            <tbody class=\\"m-tbody\\">
              <tr class=\\"m-tr\\">
                <td class=\\"m-td\\">
                  <div>slot数据：hi</div>
                </td>
                <td class=\\"m-table-tbody-img\\"></td>
              </tr>
            </tbody>
          </table>
          <!---->
        </div>
        <div class=\\"m-table-border-img-bottom\\"></div>
      </div>"
    `);
  })

  describe('无数据状态', function () {

    test('无slot', () => {
      const wrapper = getWrapper(
        { data: [] },
        { default: [h(MTableColumn, { param: 'param', label: 'label' })] }
      );
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
          <div class=\\"m-table-empty\\">暂无数据</div>
        </div>
        <div class=\\"m-table-border-img-bottom\\"></div>
      </div>"
    `);
    })

    test('提供slot', () => {
      const wrapper = getWrapper(
        { data: [] },
        {
          default: [h(MTableColumn, { param: 'param', label: 'label' })],
          empty: [h('div', {}, '无数据slot')]
        }
      );
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
            <div>无数据slot</div>
          </div>
          <div class=\\"m-table-border-img-bottom\\"></div>
        </div>"
      `)
    })

  });

  test('未传列表',()=>{
    const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const wrapper = getWrapper();
    expect(infoSpy).toHaveBeenCalled()
  })

});
