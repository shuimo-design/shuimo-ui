import type { WCOPO, WPropType } from '../../dependents/_types';
import type { MessageProps, MessageDirectionType } from '../../../types/components/MMessage';

export enum MessageTypeEnum {
  success = 'success',
  warning = 'warning',
  info = 'info',
  error = 'error'
}
export interface DragConfigType {
  triggerBoundary: number
}
export const props: WCOPO<MessageProps> = {
  type: { type: String as WPropType<MessageTypeEnum>, default: MessageTypeEnum.info },
  duration: { type: Number, default: 3000 },
  content: { type: String, default: '这是一条消息', required: true },
  direction: { type: String as WPropType<MessageDirectionType>, default: 'top-right' },
  dragAllow: { type: Boolean, default: true },
  dragConfig: {
    type: Object as WPropType<DragConfigType>,
    default: {
      triggerBoundary: 2
    }
  }
};
