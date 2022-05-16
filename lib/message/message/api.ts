import type { WCOPO, WPropType } from "../../dependents/_types";
import type { MessageProps } from "./type";
import { MessageTypeEnum, MessageDirectionEnum } from "./messageTypes";

export const props: WCOPO<MessageProps> = {
  type: { type: String as WPropType<MessageTypeEnum>, default: MessageTypeEnum.info },
  duration: { type: Number, default: 3000 },
  content: { type: String, default: '这是一条消息', required: true },
  direction: { type: String, default: MessageDirectionEnum.topRight },
}
