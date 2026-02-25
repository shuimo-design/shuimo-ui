/**
 * @description headless Message 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MMessage from '../MMessage';

describe('MMessage browser', () => {
  it('渲染 m-message 容器', async () => {
    const { container } = render(MMessage, {
      props: { content: '操作成功' },
    });

    const el = container.querySelector('.m-message');
    expect(el).not.toBeNull();
  });

  it('默认 type=info 时包含 m-message-info 类名', async () => {
    const { container } = render(MMessage, {
      props: { content: '提示信息' },
    });

    const el = container.querySelector('.m-message');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('m-message-info')).toBe(true);
  });

  it('type=success 时包含 m-message-success 类名', async () => {
    const { container } = render(MMessage, {
      props: { content: '操作成功', type: 'success' },
    });

    const el = container.querySelector('.m-message');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('m-message-success')).toBe(true);
  });

  it('type=warning 时包含 m-message-warning 类名', async () => {
    const { container } = render(MMessage, {
      props: { content: '警告提示', type: 'warning' },
    });

    const el = container.querySelector('.m-message');
    expect(el!.classList.contains('m-message-warning')).toBe(true);
  });

  it('type=error 时包含 m-message-error 类名', async () => {
    const { container } = render(MMessage, {
      props: { content: '操作失败', type: 'error' },
    });

    const el = container.querySelector('.m-message');
    expect(el!.classList.contains('m-message-error')).toBe(true);
  });

  it('content prop 正确渲染到 m-message-content', async () => {
    const { container } = render(MMessage, {
      props: { content: '这是一条消息' },
    });

    const content = container.querySelector('.m-message-content');
    expect(content).not.toBeNull();
    expect(content!.textContent).toBe('这是一条消息');
  });

  it('default slot 优先于 content prop 渲染', async () => {
    const { container } = render(MMessage, {
      props: { content: 'prop内容' },
      slots: { default: () => 'slot内容' },
    });

    const content = container.querySelector('.m-message-content');
    expect(content).not.toBeNull();
    expect(content!.textContent).toBe('slot内容');
  });

  it('渲染关闭按钮 m-message-close', async () => {
    const { container } = render(MMessage, {
      props: { content: '操作成功' },
    });

    const closeBtn = container.querySelector('.m-message-close');
    expect(closeBtn).not.toBeNull();
  });

  it('点击关闭按钮触发 close 事件', async () => {
    const onClose = vi.fn();
    const { container } = render(MMessage, {
      props: { content: '操作成功', onClose },
    });

    const closeBtn = container.querySelector('.m-message-close') as HTMLElement;
    expect(closeBtn).not.toBeNull();
    closeBtn.click();
    expect(onClose).toHaveBeenCalled();
  });
});
