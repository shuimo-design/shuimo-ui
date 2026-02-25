/**
 * @description lib grid 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MGrid from '../MGrid';
import MCell from '../../cell/MCell';

describe('MGrid browser', () => {
  it('渲染栅格', async () => {
    const { container } = render(MGrid, {
      slots: {
        default: () => [
          h(MCell, {}, { default: () => '单元格1' }),
          h(MCell, {}, { default: () => '单元格2' }),
        ],
      },
    });

    expect(container.querySelector('.m-grid')).not.toBeNull();
  });

  it('渲染栅格中的单元格', async () => {
    const { container } = render(MGrid, {
      slots: {
        default: () => [
          h(MCell, {}, { default: () => '内容A' }),
          h(MCell, {}, { default: () => '内容B' }),
        ],
      },
    });

    const grid = container.querySelector('.m-grid');
    expect(grid).not.toBeNull();
    const cells = grid!.querySelectorAll('.m-cell');
    expect(cells.length).toBe(2);
  });
});
