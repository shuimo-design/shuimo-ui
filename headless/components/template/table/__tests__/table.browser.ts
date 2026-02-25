/**
 * @description headless table 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MTable from '../MTable';
import MTableColumn from '../../tableColumn/MTableColumn';

const tableData = [
  { name: '张三', age: 28 },
  { name: '李四', age: 32 },
];

describe('MTable browser', () => {

  // --- 基础渲染 ---
  it('渲染基本表格', async () => {
    const { container } = render(MTable, {
      props: { data: tableData },
      slots: {
        default: () => [
          h(MTableColumn, { param: 'name', label: '姓名' }),
          h(MTableColumn, { param: 'age', label: '年龄' }),
        ],
      },
    });

    // 外层容器和 table 元素存在
    expect(container.querySelector('.m-table')).not.toBeNull();
    expect(container.querySelector('.m-table-inner')).not.toBeNull();

    // thead 渲染正确
    const thead = container.querySelector('.m-thead');
    expect(thead).not.toBeNull();
    const ths = thead!.querySelectorAll('th');
    expect(ths.length).toBe(2);
    expect(ths[0].textContent).toBe('姓名');
    expect(ths[1].textContent).toBe('年龄');

    // tbody 渲染正确
    const tbody = container.querySelector('.m-tbody');
    expect(tbody).not.toBeNull();
    const rows = tbody!.querySelectorAll('tr.m-tr');
    expect(rows.length).toBe(2);

    // 第一行单元格内容
    const firstRowCells = rows[0].querySelectorAll('td.m-td');
    expect(firstRowCells.length).toBe(2);
    expect(firstRowCells[0].textContent).toBe('张三');
    expect(firstRowCells[1].textContent).toBe('28');

    // 第二行单元格内容
    const secondRowCells = rows[1].querySelectorAll('td.m-td');
    expect(secondRowCells[0].textContent).toBe('李四');
    expect(secondRowCells[1].textContent).toBe('32');
  });

  // --- 空数据占位 ---
  it('空数据显示占位', async () => {
    const { container } = render(MTable, {
      props: { data: [] },
      slots: {
        default: () => [
          h(MTableColumn, { param: 'name', label: '姓名' }),
        ],
      },
    });

    // 不渲染 tbody，而是渲染 empty 占位
    expect(container.querySelector('.m-tbody')).toBeNull();

    const empty = container.querySelector('.m-table-empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('暂无数据');
  });

  // --- 自定义列插槽 ---
  it('自定义列插槽渲染自定义内容', async () => {
    const { container } = render(MTable, {
      props: { data: tableData },
      slots: {
        default: () => [
          h(MTableColumn, { param: 'name', label: '姓名' }),
          h(
            MTableColumn,
            { param: 'age', label: '年龄' },
            {
              // 自定义 body 插槽：用括号包裹年龄（data 是整行数据对象）
              default: ({ data }: { data: Record<string, unknown> }) => h('span', { class: 'custom-age' }, `(${data.age})`),
            },
          ),
        ],
      },
    });

    const tbody = container.querySelector('.m-tbody');
    expect(tbody).not.toBeNull();

    // 自定义插槽内容应出现在 td 中
    const customCells = tbody!.querySelectorAll('span.custom-age');
    expect(customCells.length).toBe(2);
    expect(customCells[0].textContent).toBe('(28)');
    expect(customCells[1].textContent).toBe('(32)');
  });

  // --- paramClass ---
  it('paramClass 自动添加列 class', async () => {
    const { container } = render(MTable, {
      props: { data: tableData, paramClass: true },
      slots: {
        default: () => [
          h(MTableColumn, { param: 'name', label: '姓名' }),
          h(MTableColumn, { param: 'age', label: '年龄' }),
        ],
      },
    });

    // th 应附加 m-th-{param} class
    const thead = container.querySelector('.m-thead');
    expect(thead!.querySelector('.m-th-name')).not.toBeNull();
    expect(thead!.querySelector('.m-th-age')).not.toBeNull();

    // td 应附加 m-td-{param} class
    const tbody = container.querySelector('.m-tbody');
    const firstRow = tbody!.querySelector('tr.m-tr');
    expect(firstRow!.querySelector('.m-td-name')).not.toBeNull();
    expect(firstRow!.querySelector('.m-td-age')).not.toBeNull();
  });

});
