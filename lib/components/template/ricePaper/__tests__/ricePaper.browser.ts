/**
 * @description lib ricePaper 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MRicePaper from '../MRicePaper';

describe('MRicePaper browser (lib)', () => {
  it('渲染宣纸，包含 m-rice-paper 类名', async () => {
    const { container } = render(MRicePaper, {});

    const el = container.querySelector('.m-rice-paper');
    expect(el).not.toBeNull();
  });

  it('slot 内容渲染在宣纸内部', async () => {
    const { container } = render(MRicePaper, {
      slots: { default: () => '宣纸内容' },
    });

    const layout = container.querySelector('.m-rice-paper-layout');
    expect(layout).not.toBeNull();
    expect(layout!.textContent).toContain('宣纸内容');
  });
});
