/**
 * @description message runtime props 定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { MessageProps, MessageListProps, MessageType, MessageDirectionType } from './props';

/**
 * 单条消息组件的运行时 props
 */
export const messageProps: MCOPO<MessageProps> = {
  content: { type: String, required: true },
  type: { type: String as MPropType<MessageType>, default: 'info' },
  duration: { type: Number, default: 3000 },
  direction: { type: String as MPropType<MessageDirectionType>, default: 'top-right' },
};

/**
 * 消息列表容器的运行时 props
 */
export const messageListProps: MCOPO<MessageListProps> = {
  direction: { type: String as MPropType<MessageDirectionType>, default: 'top-right' },
};
