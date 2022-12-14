/**
 * @description 任意点击hook
 * @author youus
 * @date 2022/4/3 16:25
 * @version v1.0.0
 *
 * Hello, humor
 */
import type { Ref } from 'vue';
import { unref } from 'vue';
import useEventListener from './useEventListener';

export default function useClickAway(target: Ref, handler: (event: any) => void) {
  const event = 'pointerdown';

  if (typeof window === 'undefined' || !window) {
    return;
  }

  const listener = (event: any) => {
    const el = unref(target);
    if (!el) {
      return;
    }

    if (el === event.target || event.composedPath().includes(el)) {
      return;
    }

    handler(event);
  };

  return useEventListener(window, event, listener);
}
