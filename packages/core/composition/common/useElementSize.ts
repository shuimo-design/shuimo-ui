/**
 * @description element size hook
 * @author 阿怪
 * @date 2023/6/24 16:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * Learn from vueuse useElementSize
 */
import { MRef, MRefValue, RefInit, refWrapper, RMRef } from "./MRef";
import { useResizeObserver } from "./useResizeObserver";


export function useElementSize(
  refInit: RefInit,
  target: RMRef<HTMLElement | null>,
  initialSize = { w: 0, h: 0 },
  options: ResizeObserverOptions = {},
) {

  const w = refWrapper(0, refInit);
  const h = refWrapper(0, refInit);

  useResizeObserver(target, () => {
    const ele = target.value;
    if (window && ele) {
      const styles = window.getComputedStyle(ele);
      w.value = Number.parseFloat(styles.width);
      h.value = Number.parseFloat(styles.height);
    }
  })


  return {
    w, h
  }
}
