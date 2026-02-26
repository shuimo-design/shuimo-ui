/**
 * @description notification runtime props 定义
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { NotificationProps, NotificationType, NotificationPosition } from './props';

/**
 * 单条通知运行时 props
 */
export const notificationProps: MCOPO<NotificationProps> = {
  title: { type: String, required: true },
  message: { type: String, default: '' },
  type: { type: String as MPropType<NotificationType>, default: 'info' },
  duration: { type: Number, default: 4500 },
  position: { type: String as MPropType<NotificationPosition>, default: 'top-right' },
  closable: { type: Boolean, default: true },
  offset: { type: Number, default: 16 },
};
