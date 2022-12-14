/**
 * @description 列表组件测试用例
 * @author 阿怪
 * @date 2022/5/2 06:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test, vi } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import MTable from '../../../../lib/template/table/MTable';
import MTableColumn from '../../../../lib/template/table/MTableColumn';
import { TableProps } from '../../../../lib/template/table';
import { Slot } from '@vue/test-utils/dist/types';
import VForTableColumn from './demo/VForTableColumn.vue';

describe('列表组件', function () {
  const getWrapper = (props?: TableProps, slots?: Record<string, Slot>) => {
    return mount(MTable, { props, slots });
  };

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
  });

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
                return h('div', {}, `slot数据：${data.data.param}`);
              }
            }
          )
        ]
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
  });

  test('slot传递参数', () => {
    const wrapper = getWrapper(
      {
        data: [{ slotInfo: 'hi' }, { slotInfo: 'hello' }]
      },
      {
        default: [
          h(
            MTableColumn,
            {
              param: 'slotInfo',
              label: 'label'
            },
            {
              default: (data: { data: any; index: number }) =>
                h('span', `slot数据：${data.data.slotInfo}, index:${data.index}`)
            }
          )
        ]
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
                <td class=\\"m-td\\"><span>slot数据：hi, index:0</span></td>
                <td class=\\"m-table-tbody-img\\"></td>
              </tr>
              <tr class=\\"m-tr\\">
                <td class=\\"m-td\\"><span>slot数据：hello, index:1</span></td>
                <td class=\\"m-table-tbody-img\\"></td>
              </tr>
            </tbody>
          </table>
          <!---->
        </div>
        <div class=\\"m-table-border-img-bottom\\"></div>
      </div>"
    `);
  });

  test('v-for渲染column', () => {
    const wrapper = mount(VForTableColumn);
    expect(wrapper.html()).toMatchInlineSnapshot(`
    "<div class=\\"m-table\\">
      <div class=\\"m-table-header-img-top\\"></div>
      <div class=\\"m-table-header-img-bottom\\"></div>
      <div class=\\"m-table-wrap\\">
        <table class=\\"m-table-inner\\">
          <thead class=\\"m-thead\\">
            <tr class=\\"m-tr\\">
              <th class=\\"m-th\\">id</th>
              <th class=\\"m-th\\">param</th>
            </tr>
          </thead>
          <tbody class=\\"m-tbody\\">
            <tr class=\\"m-tr\\">
              <td class=\\"m-td\\">1</td>
              <td class=\\"m-td\\">立春</td>
              <td class=\\"m-table-tbody-img\\"></td>
            </tr>
            <tr class=\\"m-tr\\">
              <td class=\\"m-td\\">2</td>
              <td class=\\"m-td\\">雨水</td>
              <td class=\\"m-table-tbody-img\\"></td>
            </tr>
          </tbody>
        </table>
        <!---->
      </div>
      <div class=\\"m-table-border-img-bottom\\"></div>
    </div>"
  `);
  });

  describe('无数据状态', function () {
    test('无slot', () => {
      const wrapper = getWrapper({ data: [] }, { default: [h(MTableColumn, { param: 'param', label: 'label' })] });
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
    });

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
      `);
    });
  });

  describe('异常状态', function () {
    test('未传列表', () => {
      const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      getWrapper();
      expect(infoSpy).toHaveBeenCalled();
    });

    test('列表中子节点不是m-table-column', () => {
      const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      getWrapper({ data: [] }, { default: () => h('div', 'hello') });
      expect(infoSpy).toHaveBeenCalled();
    });

    test('列表中子节点不是m-table-column但是是undefined', () => {
      const wrapper = getWrapper({ data: [] }, { default: () => undefined });
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"m-table\\">
          <div class=\\"m-table-header-img-top\\"></div>
          <div class=\\"m-table-header-img-bottom\\"></div>
          <div class=\\"m-table-wrap\\">
            <table class=\\"m-table-inner\\">
              <thead class=\\"m-thead\\">
                <tr class=\\"m-tr\\"></tr>
              </thead>
              <tbody class=\\"m-tbody\\"></tbody>
            </table>
            <div class=\\"m-table-empty\\">暂无数据</div>
          </div>
          <div class=\\"m-table-border-img-bottom\\"></div>
        </div>"
      `);
    });

    test('列表中子节点缺少props属性', () => {
      const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      getWrapper({ data: [] }, { default: [h(MTableColumn)] });
      expect(infoSpy).toHaveBeenCalled();
    });
  });
});
