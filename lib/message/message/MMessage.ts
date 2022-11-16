/**
 * @description message插件式组件
 * @author: qunbotop
 * @date 2022/5/16 4:37 下午
 * @version v2.0.1
 *
 * v2.0.1 message handler 提供返回
 */
import { ComponentPublicInstance, createApp, nextTick } from 'vue';
import MessageList from './MMessageList';
import type {
  IMessage,
  MessageConfig,
  MessageDirectionType,
  MessageProps,
  MessageType
} from '../../../types/components/MMessage';
import { MessageTypeEnum } from './api';
import MMessageItem from './MMessageItem';

const messageListMap = new Map<MessageDirectionType, MessageIns>();

/**
 * @description MessageList实例
 */
export declare interface MessageIns extends ComponentPublicInstance {
  add: (params: MessageProps) => void,
  remove: (index: number) => void,
  domList: Array<InstanceType<typeof MMessageItem>>
}

const mergeOption = (options: MessageConfig, type = MessageTypeEnum.success, duration = 3000) => {
  let messageOptions: Required<MessageProps> = {
    direction: 'top-right',
    duration,
    type,
    content: '',
    dragAllow: true,
    dragConfig: { triggerBoundary: 2 }
  };
  if (typeof options === 'string') {
    messageOptions.content = options;
    messageOptions.type = type ?? MessageTypeEnum.success;
  } else {
    messageOptions = Object.assign(messageOptions, options);
  }
  return messageOptions;
};

const showTypeMessage = (
  options: MessageConfig,
  type?: MessageTypeEnum,
  duration?: number
): Promise<InstanceType<typeof MMessageItem>> => {
  const messageOptions = mergeOption(options, type, duration);

  const { direction } = messageOptions;

  // 根据当前方向，获取对应的MessageList实例
  const mountInstance = messageListMap.get(direction);
  if (!mountInstance) {
    // 没有出现过的方向，创建新的实例，然后调用操作
    const wrapper = document.createElement('div');
    const ins = createApp(MessageList, {
      ...messageOptions
    }).mount(wrapper) as MessageIns;

    ins.add(messageOptions);
    messageListMap.set(direction, ins);
  } else {
    // 出现过直接调用操作
    mountInstance.add(messageOptions);
  }

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const messageListIns = messageListMap.get(direction);
    await nextTick(() => {
      if (messageListIns) {
        const { domList } = messageListIns;
        resolve(domList[domList.length - 1]);
      }
      reject();
    });
  });
};

const MMessage = showTypeMessage as IMessage;

for (const key in MessageTypeEnum) {
  MMessage[key as MessageType] = (options: MessageConfig, duration?: number) =>
    showTypeMessage(options, MessageTypeEnum[key as MessageTypeEnum], duration);
}

export default MMessage;
