/**
 * @description core virtualList hook
 * @author 阿怪
 * @date 2023/07/18 20:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { VirtualListProps } from './index';
import { Options } from '../../../composition/common/defineCore';
import { RefInit, refWrapper } from '../../../composition/common/MRef';
import useContainerObserver from '../../../composition/virtualList/useContainerObserver';
import useEntries from '../../../composition/virtualList/useEntries';

export const initBoundary = (options: {
  from: number, // visible start number
  total: number, // list total length
  visibleCount: number, // visible items count
  overScanCoefficient: number, // over scan count
}) => {
  const { from, visibleCount, total, overScanCoefficient } = options;
  const realCounts = visibleCount * overScanCoefficient;
  const realFrom = Math.max(0, from);
  const renderFrom = Math.max(0, realFrom - realCounts);
  const realEnd = Math.min(total, realFrom + visibleCount);
  const renderEnd = Math.min(total, realEnd + realCounts);
  // active info
  const nextActiveIndex = Math.ceil((realEnd + renderEnd) / 2);
  return {
    renderFrom, realFrom, realEnd, renderEnd,
    nextActiveIndex
  };
};


export function useVirtualList(options: Options<{
  props: VirtualListProps
}>, refInit: RefInit) {

  const containerRef = refWrapper<HTMLElement | null>(null, refInit);
  const getChildren = () => {
    return containerRef.value?.children?.[0].children?.[0].children ?? [] as unknown as HTMLCollection;
  };
  let visibleCount = 5; // base is 5
  let overScanCoefficient = 1;
  const { list } = options.props;
  const total = list.length;

  let from = 0;

  const displayList = refWrapper([], refInit);

  const lastItemRef = refWrapper<HTMLElement | null>(null, refInit);
  let baseY = 0;
  const styleRef = refWrapper<any>({
    'transform': `translateY(${baseY}px)`
  }, refInit);

  /**
   * render info 渲染信息
   */
  const info = {
    renderFrom: 0,
    realFrom: 0,
    realEnd: visibleCount,
    renderEnd: visibleCount,
    nextActiveIndex: visibleCount
  };

  let stopFlag = false;

  const getList = (from :number) => {
    const initRes = initBoundary({ from: from, total, visibleCount, overScanCoefficient });
    const { renderFrom, renderEnd } = initRes;
    Object.assign(info, initRes);
    // console.log(info);
    displayList.value = list.slice(renderFrom, renderEnd)
      .map((d, i) => ({ data: d, index: i + renderFrom }));
  };
  getList(from);

  const entriesInfoWeakMap: WeakMap<Element, EntryInfo> = new WeakMap();

  const transformYList: number[] = [0]; // reduce transformY

  // const onInit = (entries: IntersectionObserverEntry[]) => {
  //   const { renderFrom, realFrom, realEnd, renderEnd } = info;
  //   if (entries[realFrom - renderFrom]?.intersectionRatio === 1 && entries[realEnd - renderFrom - 1]?.intersectionRatio === 1) {
  //     const totalHeight = entries.map(e => e.boundingClientRect.height).reduce((a, b) => a + b, 0);
  //     const length = entries.length;
  //     const avgHeight = totalHeight / length;
  //     const rootHeight = entries[0].rootBounds!.height;
  //     visibleCount = Math.ceil(rootHeight / avgHeight);
  //     getList(from);
  //   }
  //
  //   entries.forEach((entry, index) => {
  //     const realIndex = index + renderFrom;
  //
  //     if (realIndex < visibleCount) {
  //       transformYList[realIndex] = 0;
  //     } else {
  //       const prevHeight = transformYList[realIndex - 1];
  //       if (prevHeight == null) {
  //         console.error('prevHeight is null', realIndex, transformYList, entry.target);
  //       } else {
  //         transformYList[realIndex] = prevHeight + entry.boundingClientRect.height;
  //       }
  //     }
  //
  //     entriesInfoWeakMap.set(entry.target, {
  //       ratio: entry.intersectionRatio,
  //       index,
  //       realHeight: entry.boundingClientRect.height,
  //       translateY: transformYList[realIndex]
  //     });
  //   });
  //
  //
  // };

  const { cb } = useEntries({
    getTotal: () => {
      return getChildren().length;
    },
    getVisibleCount: () => visibleCount,
    getList,
    getInfo: () => info,
    setVisibleCount: count => {
      visibleCount = count;
    },
    styleRef
  });

  // const cb = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  //   if (entries.length === getChildren().length) {
  //     onInit(entries);
  //     return;
  //   }
  //   let needUpdate = false;
  //   if (entries.length > 1) {
  //     console.log(entries.map(e => e.intersectionRatio), entries.map(e => e.target));
  //   }
  //
  //
  //   getList(from);
  //   styleRef.value = {
  //     'transform': `translateY(${transformYList[from - 1]}px)`
  //   };
  // };


  useContainerObserver({
    containerRef,
    callback: cb
  });

  return {
    displayList,
    containerRef,
    lastItemRef,
    styleRef
  };


}
