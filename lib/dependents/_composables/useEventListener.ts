/**
 * @description dom事件监听hook
 * @author youus
 * @date 2022/4/3 16:26
 * @version v1.0.0
 *
 * Hello, humor
 */

import { isRef, watch, unref, onMounted, onBeforeUnmount } from 'vue';

export default function useEventListener(target: any, event: string, handler: EventListenerOrEventListenerObject) {
  if (isRef(target)) {
    watch(target, (value: any, oldValue: any) => {
      oldValue?.removeEventListener(event, handler);
      value?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => {
      target.addEventListener(event, handler);
    });
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler);
  });
}
