/**
 * @description lib table 浏览器测试
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
  it('渲染表格', async () => {
    const { container } = render(MTable, {
      props: { data: tableData },
      slots: {
        default: () => [
          h(MTableColumn, { param: 'name', label: '姓名' }),
          h(MTableColumn, { param: 'age', label: '年龄' }),
        ],
      },
    });

    expect(container.querySelector('.m-table')).not.toBeNull();
  });

  it('渲染数据行', async () => {
    const { container } = render(MTable, {
      props: { data: tableData },
      slots: {
        default: () => [
          h(MTableColumn, { param: 'name', label: '姓名' }),
          h(MTableColumn, { param: 'age', label: '年龄' }),
        ],
      },
    });

    // 表头
    const thead = container.querySelector('.m-thead');
    expect(thead).not.toBeNull();
    const ths = thead!.querySelectorAll('th');
    expect(ths.length).toBe(2);
    expect(ths[0].textContent).toBe('姓名');

    // 数据行
    const tbody = container.querySelector('.m-tbody');
    expect(tbody).not.toBeNull();
    const rows = tbody!.querySelectorAll('tr.m-tr');
    expect(rows.length).toBe(2);
  });

  it('空数据显示占位', async () => {
    const { container } = render(MTable, {
      props: { data: [] },
      slots: {
        default: () => [
          h(MTableColumn, { param: 'name', label: '姓名' }),
        ],
      },
    });

    const empty = container.querySelector('.m-table-empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('暂无数据');
  });
});
