/**
 * @description message api
 * @author 阿怪
 * @date 2022/5/16 15:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '@shuimo-design/types';
import { MessageDirectionType, MessageListProps, MessageProps } from './index';

export enum MessageTypeEnum {
  success = 'success',
  warning = 'warning',
  info = 'info',
  error = 'error'
}
export interface DragConfigType {
  triggerBoundary: number
}
export const props: MCOPO<MessageProps> = {
  type: { type: String as MPropType<MessageTypeEnum>, default: MessageTypeEnum.info },
  duration: { type: Number, default: 3000 },
  content: { type: String, default: '这是一条消息', required: true },
  direction: { type: String as MPropType<MessageDirectionType>, default: 'top-right' },
  dragAllow: { type: Boolean, default: true },
  dragConfig: {
    type: Object as MPropType<DragConfigType>,
    default: {
      triggerBoundary: 2
    }
  }
};

export const listProps: MCOPO<MessageListProps> = {
  direction: { type: String as MPropType<MessageDirectionType>, default: 'top-right' },
}
