/**
 * @description vue version message
 * @author 阿怪
 * @date 2023/05/22 16:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Component, defineComponent, ref } from 'vue';
import MMessageItem from './MMessageItem';
import { listProps } from './api.ts';
import useTeleport from '../../../compositions/common/useTeleport.ts';
import { useMessageList } from './useMessageList.ts';


export default defineComponent( (props, { expose }) => {

    const domList = ref<Array<Component<typeof MMessageItem>>>([]);

    const { baseClass, add, remove, messageListRef } = useMessageList({
      props
    });

    expose({ add, messageListRef, domList });

    return () => {
      if (!messageListRef.value.length) return;

      const messages = messageListRef.value.map((item, index) =>
        <MMessageItem
          ref={ref => {if (ref) {domList.value.push(ref as Component<typeof MMessageItem>);}}}
          key={item.id} {...item} onCloseDuration={() => remove(index)}/>);

      return useTeleport({
        slot: <div class={baseClass}>{messages}</div>
      });
    };
  },{
  name: 'MMessageList',
  props: listProps,
});
