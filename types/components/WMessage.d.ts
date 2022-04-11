/**
 * @description message消息组件类型
 * @author 阿怪
 * @date 2021/6/22 2:33 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

/**
 * 基础Message信息
 * <br/>
 * @param content 提示内容 <br/>
 * @param time 延迟时间 <br/>
 * @param type 类型 <br/>
 */
export type BaseMessageConfig = {
  content?: string,
  time?: number,
  type?: string
}

export type MessageConfig = BaseMessageConfig | string;

type IMessageEnum = {
  success: (options: MessageConfig) => void,
  warning: (options: MessageConfig) => void,
  info: (options: MessageConfig) => void,
  error: (options: MessageConfig) => void,
};
export type IMessage = IMessageEnum & {
  (config: BaseMessageConfig): void;
};
