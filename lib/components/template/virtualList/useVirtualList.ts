/**
 * @description core virtualList hook
 * @author 阿怪
 * @date 2023/07/18 20:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { VirtualListProps } from './index';
import { Options } from '../../../compositions/common/defineCore.ts';
import { ref } from 'vue';
import useEntries from '../../../compositions/virtualList/useEntries.ts';
import useContainerObserver from '../../../compositions/virtualList/useContainerObserver.ts';

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
  props: VirtualListProps,
  event: {
    reachBottom: () => void,
  }
}>) {

  const containerRef = ref<HTMLElement | null>(null);
  const getChildren = () => {
    return containerRef.value?.children?.[0].children?.[0].children ?? [] as unknown as HTMLCollection;
  };
  let visibleCount = 5; // base is 5
  const overScanCoefficient = 1;
  const { list } = options.props;
  const total = list.length;

  const from = 0;

  const displayList = ref<{ data: any, index: number }[]>([]);

  const lastItemRef = ref<HTMLElement | null>(null);
  const baseY = 0;
  const styleRef = ref<any>({ 'transform': `translateY(${baseY}px)` });

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


  const getList = (from: number) => {
    const initRes = initBoundary({ from: from, total, visibleCount, overScanCoefficient });
    const { renderFrom, renderEnd } = initRes;
    Object.assign(info, initRes);
    // console.log(info);
    displayList.value = list.slice(renderFrom, renderEnd)
      .map((d, i) => ({ data: d, index: i + renderFrom }));
  };
  getList(from);

  const { cb } = useEntries({
    getChildren,
    getVisibleCount: () => visibleCount,
    getList,
    getInfo: () => info,
    setVisibleCount: count => {
      visibleCount = count;
    },
    getTotal: () => total,
    styleRef,
    reachBottom: options.event?.reachBottom ?? (() => {})
  });

  useContainerObserver({
    containerRef,
    callback: cb,
    getTarget: () => {
      return containerRef.value?.children?.[0].children?.[0].children ?? [] as unknown as HTMLCollection;
    }
  });

  return {
    displayList,
    containerRef,
    lastItemRef,
    styleRef
  };


}
