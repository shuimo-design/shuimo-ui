/**
 * @Description: message消息组件类型
 * @Author: 菩萨蛮
 * @Date: 2021/6/22 2:33 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */


export type BaseMessageConfig =  {
  content?: string,
  time?: number,
  type?: string
}

export type MessageConfig = BaseMessageConfig | string;

declare enum MessageEnum {
  success = 'success',
  warning = 'warning',
  info = 'info',
  error = 'error',
}

type IMessageEnum = { [T in MessageEnum]?: (options: MessageConfig) => void; }
type IMessageFunc = { (config: BaseMessageConfig): void; };
export type IMessage = IMessageEnum & IMessageFunc;
