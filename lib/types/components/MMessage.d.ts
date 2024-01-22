/**
 * @description message type
 * @author 阿怪
 * @date 2023/7/9 17:57
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo use @core type
 */
// import { MessageProps } from 'packages/core/lib/message/message';

export type MessageType = 'success' | 'warning' | 'info' | 'error';

// export type MessageConfig = MessageProps | string;
export type MessageConfig = any | string;

type IMessageEnum<T> = {
  [K in MessageType]: (options: MessageConfig, duration?: number) => Promise<T> | void;
};
export type IMessage<T = any> = {
  (config: MessageConfig): Promise<T> | void,
  create?: () => IMessage<T>
} & IMessageEnum<T>;
