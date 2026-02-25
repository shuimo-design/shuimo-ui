/**
 * @description headless message 单条消息组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   <div class="m-message m-message-{type}">
 *     [default slot 或 props.content]
 *   </div>
 */
import { defineComponent } from 'vue';
import { MessageCore } from '@shuimo-design/ui-core/components/message/message';
import { MessageProps } from '@shuimo-design/ui-core/components/message/message';

const { messageProps } = MessageCore;

export default defineComponent((_props: MessageProps, _ctx: any) => {
  const props = _props as Required<MessageProps>;
  const { slots, emit } = _ctx;

  /** 关闭按钮点击 */
  const onClose = () => {
    emit('close');
  };

  return () => (
    <div class={['m-message', `m-message-${props.type}`]}>
      <div class="m-message-content">
        {slots.default ? slots.default() : props.content}
      </div>
      <span class="m-message-close" onClick={onClose} />
    </div>
  );
}, {
  name: 'MMessage',
  props: messageProps,
  emits: ['close'],
});
