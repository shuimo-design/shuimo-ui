/**
 * @description vue version message
 * @author 阿怪
 * @date 2023/05/22 16:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h, ref } from 'vue';
import useTeleport from '../../../composition/useTeleport';
import { listProps } from '@shuimo-design/core/lib/message/message/api';
import { MessageOptions, useMessageList } from '@shuimo-design/core/lib/message/message/useMessageList';
import MMessageItem from './MMessageItem';


export default defineComponent({
  name: 'MMessageList',
  props: listProps,
  setup: (props, { expose }) => {
    const messageList = ref<Array<MessageOptions>>([]);
    const domList = ref<Array<InstanceType<typeof MMessageItem>>>([]);

    const { baseClass, add, remove } = useMessageList({
      props,
      value: {
        messageListRef: messageList
      }
    });

    expose({ add, messageList, domList });

    return () => {
      if (!messageList.value.length) return;

      const messages = messageList.value.map((item, index) =>
        <MMessageItem
          ref={ref => {if (ref) {domList.value.push(ref as InstanceType<typeof MMessageItem>);}}}
          key={item.id} {...item} onCloseDuration={() => remove(index)}/>);

      return useTeleport({
        slot: <div class={baseClass}>{messages}</div>
      });
    };
  }
});
