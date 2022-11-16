/**
 * @description messageList组件
 * @author: qunbotop
 * @date 2022/5/16 4:37 下午
 * @version v2.0.0
 */
import { defineComponent, h, ref, Teleport } from 'vue';
import { props } from './api';
import MMessageItem from './MMessageItem';
import type { MessageProps } from '../../../types/components/MMessage';

/**
 * @description MessageList使用到的属性
 */
interface MessageOptions extends MessageProps {
  id?: string
}

const getKey = (() => {
  let id = 0;
  return () => {
    id += 1;
    return `m-msg-${id}`;
  };
})();

export default defineComponent({
  name: 'MMessageList',
  props,
  setup(props, { expose }) {
    const messageList = ref<Array<MessageOptions>>([]);
    const domList = ref<Array<InstanceType<typeof MMessageItem>>>([]);

    const add = (item: MessageOptions) => {
      item.id = getKey();
      messageList.value.push(item);
    };

    const remove = (index: number) => {
      messageList.value.splice(index, 1);
    };

    expose({ add, messageList, domList });

    return () => {
      if (!messageList.value.length) return;

      const messages = messageList.value.map((item, index) =>
        h(MMessageItem, {
          ref: ref => {
            if (ref) {
              domList.value.push(ref as InstanceType<typeof MMessageItem>);
            }
          },
          key: item.id,
          ...item,
          onCloseDuration: () => remove(index)
        })
      );

      return (
        <Teleport to={'body'}>
          <div class={`m-message-list m-message-list_${props.direction}`}>{messages}</div>
        </Teleport>
      );
    };
  }
});
