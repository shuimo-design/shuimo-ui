/**
 * @description vue version message item
 * @author 阿怪
 * @date 2023/5/22 16:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, onMounted } from 'vue';
import { props } from './api.ts';
import { messageIcon, useMessageItem } from './useMessageItem.ts';
import { MessageProps } from './index';

export default defineComponent((_props: MessageProps, { emit }) => {
  const props = _props as Required<MessageProps>;


  const {
    onMountedEvent, setTimer,
    onMouseEnterHandler, onMouseLeaveHandler,
    domRef
  } = useMessageItem({
    props,
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
}, {
  name: 'MMessageItem',
  props,
  emits: ['closeDuration']
});
