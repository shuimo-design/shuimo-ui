/**
 * @description sentinel 哨兵元素 IntersectionObserver
 * @author 阿怪
 * @date 2026/2/25 14:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 只观察两个哨兵元素（顶部和底部），替代对每个列表项的 observe
 * 哨兵进入可视区触发回调，配合 scrollTop 定位
 */
import { Ref, watch, onBeforeUnmount } from 'vue';

export interface SentinelObserverOptions {
  containerRef: Ref<HTMLElement | null>;
  topSentinelRef: Ref<HTMLElement | null>;
  bottomSentinelRef: Ref<HTMLElement | null>;
  /** 需要更新可视列表时调用 */
  onUpdate: () => void;
  /** 底部哨兵完全进入可视区（触底） */
  onReachBottom?: () => void;
}

export function useSentinelObserver(options: SentinelObserverOptions) {
  let ob: IntersectionObserver | undefined;

  const cleanup = () => {
    if (ob) {
      ob.disconnect();
      ob = undefined;
    }
  };

  const initObserver = () => {
    const container = options.containerRef.value;
    if (!container) return;

    cleanup();

    ob = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          if (entry.target === options.bottomSentinelRef.value) {
            options.onUpdate();
            options.onReachBottom?.();
          } else if (entry.target === options.topSentinelRef.value) {
            options.onUpdate();
          }
        }
      },
      {
        root: container,
        threshold: 0,
      },
    );

    if (options.topSentinelRef.value) {
      ob.observe(options.topSentinelRef.value);
    }
    if (options.bottomSentinelRef.value) {
      ob.observe(options.bottomSentinelRef.value);
    }
  };

  /** 重新观察哨兵（列表更新后哨兵 DOM 可能重建） */
  const reobserve = () => {
    initObserver();
  };

  watch(options.containerRef, () => {
    if (options.containerRef.value) {
      initObserver();
    }
  });

  onBeforeUnmount(cleanup);

  return { reobserve, cleanup };
}
