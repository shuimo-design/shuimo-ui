/**
 * @description vue version message item
 * @author 阿怪
 * @date 2023/5/22 16:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h, ref, onMounted } from 'vue';
import { props } from '@shuimo-design/core/lib/message/message/api';
import { messageIcon, useMessageItem } from '@shuimo-design/core/lib/message/message/useMessageItem';

export default defineComponent({
  name: 'MMessageItem',
  props,
  emits: ['closeDuration'],
  setup: (props, { slots, emit }) => {

    const domRef = ref<HTMLElement | null>(null);

    const {
      onMountedEvent,setTimer,
      onMouseEnterHandler, onMouseLeaveHandler
    } = useMessageItem({
      props,
      value: { domRef },
      event: {
        closeDuration: () => {
          emit('closeDuration');
        }
      }
    });

    onMounted(() => {
      onMountedEvent();
      setTimer();
    });


    return () => {
      const iconDom = <img class={'m-message-list-icon'} src={`${messageIcon[props.type]}`}/>;
      const contentDom = <div class={'m-message-content'}>{props.content}</div>;
      return <div class="m-message-item" ref={domRef}
                  onMouseenter={onMouseEnterHandler} onMouseleave={onMouseLeaveHandler}>
        {iconDom}
        {contentDom}
      </div>;
    };
  }
});
