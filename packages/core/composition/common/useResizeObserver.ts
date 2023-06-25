/**
 * @description resizeObserver hook
 * @author 阿怪
 * @date 2023/6/24 16:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * Learn from vueuse useResizeObserver
 */
import Effect from "./effect";
import { RMRef } from "./MRef";

export function useResizeObserver(
  target: RMRef<HTMLElement | null>,
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions = {},
) {

  let observer: ResizeObserver | undefined;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  }

  // vueuse used watch
  Effect.register(target, () => {
    if (target.value) {
      cleanup();
      observer = new ResizeObserver(callback);
      observer.observe(target.value, options);
    }
  })


  return {
    cleanup,
  }

}
