/**
 * @description core message-list hook
 * @author 阿怪
 * @date 2023/5/22 17:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MessageListProps, MessageProps } from './index';
import { Options } from '../../../compositions/common/defineCore.ts';
import { ref } from 'vue';

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
  props: MessageListProps
}>) {
  const messageListRef = ref<Array<MessageOptions>>([]);
  const baseClass = ['m-message-list', 'm-message-list-' + options.props.direction];


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
    messageListRef,
    getKey,
    add, remove,
    baseClass,
  };


}
