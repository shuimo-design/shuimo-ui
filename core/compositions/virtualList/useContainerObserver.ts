/**
 * @description 容器 IntersectionObserver 管理
 * @author 阿怪
 * @date 2026/2/25 13:30
 * @version v2.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 管理 IntersectionObserver 的创建、observe/unobserve，配合 ResizeObserver 处理容器尺寸变化
 */
import { Ref } from 'vue';
import { useResizeObserver } from '../common/useResizeObserver';

export default function useContainerObserver(options: {
  containerRef: Ref<HTMLElement | null>;
  threshold?: number | number[];
  getTarget: () => ArrayLike<Element>;
  callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
}) {
  let ob: IntersectionObserver | undefined;
  const observeList: Element[] = [];

  // 队列：在 observer 创建前缓存操作
  const eventQueue: Array<{ target: ArrayLike<Element> | Element; type: 'observe' | 'unobserve' }> = [];

  const processTarget = (target: ArrayLike<Element> | Element, type: 'observe' | 'unobserve') => {
    if (!ob) {
      eventQueue.push({ target, type });
      return;
    }
    if ('length' in target) {
      for (let i = 0; i < target.length; i++) {
        if (target[i]) {
          ob[type](target[i]);
        }
      }
    } else {
      ob[type](target);
    }
  };

  const clearQueue = () => {
    while (eventQueue.length) {
      const { target, type } = eventQueue.shift()!;
      processTarget(target, type);
    }
  };

  const reObserve = (target: ArrayLike<Element>) => {
    // 先 unobserve 所有已观察的
    processTarget(observeList, 'unobserve');
    observeList.length = 0;
    // 再 observe 新的
    for (let i = 0; i < target.length; i++) {
      observeList.push(target[i]);
    }
    processTarget(target, 'observe');
  };

  const initOb = () => {
    if (ob) {
      ob.disconnect();
    }
    ob = new IntersectionObserver(options.callback, {
      root: options.containerRef.value,
      threshold: options.threshold ?? [0, 1],
    });
    clearQueue();
  };

  useResizeObserver(options.containerRef, () => {
    if (options.containerRef.value) {
      if (!ob) {
        initOb();
      }
      const target = options.getTarget();
      reObserve(target);
    }
  });

  return { reObserve };
}
