/**
 * @description headless Grid 浏览器测试
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

describe('MGrid browser', () => {
  // --- 基础渲染 ---
  it('渲染 grid 容器', async () => {
    const { container } = render(MGrid);

    const grid = container.querySelector('.m-grid');
    expect(grid).not.toBeNull();
  });

  it('默认方向为 row，包含 m-grid-row 类', async () => {
    const { container } = render(MGrid, {
      props: {},
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    expect(grid.classList.contains('m-grid-row')).toBe(true);
  });

  // --- CSS 变量 ---
  it('设置 gap 属性时注入 --m-grid-gap CSS 变量', async () => {
    const { container } = render(MGrid, {
      props: { gap: 16 },
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    expect(grid.style.getPropertyValue('--m-grid-gap')).toBe('16px');
  });

  it('gap 为字符串时直接使用原值', async () => {
    const { container } = render(MGrid, {
      props: { gap: '1rem' },
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    expect(grid.style.getPropertyValue('--m-grid-gap')).toBe('1rem');
  });

  it('设置 colGap 注入 --m-grid-col-gap CSS 变量', async () => {
    const { container } = render(MGrid, {
      props: { colGap: 24 },
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    expect(grid.style.getPropertyValue('--m-grid-col-gap')).toBe('24px');
  });

  it('设置 rowGap 注入 --m-grid-row-gap CSS 变量', async () => {
    const { container } = render(MGrid, {
      props: { rowGap: 8 },
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    expect(grid.style.getPropertyValue('--m-grid-row-gap')).toBe('8px');
  });

  // --- direction ---
  it('direction=column 时包含 m-grid-column 类', async () => {
    const { container } = render(MGrid, {
      props: { direction: 'column' },
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    expect(grid.classList.contains('m-grid-column')).toBe(true);
    expect(grid.classList.contains('m-grid-row')).toBe(false);
  });

  it('direction=row 时包含 m-grid-row 类', async () => {
    const { container } = render(MGrid, {
      props: { direction: 'row' },
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    expect(grid.classList.contains('m-grid-row')).toBe(true);
    expect(grid.classList.contains('m-grid-column')).toBe(false);
  });

  // --- 尺寸 ---
  it('设置 h 属性时内联 height 样式', async () => {
    const { container } = render(MGrid, {
      props: { h: 200 },
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    expect(grid.style.height).toBe('200px');
  });

  it('设置 w 属性时内联 width 样式', async () => {
    const { container } = render(MGrid, {
      props: { w: 300 },
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    expect(grid.style.width).toBe('300px');
  });

  // --- slot 内容 ---
  it('slot 内容正确渲染到 grid 容器内', async () => {
    const { container } = render(MGrid, {
      slots: {
        default: () => [
          h('div', { class: 'child-a' }, '子节点A'),
          h('div', { class: 'child-b' }, '子节点B'),
        ],
      },
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    expect(grid).not.toBeNull();

    const childA = grid.querySelector('.child-a');
    const childB = grid.querySelector('.child-b');
    expect(childA).not.toBeNull();
    expect(childB).not.toBeNull();
    expect(childA!.textContent).toBe('子节点A');
    expect(childB!.textContent).toBe('子节点B');
  });

  it('gap=0 时不注入 --m-grid-gap', async () => {
    const { container } = render(MGrid, {
      props: { gap: 0 },
    });

    const grid = container.querySelector('.m-grid') as HTMLElement;
    // gap 为 0 时不写入 CSS 变量
    expect(grid.style.getPropertyValue('--m-grid-gap')).toBe('');
  });
});
