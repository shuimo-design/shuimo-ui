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
import { Ref, ref } from 'vue';
import { useResizeObserver } from './useResizeObserver';


export function useElementSize(
  target: Ref<HTMLElement | null>,
  // initialSize = { w: 0, h: 0 },
  // options: ResizeObserverOptions = {},
) {

  const w = ref(0);
  const h = ref(0);

  useResizeObserver(target, () => {
    const ele = target.value;
    if (window && ele) {
      const styles = window.getComputedStyle(ele);
      w.value = Number.parseFloat(styles.width);
      h.value = Number.parseFloat(styles.height);
    }
  });


  return {
    w, h,
  };
}
