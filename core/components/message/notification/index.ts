/**
 * @description notification core 导出
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { notificationProps } from './api';
import { useNotificationQueue } from './useNotification';

export const NotificationCore = {
  notificationProps,
  useNotificationQueue,
};

export type { NotificationProps, NotificationEvents, NotificationType, NotificationPosition } from './props';
export type { NotificationItem, NotificationAddOptions } from './useNotification';
