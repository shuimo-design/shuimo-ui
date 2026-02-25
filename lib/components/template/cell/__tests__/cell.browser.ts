/**
 * @description lib cell 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MCell from '../MCell';

describe('MCell browser', () => {
  it('渲染单元格', async () => {
    const { container } = render(MCell, {
      slots: {
        default: () => '单元格内容',
      },
    });

    expect(container.querySelector('.m-cell')).not.toBeNull();
  });

  it('渲染 slot 内容', async () => {
    const { container } = render(MCell, {
      slots: {
        default: () => '测试内容',
      },
    });

    const cell = container.querySelector('.m-cell');
    expect(cell).not.toBeNull();
    expect(cell!.textContent).toContain('测试内容');
  });

  it('渲染带尺寸的单元格', async () => {
    const { container } = render(MCell, {
      props: { w: 100, h: 50 },
      slots: {
        default: () => '尺寸单元格',
      },
    });

    const cell = container.querySelector('.m-cell') as HTMLElement;
    expect(cell).not.toBeNull();
  });
});
