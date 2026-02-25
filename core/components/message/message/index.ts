/**
 * @description message core 导出
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { messageProps, messageListProps } from './api';
import { useMessageQueue } from './useMessage';

export const MessageCore = {
  messageProps,
  messageListProps,
  useMessageQueue,
};

export type { MessageProps, MessageListProps, MessageType, MessageDirectionType } from './props';
export type { MessageItem } from './useMessage';
