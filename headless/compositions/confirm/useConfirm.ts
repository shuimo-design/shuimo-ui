/**
 * @description 命令式确认框 composable
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 用法：
 *   const confirm = useConfirm();
 *   const result = await confirm('确定要删除吗？');
 *   // result 为 true 表示用户点击了确认，false 表示取消或关闭
 */
import { createApp, h, ref } from 'vue';
import MConfirm from '../../components/message/confirm/MConfirm';

/** 命令式调用参数类型 */
type ConfirmConfig = {
  content?: string;
  confirmText?: string;
  cancelText?: string;
};

export function useConfirm() {
  /**
   * 弹出确认框，返回 Promise<boolean>
   * @param content 字符串内容 或 配置对象
   */
  return function confirm(content: string | ConfirmConfig): Promise<boolean> {
    return new Promise((resolve) => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const config = typeof content === 'string' ? { content } : content;
      const visible = ref(true);

      /** 卸载并移除挂载容器 */
      const cleanup = () => {
        app.unmount();
        document.body.removeChild(container);
      };

      const app = createApp({
        setup() {
          return () => h(MConfirm, {
            ...config,
            visible: visible.value,
            'onUpdate:visible': (val: boolean) => {
              visible.value = val;
              // 遮罩点击关闭时（mask.clickClose 为 true 时才会触发），视为取消
              if (!val) {
                resolve(false);
                cleanup();
              }
            },
            onConfirm: () => {
              resolve(true);
              cleanup();
            },
            onCancel: () => {
              resolve(false);
              cleanup();
            },
          });
        },
      });

      app.mount(container);
    });
  };
}
