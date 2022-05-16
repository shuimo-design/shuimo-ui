/**
 * @description message api type
 * @author qunbotop
 * @date 2022/5/11 10:00 AM
 * @version v1.0.0
 *
 * @name w-message
 * @docDescription Message component with wash-painting-ui style.
 *              水墨组件的消息组件。
 * @docUrl https://wash-painting.com/message
 *
 */
import type { ComponentPublicInstance } from 'vue';
import { MessageTypeEnum } from "./messageTypes";

// Message的props属性
export declare interface MessageProps {
  /**
   * @description Type of message
   * @type MessageTypeEnum
   * @default 'info'
   */
  type?: MessageTypeEnum,
  /**
   * @description The time of duation
   * @type number
   * @default '3000'
   */
  duration?: number,
  /**
   * @description The message content
   * @type string
   * @default '这是一条消息'
   */
  content: string,
  /**
    * @description The direction in which the component appears
    * @type string
    * @default 'top-right'
    */
  direction?: string,
}

/**
  * @description MessageIcon类型
  */
export declare type messageIconType = {
  [k in MessageTypeEnum]: string
}

// MessageList实例
export declare interface MessageIns extends ComponentPublicInstance { 
  add: (params: MessageProps) => void,
  remove: (index: number) => void
}

// 展示消息方法类型
export declare interface ShowTypeMessage {
  (type: MessageTypeEnum, params: MessageProps, duration?: number): Promise<MessageIns>;
}

// API方法类型
export declare interface MessageApiMethod {
  (params: MessageProps, duration?: number): Promise<MessageIns>
}

// API方法
export declare type MessageApi = {
  [key in MessageTypeEnum]: MessageApiMethod;
}
