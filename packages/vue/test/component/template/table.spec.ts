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
import { Slot } from '@vue/test-utils/dist/types';
import { MTable, MTableColumn } from '../../../index';
import { TableProps } from '@shuimo-design/core/lib/template/table';

describe('table', function () {
  const getWrapper = (props?: TableProps, slots?: Record<string, Slot>) => {
    return mount(MTable, { props, slots });
  };

  test('render', () => {
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
        </div>
        <div class=\\"m-table-border-img-bottom\\"></div>
      </div>"
    `);
  });

  test('list slot', () => {
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
        </div>
        <div class=\\"m-table-border-img-bottom\\"></div>
      </div>"
    `);
  });

  test('head slot', () => {
    const wrapper = getWrapper(
      { data: [{ param: 'hi' }] },
      {
        default: [
          h(MTableColumn,
            { param: 'param', label: 'label' },
            { head: () => {return h('div', {}, `head slot`);} }
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
                <th class=\\"m-th\\">
                  <div>head slot</div>
                </th>
              </tr>
            </thead>
            <tbody class=\\"m-tbody\\">
              <tr class=\\"m-tr\\">
                <td class=\\"m-td\\">hi</td>
                <td class=\\"m-table-tbody-img\\"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class=\\"m-table-border-img-bottom\\"></div>
      </div>"
    `);
  });

  test('slot use data', () => {
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
        </div>
        <div class=\\"m-table-border-img-bottom\\"></div>
      </div>"
    `);
  });

  test('v-for column', () => {
    const wrapper = mount({
      components: { MTable, MTableColumn },
      setup() {
        const columns = [
          { param: 'id', label: 'id' },
          { param: 'param', label: 'param' }
        ];
        const data = [
          { id: 1, param: '立春' },
          { id: 2, param: '雨水' }
        ];
        return { columns, data };
      },
      template: `
        <MTable :data="data">
          <MTableColumn v-for="column in columns" :key="column.param" :param="column.param" :label="column.label"/>
        </MTable>
      `
    });
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
        </div>
        <div class=\\"m-table-border-img-bottom\\"></div>
      </div>"
    `);
  });

  test('skip comment', () => {
    const wrapper = mount({
      components: { MTable, MTableColumn },
      template: `
        <MTable>
        <MTableColumn param="param" label="label"></MTableColumn>
        <!-- <MTableColumn param="id" label="id"></MTableColumn> -->
        </MTable>`
    });
    expect(wrapper.html()).not.contains('id');
  });

  describe('no data', function () {
    test('default', () => {
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
              <tbody class=\\"m-table-empty\\">
                <tr>
                  <th colspan=\\"1\\">暂无数据</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class=\\"m-table-border-img-bottom\\"></div>
        </div>"
      `);
    });

    test('use empty slot', () => {
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
              <tbody class=\\"m-table-empty\\">
                <tr>
                  <th colspan=\\"1\\">
                    <div>无数据slot</div>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class=\\"m-table-border-img-bottom\\"></div>
        </div>"
      `);
    });

    test('without data', () => {
      const wrapper = getWrapper();
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"m-table\\">
          <div class=\\"m-table-header-img-top\\"></div>
          <div class=\\"m-table-header-img-bottom\\"></div>
          <div class=\\"m-table-wrap\\">
            <table class=\\"m-table-inner\\">
              <thead class=\\"m-thead\\">
                <tr class=\\"m-tr\\"></tr>
              </thead>
              <tbody class=\\"m-table-empty\\">
                <tr>
                  <th colspan=\\"0\\">暂无数据</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class=\\"m-table-border-img-bottom\\"></div>
        </div>"
      `);
    });
  });

  describe('error', function () {


    test('The child node in the list is not m-table-column', () => {
      const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      getWrapper({ data: [] }, { default: () => h('div', 'hello') });
      expect(infoSpy).toHaveBeenCalled();
    });

    test('The child node in the list is not m-table-column but undefined', () => {
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
              <tbody class=\\"m-table-empty\\">
                <tr>
                  <th colspan=\\"0\\">暂无数据</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class=\\"m-table-border-img-bottom\\"></div>
        </div>"
      `);
    });

    test('The child node in the list lacks the props attribute', () => {
      const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      getWrapper({ data: [] }, { default: [h(MTableColumn)] });
      expect(infoSpy).toHaveBeenCalled();
    });


    test('table column children is array', () => {
      const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mount(MTable, {
        slots: {
          default: [
            h(MTableColumn, { param: 'param' }, [h('div')])
          ]
        }
      });
      expect(infoSpy).toHaveBeenCalled();
    });

  });
});
