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
import { Options } from '../../../composition/common/defineCore';

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

export function useMessageList(options: Options<{
  props: MessageListProps,
  value: {
    messageListRef: MessageOptions[]
  }
}>) {

  const baseClass = ['m-message-list', 'm-message-list-' + options.props.direction];
  const messageListRef = MRef(options.value.messageListRef);


  const add = (item: MessageOptions) => {
    item.id = getKey();
    const arr = messageListRef.value;
    arr.push(item);
    messageListRef.value = arr;
    return item.id;
  };

  const remove = (index: number) => {
    const arr = messageListRef.value;
    arr.splice(index, 1);
    messageListRef.value = arr;
  };

  return {
    getKey,
    add, remove,
    baseClass
  };


}
