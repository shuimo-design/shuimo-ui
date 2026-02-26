/**
 * @description headless space 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MSpace from '../MSpace';

describe('MSpace browser', () => {
  it('渲染 m-space 根元素', async () => {
    const { container } = render(MSpace, {
      slots: { default: () => [h('span', 'A'), h('span', 'B')] },
    });

    expect(container.querySelector('.m-space')).not.toBeNull();
  });

  it('子元素被 m-space-item 包裹', async () => {
    const { container } = render(MSpace, {
      slots: { default: () => [h('span', 'A'), h('span', 'B'), h('span', 'C')] },
    });

    const items = container.querySelectorAll('.m-space-item');
    expect(items.length).toBe(3);
  });

  it('默认方向为水平（flex-direction: row）', async () => {
    const { container } = render(MSpace, {
      slots: { default: () => [h('span', 'A'), h('span', 'B')] },
    });

    const space = container.querySelector('.m-space') as HTMLElement;
    expect(space.style.flexDirection).toBe('row');
  });

  it('direction=vertical 时 flex-direction: column', async () => {
    const { container } = render(MSpace, {
      props: { direction: 'vertical' },
      slots: { default: () => [h('span', 'A'), h('span', 'B')] },
    });

    const space = container.querySelector('.m-space') as HTMLElement;
    expect(space.style.flexDirection).toBe('column');
  });

  it('size=small 时 gap 为 8px', async () => {
    const { container } = render(MSpace, {
      props: { size: 'small' },
      slots: { default: () => [h('span', 'A')] },
    });

    const space = container.querySelector('.m-space') as HTMLElement;
    expect(space.style.gap).toBe('8px');
  });

  it('size=large 时 gap 为 24px', async () => {
    const { container } = render(MSpace, {
      props: { size: 'large' },
      slots: { default: () => [h('span', 'A')] },
    });

    const space = container.querySelector('.m-space') as HTMLElement;
    expect(space.style.gap).toBe('24px');
  });

  it('size 为数字时 gap 为 {n}px', async () => {
    const { container } = render(MSpace, {
      props: { size: 12 },
      slots: { default: () => [h('span', 'A')] },
    });

    const space = container.querySelector('.m-space') as HTMLElement;
    expect(space.style.gap).toBe('12px');
  });

  it('wrap=true 时 flex-wrap 为 wrap', async () => {
    const { container } = render(MSpace, {
      props: { wrap: true },
      slots: { default: () => [h('span', 'A')] },
    });

    const space = container.querySelector('.m-space') as HTMLElement;
    expect(space.style.flexWrap).toBe('wrap');
  });
});
