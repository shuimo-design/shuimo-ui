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
  };

  class InstanceMap {
    map: Map<MessageDirectionType, any> = new Map<MessageDirectionType, any>();
    directionSet: Set<MessageDirectionType> = new Set<MessageDirectionType>();

    public getIns<T>(direction: MessageDirectionType, customerGetIns: (direction: MessageDirectionType) => Promise<T> | T) {
      return new Promise<T>(async resolve => {
        if (this.directionSet.has(direction)) {
          setTimeout(() => {
            const ins = this.map.get(direction);

            if (ins) {resolve(ins);} else {
              const res = this.getIns(direction, customerGetIns);
              resolve(res);
            }
          });
        } else {
          this.directionSet.add(direction);
          const ins = await customerGetIns(direction);
          this.map.set(direction, ins);
          resolve(ins);
        }
      });
    }
  }

  const insMap = new InstanceMap();


  const mergeOption = (options: MessageConfig, type = MessageTypeEnum.success, duration = 3000) => {
    let messageOptions: Required<MessageProps> = {
      direction: 'top-right',
      duration,
      type,
      content: '',
      dragAllow: true,
      dragConfig: { triggerBoundary: 2 },
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
        messageListIns: T,
      ) => Promise<void>
    },
  ) => {
    const { config, type, duration } = options;
    const messageOptions = mergeOption(config, type, duration);

    const { direction } = messageOptions;
    const mountInstance = await insMap.getIns(direction, handler.getIns);
    mountInstance.add(messageOptions);


    return new Promise<K>(async (resolve, reject) => {
      if (mountInstance) {
        await handler.nextTick(resolve, mountInstance);
      } else {
        reject();
      }
    });
  };

  const initMessage = (handler: {
    getIns: (direction: MessageDirectionType) => Promise<T> | T,
    nextTick: (
      resolve: (value: K) => void,
      messageListIns: T,
    ) => Promise<void>
  }, needNew?: boolean) => {
    const callMessage = async (options: MessageOptions) => {
      return await addOption(options, handler);
    };

    const MMessage = (config: MessageConfig) => { return callMessage({ config });};

    for (const messageType of Object.values(MessageTypeEnum)) {
      (MMessage as IMessage<K>)[messageType as MessageType] = (config: MessageConfig, duration?: number) => callMessage({
        config,
        type: MessageTypeEnum[messageType],
        duration,
      });
    }

    if (needNew !== false) {
      MMessage.create = (): IMessage<K> => {
        const { initMessage: _initMessage } = useMessage<K>();
        return _initMessage(handler, false);
      };
    }

    return MMessage as IMessage<K>;
  };

  return {
    initMessage,
  };

}
