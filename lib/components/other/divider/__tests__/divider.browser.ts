/**
 * @description lib divider 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MDivider from '../MDivider';

describe('MDivider browser (lib)', () => {
  it('渲染分割线，包含 m-divider 类名', async () => {
    const { container } = render(MDivider, {});

    const el = container.querySelector('.m-divider');
    expect(el).not.toBeNull();
  });

  it('vertical 为 true 时含有 m-divider-vertical 类名', async () => {
    const { container } = render(MDivider, {
      props: { vertical: true },
    });

    const el = container.querySelector('.m-divider');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('m-divider-vertical')).toBe(true);
  });
});
