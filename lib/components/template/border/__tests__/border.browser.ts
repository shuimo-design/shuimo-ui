/**
 * @description lib border 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MBorder from '../MBorder';

describe('MBorder browser (lib)', () => {
  it('渲染边框，包含 m-border 类名', async () => {
    const { container } = render(MBorder, {});

    const el = container.querySelector('.m-border');
    expect(el).not.toBeNull();
  });

  it('slot 内容渲染在边框内部', async () => {
    const { container } = render(MBorder, {
      slots: { default: () => '边框内容' },
    });

    const el = container.querySelector('.m-border');
    expect(el).not.toBeNull();
    expect(el!.textContent).toContain('边框内容');
  });
});
