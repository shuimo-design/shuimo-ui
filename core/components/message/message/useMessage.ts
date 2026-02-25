/**
 * @description message 队列 composable
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';
import { MessageType } from './props';

/**
 * 消息队列中每一条消息的内部结构
 */
export interface MessageItem {
  id: number;
  type: MessageType;
  content: string;
  duration: number;
}

/**
 * 消息队列 composable
 * 管理消息的增删与自动关闭定时器
 */
export function useMessageQueue() {
  const messages = ref<MessageItem[]>([]);
  let nextId = 0;

  /**
   * 添加一条消息，duration > 0 时自动移除
   */
  const add = (props: { type?: MessageType; content: string; duration?: number }): number => {
    const id = nextId++;
    const item: MessageItem = {
      id,
      type: props.type ?? 'info',
      content: props.content,
      duration: props.duration ?? 3000,
    };
    messages.value.push(item);

    if (item.duration > 0) {
      setTimeout(() => remove(id), item.duration);
    }

    return id;
  };

  /**
   * 按 id 移除一条消息
   */
  const remove = (id: number): void => {
    const idx = messages.value.findIndex(m => m.id === id);
    if (idx !== -1) {
      messages.value.splice(idx, 1);
    }
  };

  return { messages, add, remove };
}
