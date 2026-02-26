/**
 * @description notification 组件 props 类型定义
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

/**
 * 通知类型
 */
export type NotificationType = 'success' | 'warning' | 'error' | 'info';

/**
 * 通知显示位置
 */
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * 单条通知 props
 */
export declare type NotificationProps = {
  /**
   * @description 通知标题
   */
  title: string;
  /**
   * @description 通知正文内容
   */
  message?: string;
  /**
   * @description 通知类型
   * @default 'info'
   */
  type?: NotificationType;
  /**
   * @description 显示时长（毫秒），0 表示不自动关闭
   * @default 4500
   */
  duration?: number;
  /**
   * @description 通知显示位置
   * @default 'top-right'
   */
  position?: NotificationPosition;
  /**
   * @description 是否显示关闭按钮
   * @default true
   */
  closable?: boolean;
  /**
   * @description 与屏幕边缘的偏移量（像素）
   * @default 16
   */
  offset?: number;
};

/**
 * 通知事件类型
 */
export declare type NotificationEvents = {
  onClose?: () => void;
};
