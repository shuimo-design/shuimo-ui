/**
 * @description headless message 命令式 API composable
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 使用方式：
 *   const message = useMessage();
 *   message.success('操作成功');
 *   message.error('发生错误', 5000);
 */
import { createApp, h } from 'vue';
import MMessageList from '../../components/message/message/MMessageList';
import { useMessageQueue } from '@shuimo-design/ui-core/components/message/message/useMessage';
import { MessageType } from '@shuimo-design/ui-core/components/message/message';

/** 单例队列实例 */
let instance: ReturnType<typeof useMessageQueue> | null = null;
/** 挂载容器节点 */
let container: HTMLElement | null = null;

/**
 * 确保容器与消息队列已初始化（单例懒加载）
 * 仅在浏览器环境中调用
 */
function ensureContainer(): ReturnType<typeof useMessageQueue> {
  if (instance) return instance;

  container = document.createElement('div');
  container.setAttribute('data-m-message-root', '');
  document.body.appendChild(container);

  instance = useMessageQueue();

  // 通过 createApp 挂载一个响应式的 MMessageList
  const app = createApp({
    setup() {
      return () =>
        h(MMessageList, {
          // 直接传递响应式数组，Vue 会追踪依赖
          messages: instance!.messages.value,
          onClose: (id: number) => instance!.remove(id),
        });
    },
  });

  app.mount(container);

  return instance;
}

/**
 * 消息命令式 API
 * 调用 info/success/warning/error 方法弹出对应类型的消息通知
 */
export function useMessage() {
  const queue = ensureContainer();

  const show = (type: MessageType, content: string, duration?: number): number =>
    queue.add({ type, content, duration });

  return {
    info: (content: string, duration?: number) => show('info', content, duration),
    success: (content: string, duration?: number) => show('success', content, duration),
    warning: (content: string, duration?: number) => show('warning', content, duration),
    error: (content: string, duration?: number) => show('error', content, duration),
  };
}
