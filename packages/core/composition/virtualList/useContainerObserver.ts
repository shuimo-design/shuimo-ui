/**
 * @description container observer hook
 * @author 阿怪
 * @date 2023/7/20 21:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { refWrapper } from '../common/MRef';
import { useResizeObserver } from '../common/useResizeObserver';

type RRefWrapper<T> = ReturnType<typeof refWrapper<T>>;
export default function useContainerObserver(options: {
  containerRef: RRefWrapper<HTMLElement | null>,
  threshold?: number | number[],
  getTarget: () => HTMLCollection | Element,
  callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void
}) {
  let ob: IntersectionObserver;

  type TargetType = HTMLCollection | Element | Element[];

  const eventQueue: Array<{ target: TargetType, type: 'observe' | 'unobserve' }> = [];
  const clearQueue = () => {
    if (ob) {
      while (eventQueue.length) {
        const { target, type } = eventQueue.shift()!;
        handlerEvent(target, type);
      }
    }
  };


  const handlerEvent = (target: TargetType, type: 'observe' | 'unobserve') => {

    if (!ob) {
      eventQueue.push({ target, type });
      return;
    }


    if (target) {
      if (Array.isArray(target)) {
        for (let i = 0; i < target.length; i++) {
          ob[type](target[i]);
        }
      } else {
        ob[type](target as Element);
      }
    }
  };


  const observeList: Element[] = [];
  const toObserve = (target: TargetType) => {
    if (Array.isArray(target)) {
      for (let i = 0; i < target.length; i++) {
        observeList.push(target[i]);
      }
    } else {
      observeList.push(target as Element);
    }
    handlerEvent(target, 'observe');
  };

  const clearObserve = (target: TargetType) => {
    handlerEvent(target, 'unobserve');
  };

  const reObserve = (target: TargetType) => {
    clearObserve(observeList);
    observeList.length = 0;
    toObserve(target);
  };


  const initOb = () => {
    if (ob) {ob.disconnect();}
    ob = new IntersectionObserver(options.callback, {
      root: options.containerRef.value,
      threshold: options.threshold ?? [0, 1]
    });
    clearQueue();
  };

  useResizeObserver(options.containerRef, () => {
    if (options.containerRef.value) {
      if (!ob) {initOb();}
      const target = options.getTarget();
      reObserve(target);
    }
  });


  return {
    reObserve
  };

}
