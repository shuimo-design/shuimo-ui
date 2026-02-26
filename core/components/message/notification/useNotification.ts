/**
 * @description notification 队列 composable
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';
import { NotificationType, NotificationPosition } from './props';

/**
 * 通知队列中每一条通知的内部结构
 */
export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  duration: number;
  position: NotificationPosition;
  closable: boolean;
}

/**
 * 创建通知时的配置参数
 */
export interface NotificationAddOptions {
  title: string;
  message?: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
  closable?: boolean;
}

/**
 * 通知队列 composable
 * 管理通知的增删与自动关闭定时器
 */
export function useNotificationQueue() {
  const notifications = ref<NotificationItem[]>([]);
  let nextId = 0;

  /**
   * 添加一条通知，duration > 0 时自动移除
   */
  const add = (options: NotificationAddOptions): number => {
    const id = nextId++;
    const item: NotificationItem = {
      id,
      title: options.title,
      message: options.message ?? '',
      type: options.type ?? 'info',
      duration: options.duration ?? 4500,
      position: options.position ?? 'top-right',
      closable: options.closable ?? true,
    };
    notifications.value.push(item);

    if (item.duration > 0) {
      setTimeout(() => remove(id), item.duration);
    }

    return id;
  };

  /**
   * 按 id 移除一条通知
   */
  const remove = (id: number): void => {
    const idx = notifications.value.findIndex(n => n.id === id);
    if (idx !== -1) {
      notifications.value.splice(idx, 1);
    }
  };

  return { notifications, add, remove };
}
