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
import { useResizeObserver } from '../../../composition/common/useResizeObserver';
import {
  ACTION,
  ACTION_POSITION,
  ACTION_POSITION_MAP,
  ACTION_TYPE,
  THRESHOLD_TYPE
} from '../../../composition/virtualList/enums';
import useContainerObserver from '../../../composition/virtualList/useContainerObserver';

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



const toStr = [
  'enter-top-start', 'enter-top-end',
  'enter-bottom-start', 'enter-bottom-end',
  'leave-top-start', 'leave-top-end',
  'leave-bottom-start', 'leave-bottom-end'
];

export const getAction = (entry: IntersectionObserverEntry, prevInfo: EntryInfo) => {
  const { top, bottom } = entry.rootBounds!;
  const { top: entryTop, bottom: entryBottom } = entry.boundingClientRect;

  const sub = entry.intersectionRatio - prevInfo.ratio;
  const actionType = sub > 0 ? ACTION_TYPE.ENTER : ACTION_TYPE.LEAVE;
  const isTop = Math.abs(top - entryTop) < Math.abs(entryBottom - bottom);

  // 判断 intersectionRatio 更接近 0 还是1
  const thresholdType = entry.intersectionRatio > 0.5 ? THRESHOLD_TYPE.ONE : THRESHOLD_TYPE.ZERO;

  // according to visibleType and isTop
  const actionPosition = ACTION_POSITION_MAP[actionType][isTop ? ACTION_POSITION.TOP : ACTION_POSITION.BOTTOM][thresholdType];

  // console.log(isTop, entry.target, toStr[actionPosition]);

  return actionPosition;
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

  const getList = (from: number) => {

    const initRes = initBoundary({ from, total, visibleCount, overScanCoefficient });
    const { renderFrom, renderEnd } = initRes;

    Object.assign(info, initRes);
    // console.log(info);
    displayList.value = list.slice(renderFrom, renderEnd).map((d, i) => ({ data: d, index: i + renderFrom }));
  };
  getList(from);

  const entriesInfoWeakMap: WeakMap<Element, EntryInfo> = new WeakMap();

  const transformYList: number[] = [0]; // reduce transformY

  const onInit = (entries: IntersectionObserverEntry[]) => {
    const { renderFrom, realFrom, realEnd, renderEnd } = info;
    if (entries[realFrom - renderFrom]?.intersectionRatio === 1 && entries[realEnd - renderFrom - 1]?.intersectionRatio === 1) {
      const totalHeight = entries.map(e => e.boundingClientRect.height).reduce((a, b) => a + b, 0);
      const length = entries.length;
      const avgHeight = totalHeight / length;
      const rootHeight = entries[0].rootBounds!.height;
      visibleCount = Math.ceil(rootHeight / avgHeight);
      getList(from);
    }

    entries.forEach((entry, index) => {
      const realIndex = index + renderFrom;

      if (realIndex < visibleCount) {
        transformYList[realIndex] = 0;
      } else {
        const prevHeight = transformYList[realIndex - 1];
        if (prevHeight == null) {
          console.error('prevHeight is null', realIndex, transformYList, entry.target);
        } else {
          transformYList[realIndex] = prevHeight + entry.boundingClientRect.height;
        }
      }

      entriesInfoWeakMap.set(entry.target, {
        ratio: entry.intersectionRatio,
        index,
        realHeight: entry.boundingClientRect.height,
        translateY: transformYList[realIndex]
      });
    });


  };


  const cb = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entries.length === getChildren().length) {
      onInit(entries);
      return;
    }
    let needUpdate = false;
    if (entries.length > 1) {
      console.log(entries.map(e => e.intersectionRatio), entries.map(e => e.target));
    }
    entries.forEach(entry => {
      const prevInfo = entriesInfoWeakMap.get(entry.target)!;
      const actionType = getAction(entry, prevInfo);
      const currentRatio = entry.intersectionRatio;
      if (prevInfo.ratio !== currentRatio) {
        // console.log(entry.target, entry.intersectionRatio, toStr[actionType], actionType);
        if (actionType === ACTION.LEAVE_TOP_END) {
          needUpdate = true;
          from = info.realFrom + 1;


          // 准备getList
          // get prev dom
          // const prevDom = entry.target.previousElementSibling;
          //
          // const prevDomInfo = entriesInfoWeakMap.get(prevDom!);
          // console.log(prevDomInfo)
          // if (prevDomInfo) {
          //   styleRef.value = {
          //     'transform': `translateY(${prevDomInfo.translateY}px)`
          //   };
          //   // if (from > visibleCount) {
          //   //   // baseY += prevDomInfo.realHeight;
          //   //   styleRef.value = {
          //   //     'transform': `translateY(${prevDomInfo.translateY}px)`
          //   //   };
          //   // }
          // }

        } else if (actionType === ACTION.ENTER_TOP_END) {
          needUpdate = true;
          from = info.realFrom - 1;
        }


        prevInfo.ratio = currentRatio;

      }
    });

    getList(from);
    styleRef.value = {
      'transform': `translateY(${transformYList[from - 1]}px)`
    };
  };


  useContainerObserver({
    containerRef,
    callback:cb
  })

  return {
    displayList,
    containerRef,
    lastItemRef,
    styleRef
  };


}
