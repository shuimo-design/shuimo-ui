/**
 * @description lib message 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MMessageItem from '../MMessageItem';

// lib MMessage 是函数式插件 API，测试其底层渲染单元 MMessageItem

describe('lib MMessageItem browser', () => {
  it('渲染 m-message-item 结构', async () => {
    const { container } = render(MMessageItem, {
      props: { content: '操作成功' },
    });

    const el = container.querySelector('.m-message-item');
    expect(el).not.toBeNull();
  });

  it('渲染 m-message-content 并显示内容', async () => {
    const { container } = render(MMessageItem, {
      props: { content: '这是一条消息' },
    });

    const content = container.querySelector('.m-message-content');
    expect(content).not.toBeNull();
    expect(content!.textContent).toBe('这是一条消息');
  });

  it('渲染图标元素 m-message-list-icon', async () => {
    const { container } = render(MMessageItem, {
      props: { content: '操作成功', type: 'success' },
    });

    const icon = container.querySelector('.m-message-list-icon');
    expect(icon).not.toBeNull();
  });

  it('type=success 时 icon src 包含 success 标识', async () => {
    const { container } = render(MMessageItem, {
      props: { content: '操作成功', type: 'success' },
    });

    const icon = container.querySelector('.m-message-list-icon') as HTMLImageElement | null;
    expect(icon).not.toBeNull();
    expect(icon!.src).toContain('success');
  });

  it('type=warning 时 icon src 包含 warning 标识', async () => {
    const { container } = render(MMessageItem, {
      props: { content: '警告提示', type: 'warning' },
    });

    const icon = container.querySelector('.m-message-list-icon') as HTMLImageElement | null;
    expect(icon).not.toBeNull();
    expect(icon!.src).toContain('warning');
  });

  it('type=error 时 icon src 包含 error 标识', async () => {
    const { container } = render(MMessageItem, {
      props: { content: '操作失败', type: 'error' },
    });

    const icon = container.querySelector('.m-message-list-icon') as HTMLImageElement | null;
    expect(icon).not.toBeNull();
    expect(icon!.src).toContain('error');
  });

  it('默认 type=info 时 icon src 包含 info 标识', async () => {
    const { container } = render(MMessageItem, {
      props: { content: '提示信息' },
    });

    const icon = container.querySelector('.m-message-list-icon') as HTMLImageElement | null;
    expect(icon).not.toBeNull();
    expect(icon!.src).toContain('info');
  });
});
