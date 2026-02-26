/**
 * @description headless notification 命令式 API composable
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 使用方式：
 *   const { notify } = useNotification();
 *   notify({ title: '操作成功', message: '数据已保存', type: 'success' });
 *   notify.success('标题', '消息');
 */
import { createApp, h } from 'vue';
import MNotificationList from '../../components/message/notification/MNotificationList';
import { useNotificationQueue } from '@shuimo-design/ui-core/components/message/notification/useNotification';
import { NotificationType, NotificationPosition } from '@shuimo-design/ui-core/components/message/notification/props';
import { NotificationAddOptions } from '@shuimo-design/ui-core/components/message/notification';

/** 单例队列实例 */
let instance: ReturnType<typeof useNotificationQueue> | null = null;
/** 挂载容器节点 */
let container: HTMLElement | null = null;

/**
 * 确保通知容器与队列已初始化（单例懒加载）
 */
function ensureContainer(): ReturnType<typeof useNotificationQueue> {
  if (instance) return instance;

  container = document.createElement('div');
  container.setAttribute('data-m-notification-root', '');
  document.body.appendChild(container);

  instance = useNotificationQueue();

  const app = createApp({
    setup() {
      return () =>
        h(MNotificationList, {
          notifications: instance!.notifications.value,
          onClose: (id: number) => instance!.remove(id),
        });
    },
  });

  app.mount(container);

  return instance;
}

/**
 * 通知命令式 API
 * notify(options) — 完整配置版本
 * notify.success/warning/error/info(title, message?, options?) — 快捷版本
 */
export function useNotification() {
  const queue = ensureContainer();

  /** 完整配置方式弹出通知 */
  const notify = (options: NotificationAddOptions): number =>
    queue.add(options);

  /** 按类型快捷弹出 */
  const byType = (type: NotificationType) =>
    (title: string, message?: string, position?: NotificationPosition, duration?: number): number =>
      queue.add({ title, message, type, position, duration });

  return {
    notify,
    success: byType('success'),
    warning: byType('warning'),
    error: byType('error'),
    info: byType('info'),
  };
}
