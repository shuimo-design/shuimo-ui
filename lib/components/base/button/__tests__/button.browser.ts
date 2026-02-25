/**
 * @description lib button 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MButton from '../MButton';

describe('MButton browser (lib)', () => {
  it('渲染按钮，包含 m-button 类名且 slot 文本正确渲染', async () => {
    const { container } = render(MButton, {
      slots: { default: () => '水墨按钮' },
    });

    const el = container.querySelector('.m-button');
    expect(el).not.toBeNull();
    expect(el!.textContent).toContain('水墨按钮');
  });

  it('link 模式渲染为 a 标签', async () => {
    const { container } = render(MButton, {
      props: { link: true },
      slots: { default: () => '链接按钮' },
    });

    // link 模式下根元素为 a 标签
    const el = container.querySelector('.m-button');
    expect(el).not.toBeNull();
    expect(el!.tagName.toLowerCase()).toBe('a');
  });

  it('disabled 时含有 m-button-disabled 类名', async () => {
    const { container } = render(MButton, {
      props: { disabled: true },
      slots: { default: () => '禁用按钮' },
    });

    const el = container.querySelector('.m-button');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('m-button-disabled')).toBe(true);
  });
});
