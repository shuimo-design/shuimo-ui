/**
 * @description message插件式组件
 * @author: qunbotop
 * @date 2022/5/16 4:37 下午
 * @version V2.0.0
 */
import { ComponentPublicInstance, createApp, nextTick } from "vue";
import MessageList from "./WMessageList";
import type { IMessage, MessageProps, MessageType } from "../../../types/components/WMessage";
import { MessageTypeEnum } from "./api";
import { MessageConfig } from "../../../types/components/WMessage";

const messageListMap = new Map();

/**
 * @description MessageList实例
 */
export declare interface MessageIns extends ComponentPublicInstance {
  add: (params: MessageProps) => void,
  remove: (index: number) => void
}

const mergeOption = (options: MessageConfig,
                     type = MessageTypeEnum.success,
                     duration = 3000) => {
  let messageOptions: MessageProps = {
    direction: 'top-right',
    duration,
    type,
    content: ''
  };
  if (typeof options === 'string') {
    messageOptions.content = options;
    messageOptions.type = type ?? MessageTypeEnum.success;
  } else {
    messageOptions = Object.assign(messageOptions, options);
  }
  return messageOptions;
}

const showTypeMessage = (options: MessageConfig, type?: MessageTypeEnum, duration?: number) => {
  let messageOptions = mergeOption(options, type, duration);

  const { direction } = messageOptions;

  // 根据当前方向，获取对应的MessageList实例
  const mountInstance = messageListMap.get(direction);
  if (!mountInstance) {
    // 没有出现过的方向，创建新的实例，然后调用操作
    const wrapper = document.createElement('div');
    const ins = createApp(MessageList, {
      ...messageOptions
    }).mount(wrapper) as MessageIns;

    ins.add(messageOptions)
    messageListMap.set(direction, ins);
  } else {
    // 出现过直接调用操作
    mountInstance.add(messageOptions);
  }

  new Promise(async (resolve) => {
    const messageListIns = messageListMap.get(direction);
    await nextTick(() => {
      const { domList } = messageListIns
      resolve(domList[domList.length - 1]);
    })
  }).then();
}

const WMessage = showTypeMessage as IMessage;

for (const key in MessageTypeEnum) {
  WMessage[key as MessageType] = (options: MessageConfig, duration?: number) =>
    showTypeMessage(options, MessageTypeEnum[key as MessageTypeEnum], duration);
}

export default WMessage;
