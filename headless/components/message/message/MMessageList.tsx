/**
 * @description headless message 列表容器组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构（通过 Teleport 挂载到 body）：
 *   <Teleport to="body">
 *     <div class="m-message-list m-message-list-{direction}">
 *       <MMessage v-for="item in messages" ... />
 *     </div>
 *   </Teleport>
 */
import { defineComponent, Teleport } from 'vue';
import { MessageItem } from '@shuimo-design/ui-core/components/message/message';
import { MessageDirectionType } from '@shuimo-design/ui-core/components/message/message';
import MMessage from './MMessage';
import './message.css';

/**
 * MMessageList 内部使用的 props 定义（不走 MCOPO，因为 messages 是内部传入的数组）
 */
const messageListInternalProps = {
  /** 消息列表方位，默认 top-right */
  direction: { type: String, default: 'top-right' },
  /** 当前消息队列（由 useMessageQueue 注入） */
  messages: { type: Array, default: () => [] },
};

export default defineComponent(
  (_props: { direction?: MessageDirectionType; messages?: MessageItem[]; onClose?: (id: number) => void }, _ctx: any) => {
    const props = _props as Required<{ direction: MessageDirectionType; messages: MessageItem[] }>;
    const { emit } = _ctx;

    const handleClose = (id: number) => {
      emit('close', id);
    };

    return () => (
      <Teleport to="body">
        <div class={['m-message-list', `m-message-list-${props.direction}`]}>
          {props.messages.map((item: MessageItem) => (
            <MMessage
              key={item.id}
              type={item.type}
              content={item.content}
              duration={item.duration}
              onClose={() => handleClose(item.id)}
            />
          ))}
        </div>
      </Teleport>
    );
  },
  {
    name: 'MMessageList',
    props: messageListInternalProps,
    emits: ['close'],
  },
);
