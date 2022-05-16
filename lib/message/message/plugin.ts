/**
 * @description message插件式组件
 * @author: qunbotop
 * @date 2022/5/16 4:37 下午
 * @version V2.0.0
 */
import { createApp, nextTick } from "vue";
import MessageList from "./WMessageList";
import { MessageTypeEnum } from "./messageTypes";
import type { MessageApi, MessageIns, MessageProps, ShowTypeMessage } from "./type";

const messageListMap = new Map();

const showTypeMessage: ShowTypeMessage = (type: MessageTypeEnum, params: MessageProps | string, duration?: number): Promise<MessageIns> => {
  let messageOptions: MessageProps = { content: '' };
  if (typeof params === 'string') {
    messageOptions.content = params;
  } else if (typeof params === 'object') {
    messageOptions = { type, ...params, duration };
  }
  messageOptions.direction = messageOptions.direction || "top-right";
  messageOptions.duration = duration || 3000;
  messageOptions.type = type;
  
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
  
  return new Promise((resolve) => {
    const messageListIns = messageListMap.get(direction);
    nextTick(() => {
      const { domList } = messageListIns
      resolve(domList[domList.length - 1]);
    })
  })
}

const messageApi: MessageApi = {
  info: (params, duration) => showTypeMessage(MessageTypeEnum.info, params, duration),
  error: (params, duration) => showTypeMessage(MessageTypeEnum.error, params, duration),
  success: (params, duration) => showTypeMessage(MessageTypeEnum.success, params, duration),
  warning: (params, duration) => showTypeMessage(MessageTypeEnum.warning, params, duration)
}

const MessagePlugin = showTypeMessage as MessageApi & ShowTypeMessage;

Object.keys(messageApi).forEach((keyName) => {
  MessagePlugin[keyName as MessageTypeEnum] = messageApi[keyName as MessageTypeEnum];
})

export default MessagePlugin;
