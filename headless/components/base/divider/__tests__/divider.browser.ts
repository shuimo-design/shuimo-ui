/**
 * @description headless Divider 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MDivider from '../MDivider';

describe('MDivider browser', () => {
  it('默认渲染包含 m-divider 类名', async () => {
    const { container } = render(MDivider, {});

    const el = container.querySelector('.m-divider');
    expect(el).not.toBeNull();
  });

  it('默认水平方向不含 m-divider-vertical 类名', async () => {
    const { container } = render(MDivider, {
      props: { vertical: false },
    });

    const el = container.querySelector('.m-divider');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('m-divider-vertical')).toBe(false);
  });

  it('vertical 为 true 时添加 m-divider-vertical 类名', async () => {
    const { container } = render(MDivider, {
      props: { vertical: true },
    });

    const el = container.querySelector('.m-divider');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('m-divider-vertical')).toBe(true);
  });

  it('渲染为 div 元素', async () => {
    const { container } = render(MDivider, {});

    const el = container.querySelector('.m-divider');
    expect(el!.tagName.toLowerCase()).toBe('div');
  });
});
