/**
 * @description core message hook
 * @author 阿怪
 * @date 2023/05/22 16:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { IMessage, MessageConfig, MessageDirectionType, MessageIns, MessageProps, MessageType } from './index';
import { MessageTypeEnum } from './api';

export function useMessage<K>() {
  type T = MessageIns<K>;
  type MessageOptions = {
    config: MessageConfig,
    type?: MessageTypeEnum,
    duration?: number
  }
  const messageListMap = new Map<MessageDirectionType, T>();
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

  const addOption = async (
    options: MessageOptions,
    handler: {
      getIns: (direction: MessageDirectionType) => Promise<T> | T,
      nextTick: (
        resolve: (value: K) => void,
        messageListIns: T
      ) => Promise<void>
    }
  ) => {
    const { config, type, duration } = options;
    const messageOptions = mergeOption(config, type, duration);

    const { direction } = messageOptions;
    const mountInstance = messageListMap.get(direction);
    if (mountInstance) {
      mountInstance.add(messageOptions);
    } else {
      const ins = await handler.getIns(direction);
      ins.add(messageOptions);
      messageListMap.set(direction, ins);
    }


    return new Promise<K>(async (resolve, reject) => {
      const messageListIns = messageListMap.get(direction);
      if (messageListIns) {
        await handler.nextTick(resolve, messageListIns);
      } else {
        reject();
      }
    });
  };

  const initMessage = (handler: {
    getIns: (direction: MessageDirectionType) => Promise<T> | T,
    nextTick: (
      resolve: (value: K) => void,
      messageListIns: T
    ) => Promise<void>
  }) => {
    const callMessage = async (options: MessageOptions) => {
      return await addOption(options, handler);
    };

    const MMessage = (config: MessageConfig) => { return callMessage({ config });};

    for (const direction of Object.values(MessageTypeEnum)) {
      (MMessage as IMessage<K>)[direction as MessageType] = (config: MessageConfig, duration?: number) => callMessage({
        config,
        type: MessageTypeEnum[direction],
        duration
      });
    }

    return MMessage as IMessage<K>;

  };

  return {
    initMessage
  };

}
