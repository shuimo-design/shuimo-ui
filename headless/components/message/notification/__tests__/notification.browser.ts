/**
 * @description headless Notification / NotificationList 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MNotification from '../MNotification';
import MNotificationList from '../MNotificationList';

describe('MNotification browser', () => {
  it('渲染 m-notification 根元素', async () => {
    const { container } = render(MNotification, {
      props: { title: '通知标题', type: 'info', position: 'top-right' },
    });

    expect(container.querySelector('.m-notification')).not.toBeNull();
  });

  it('type=info 时有 m-notification-info 类', async () => {
    const { container } = render(MNotification, {
      props: { title: '信息通知', type: 'info', position: 'top-right' },
    });

    const el = container.querySelector('.m-notification');
    expect(el!.classList.contains('m-notification-info')).toBe(true);
  });

  it('type=success 时有 m-notification-success 类', async () => {
    const { container } = render(MNotification, {
      props: { title: '成功', type: 'success', position: 'top-right' },
    });

    expect(container.querySelector('.m-notification-success')).not.toBeNull();
  });

  it('position=top-left 时有 m-notification-top-left 类', async () => {
    const { container } = render(MNotification, {
      props: { title: '通知', type: 'info', position: 'top-left' },
    });

    const el = container.querySelector('.m-notification');
    expect(el!.classList.contains('m-notification-top-left')).toBe(true);
  });

  it('title prop 渲染到 m-notification-title', async () => {
    const { container } = render(MNotification, {
      props: { title: '这是通知标题', type: 'info', position: 'top-right' },
    });

    const title = container.querySelector('.m-notification-title');
    expect(title!.textContent).toBe('这是通知标题');
  });

  it('message prop 渲染到 m-notification-message', async () => {
    const { container } = render(MNotification, {
      props: { title: '标题', message: '通知详细内容', type: 'info', position: 'top-right' },
    });

    const msg = container.querySelector('.m-notification-message');
    expect(msg).not.toBeNull();
    expect(msg!.textContent).toBe('通知详细内容');
  });

  it('closable=true 时渲染关闭按钮', async () => {
    const { container } = render(MNotification, {
      props: { title: '可关闭', type: 'info', position: 'top-right', closable: true },
    });

    expect(container.querySelector('.m-notification-close')).not.toBeNull();
  });

  it('点击关闭按钮触发 close 事件', async () => {
    const onClose = vi.fn();
    const { container } = render(MNotification, {
      props: {
        title: '可关闭',
        type: 'info',
        position: 'top-right',
        closable: true,
        onClose,
      },
    });

    const closeBtn = container.querySelector('.m-notification-close') as HTMLElement;
    closeBtn.click();
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe('MNotificationList browser', () => {
  it('无通知时不向 body 渲染内容', async () => {
    render(MNotificationList, {
      props: { notifications: [] },
    });

    await nextTick();
    expect(document.querySelector('.m-notification-list')).toBeNull();
  });

  it('有通知时在 body 中渲染通知列表', async () => {
    render(MNotificationList, {
      props: {
        notifications: [
          { id: 1, title: '通知1', message: '', type: 'info', position: 'top-right', closable: true, duration: 3000 },
        ],
      },
    });

    await nextTick();
    const list = document.querySelector('.m-notification-list');
    expect(list).not.toBeNull();
  });

  it('按 position 分组渲染到对应容器', async () => {
    render(MNotificationList, {
      props: {
        notifications: [
          { id: 1, title: '右上', message: '', type: 'info', position: 'top-right', closable: false, duration: 3000 },
          { id: 2, title: '左上', message: '', type: 'success', position: 'top-left', closable: false, duration: 3000 },
        ],
      },
    });

    await nextTick();
    expect(document.querySelector('.m-notification-list-top-right')).not.toBeNull();
    expect(document.querySelector('.m-notification-list-top-left')).not.toBeNull();
  });

  it('通知关闭触发 close 事件携带 id', async () => {
    const onClose = vi.fn();
    render(MNotificationList, {
      props: {
        notifications: [
          { id: 42, title: '可关闭通知', message: '', type: 'warning', position: 'top-right', closable: true, duration: 3000 },
        ],
        onClose,
      },
    });

    await nextTick();

    const closeBtn = document.querySelector('.m-notification-close') as HTMLElement;
    expect(closeBtn).not.toBeNull();
    closeBtn.click();

    expect(onClose).toHaveBeenCalledWith(42);
  });
});
