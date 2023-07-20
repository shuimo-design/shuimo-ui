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
  callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void
}) {
  let ob: IntersectionObserver;

  const getChildren = () => {
    // magic!! because the MVirtualList has three div wrapper
    return options.containerRef.value?.children?.[0].children?.[0].children ?? [] as unknown as HTMLCollection;
  };

  const toObserve = (domList: HTMLCollection) => {
    if (domList) {
      for (let i = 0; i < domList.length; i++) {
        ob.observe(domList[i]);
      }
    }
  };

  const clearObserve = (domList: HTMLCollection) => {
    if (domList) {
      for (let i = 0; i < domList.length; i++) {
        ob.unobserve(domList[i]);
      }
    }
  };


  const initOb = () => {
    if (ob) {ob.disconnect();}
    ob = new IntersectionObserver(options.callback, {
      root: options.containerRef.value,
      threshold: [0, 1]
    });
  };


  useResizeObserver(options.containerRef, () => {
    if (options.containerRef.value) {
      if (!ob) {initOb();}
      const children = getChildren();
      clearObserve(children);
      toObserve(children);
    }
  });


}
