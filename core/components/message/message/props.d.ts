/**
 * @description message 组件 props 类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

/**
 * 消息类型枚举
 */
export type MessageType = 'success' | 'warning' | 'info' | 'error';

/**
 * 消息出现方位枚举
 */
export type MessageDirectionType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';

/**
 * 单条消息 props
 */
export declare type MessageProps = {
  /**
   * @description 消息类型
   * @default 'info'
   */
  type?: MessageType;
  /**
   * @description 显示时长（毫秒），0 表示不自动关闭
   * @default 3000
   */
  duration?: number;
  /**
   * @description 消息内容
   */
  content: string;
  /**
   * @description 消息出现的方位
   * @default 'top-right'
   */
  direction?: MessageDirectionType;
};

/**
 * 消息列表容器 props
 */
export declare type MessageListProps = {
  /**
   * @description 消息列表出现的方位
   * @default 'top-right'
   */
  direction?: MessageDirectionType;
};
