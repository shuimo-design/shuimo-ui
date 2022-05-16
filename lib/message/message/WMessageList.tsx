/**
 * @description messageList组件
 * @author: qunbotop
 * @date 2022/5/16 4:37 下午
 * @version V2.0.0
 */
import { defineComponent, ref, Teleport } from "vue";
import { props } from "./api";
import Message from "./WMessageItem";
import { MessageProps } from "./type";

/**
  * @description MessageList使用到的属性
  */
interface MessageOptions extends MessageProps {
  id?: number
}

const getKey = (() => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  }
})()

export default defineComponent({
  name: 'WMessageList',
  props,
  setup(props, { expose }) {
    const messageList = ref<Array<MessageOptions>>([]);
    const domList = ref<Array<any>>([]);
    
    const add = (item: MessageOptions) => {
      item.id = getKey();
      messageList.value.push(item);
    }

    const remove = (index: number) => {
      messageList.value.splice(index, 1);
    }

    const getProps = (item: MessageOptions, index: number) => {
      return {
        ...item,
        onCloseDuration: () => remove(index),
      }
    }

    const messageItemDom = (element: any) => {
      if (element) {
        domList.value.push(element);
      }
    }
    
    expose({ add, messageList, domList });

    return () => {
      if (!messageList.value.length) return;

      return (
        <Teleport to={'body'}>
          <div class={`w-message-list w-message-list_${props.direction}`}>
            {
              messageList.value.map((item, index) => (
                <Message ref={messageItemDom}
                         key={item.id}
                         {...getProps(item, index)}/>
              ))
            }
          </div>
        </Teleport>
      )
    }
  }
})
