/**
 * @description lib tag 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MTag from '../MTag';

describe('MTag browser (lib)', () => {
  it('渲染标签，包含 m-tag 类名且 slot 内容正确渲染', async () => {
    const { container } = render(MTag, {
      slots: { default: () => '水墨标签' },
    });

    const el = container.querySelector('.m-tag');
    expect(el).not.toBeNull();
    expect(el!.textContent).toContain('水墨标签');
  });

  it('type prop 使标签包含对应类型类名', async () => {
    const { container } = render(MTag, {
      props: { type: 'primary' },
      slots: { default: () => '主要标签' },
    });

    const el = container.querySelector('.m-tag');
    expect(el).not.toBeNull();
    // lib MTag 类名格式为 m-tag-{type}
    expect(el!.classList.contains('m-tag-primary')).toBe(true);
  });
});
