/**
 * @description core message-list hook
 * @author 阿怪
 * @date 2023/5/22 17:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MessageListProps, MessageProps } from './index';
import { MRef, MRefValue } from '../../../composition/common/MRef';

/**
 * @description MessageList使用到的属性
 */
export interface MessageOptions extends MessageProps {
  id?: string;
}

const getKey = (() => {
  let id = 0;
  return () => {
    id += 1;
    return `m-msg-${id}`;
  };
})();

export function useMessageList(config: {
  props: MessageListProps,
  value: {
    messageListRef: MRefValue<MessageOptions[]>
  }
}) {

  const baseClass = ['m-message-list', 'm-message-list-' + config.props.direction];
  const messageListRef = MRef(config.value.messageListRef);


  const add = (item: MessageOptions) => {
    item.id = getKey();
    messageListRef.value.push(item);
  };

  const remove = (index: number) => {
    messageListRef.value.splice(index, 1);
  };

  return {
    add, remove,
    baseClass
  };


}
