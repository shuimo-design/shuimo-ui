/**
 * @description messageList组件
 * @author: qunbotop
 * @date 2022/5/16 4:37 下午
 * @version v2.0.0
 */
import { defineComponent, h, ref, Teleport } from "vue";
import { props } from "./api";
import WMessageItem from "./WMessageItem";
import type { MessageProps } from "../../../types/components/WMessage";

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
    return `w-msg-${id}`;
  }
})()

export default defineComponent({
  name: 'WMessageList',
  props,
  setup(props, { expose }) {
    const messageList = ref<Array<MessageOptions>>([]);
    const domList = ref<Array<InstanceType<typeof WMessageItem>>>([]);

    const add = (item: MessageOptions) => {
      item.id = getKey();
      messageList.value.push(item);
    }

    const remove = (index: number) => {
      messageList.value.splice(index, 1);
    }

    expose({ add, messageList, domList });

    return () => {
      if (!messageList.value.length) return;

      const messages = messageList.value.map((item, index) =>
        h(WMessageItem, {
          ref: ref => {
            if (ref) {
              domList.value.push(ref as InstanceType<typeof WMessageItem>);
            }
          },
          key: item.id,
          ...item,
          onCloseDuration: () => remove(index)
        }))

      return (
        <Teleport to={'body'}>
          <div class={`w-message-list w-message-list_${props.direction}`}>
            {messages}
          </div>
        </Teleport>
      )
    }
  }
})
