/**
 * @description lib li 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MLi from '../MLi';

describe('MLi browser (lib)', () => {
  it('渲染列表项，包含 m-li 类名且 slot 内容正确渲染', async () => {
    const { container } = render(MLi, {
      slots: { default: () => '列表项文本' },
    });

    const el = container.querySelector('.m-li');
    expect(el).not.toBeNull();
    expect(el!.textContent).toContain('列表项文本');
  });

  it('active 为 true 时含有 m-li-active 类名', async () => {
    const { container } = render(MLi, {
      props: { active: true },
      slots: { default: () => '激活项' },
    });

    const el = container.querySelector('.m-li');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('m-li-active')).toBe(true);
  });
});
