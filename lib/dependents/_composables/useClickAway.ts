/**
 * @Description 任意点击hook
 * @Author youus
 * @Date 2022/4/3 16:25
 * @Version v1.0.0
 *
 * Hello, humor
 */

import {Ref, unref} from 'vue';
import useEventListener from './useEventListener';


export default function useClickAway(target: Ref, handler: Function) {
  const event = "pointerdown";

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
