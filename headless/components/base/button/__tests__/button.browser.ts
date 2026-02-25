/**
 * @description headless button 浏览器测试
 * @author 阿怪
 * @date 2026/2/25 12:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MButton from '../MButton';

describe('MButton browser', () => {
  it('渲染按钮并响应点击', async () => {
    const screen = render(MButton, {
      slots: { default: () => '测试按钮' },
    });

    await expect.element(screen.getByText('测试按钮')).toBeInTheDocument();
    await expect.element(screen.getByRole('button')).toBeInTheDocument();
  });

  it('link 模式渲染为 a 标签', async () => {
    const screen = render(MButton, {
      props: { link: true },
      slots: { default: () => '链接按钮' },
    });

    const el = screen.getByText('链接按钮');
    await expect.element(el).toBeInTheDocument();
    // 验证渲染为 a 标签而非 button
    expect(el.element().tagName.toLowerCase()).toBe('a');
  });
});
