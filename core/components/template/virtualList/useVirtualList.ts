/**
 * @description 虚拟列表核心 hook（sentinel 方案）
 * @author 阿怪
 * @date 2026/2/25 14:00
 * @version v3.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 基于 sentinel 哨兵元素 + scrollTop 绝对定位
 * 不依赖状态机连续性，快速滚动也能正确定位
 */
import { computed, nextTick, onMounted, ref, watch, toRef, onBeforeUnmount } from 'vue';
import { VirtualListProps } from './props';
import { createHeightCache } from '../../../compositions/virtualList/useHeightCache';
import { useSentinelObserver } from '../../../compositions/virtualList/useSentinelObserver';

export interface UseVirtualListOptions<T> {
  props: VirtualListProps<T>;
  /** 触底事件 */
  onReachBottom?: () => void;
}

export function useVirtualList<T>(options: UseVirtualListOptions<T>) {
  const { props, onReachBottom } = options;

  const containerRef = ref<HTMLElement | null>(null);
  const wrapperRef = ref<HTMLElement | null>(null);
  const topSentinelRef = ref<HTMLElement | null>(null);
  const bottomSentinelRef = ref<HTMLElement | null>(null);

  const listRef = toRef(() => props.list ?? []);
  const estimatedHeight = props.estimatedHeight ?? 40;
  const overScan = props.overScan ?? 1;

  // 高度缓存
  const heightCache = createHeightCache(listRef.value.length, estimatedHeight);

  // 当前渲染范围
  const renderFrom = ref(0);
  const renderEnd = ref(0);

  // spacer 总高度
  const totalHeight = ref(0);
  // wrapper 偏移
  const offsetY = ref(0);

  /** 根据 scrollTop 计算渲染范围 */
  const calcRange = () => {
    const container = containerRef.value;
    if (!container) return;

    const list = listRef.value;
    const total = list.length;
    if (total === 0) {
      renderFrom.value = 0;
      renderEnd.value = 0;
      totalHeight.value = 0;
      offsetY.value = 0;
      return;
    }

    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;

    // 用 scrollTop 直接定位起始索引
    const startIndex = heightCache.findIndex(scrollTop);
    // 计算可见数量
    let visibleEnd = startIndex;
    let accHeight = 0;
    while (visibleEnd < total && accHeight < containerHeight) {
      accHeight += heightCache.getHeight(visibleEnd);
      visibleEnd++;
    }

    const visibleCount = visibleEnd - startIndex;
    const overScanCount = Math.max(1, Math.floor(visibleCount * overScan));

    // 加上 overScan 缓冲区
    const from = Math.max(0, startIndex - overScanCount);
    const end = Math.min(total, visibleEnd + overScanCount);

    renderFrom.value = from;
    renderEnd.value = end;
    totalHeight.value = heightCache.getTotalHeight();
    offsetY.value = heightCache.getOffset(from);
  };

  /** 当前要渲染的数据切片 */
  const displayList = computed(() => {
    const list = listRef.value;
    return list.slice(renderFrom.value, renderEnd.value)
      .map((d, i) => ({ data: d as T, index: i + renderFrom.value }));
  });

  /**
   * 测量已渲染项的实际高度并更新缓存
   * 同时进行 scrollTop 补偿：当上方元素的真实高度和预估不同时，
   * 修正 scrollTop 使视觉位置不跳动
   */
  const measureItems = () => {
    const wrapper = wrapperRef.value;
    const container = containerRef.value;
    if (!wrapper || !container) return;

    const scrollTop = container.scrollTop;
    // 记录当前视口第一个可见项的旧偏移
    const firstVisibleIndex = heightCache.findIndex(scrollTop);
    const oldOffset = heightCache.getOffset(firstVisibleIndex);

    const children = wrapper.children;
    let hasChange = false;
    // 跳过 top sentinel（第一个子元素）
    for (let i = 1; i < children.length - 1; i++) {
      const child = children[i];
      const index = renderFrom.value + (i - 1); // -1 因为跳过 top sentinel
      const height = child.getBoundingClientRect().height;
      if (height > 0) {
        const oldHeight = heightCache.getHeight(index);
        if (Math.abs(oldHeight - height) > 0.5) {
          heightCache.update(index, height);
          hasChange = true;
        }
      }
    }

    if (hasChange) {
      // 计算补偿量：上方高度变化导致的偏移差
      const newOffset = heightCache.getOffset(firstVisibleIndex);
      const delta = newOffset - oldOffset;
      if (Math.abs(delta) > 0.5) {
        container.scrollTop = scrollTop + delta;
      }
    }

    // 更新总高度
    totalHeight.value = heightCache.getTotalHeight();
  };

  const update = () => {
    measureItems();
    calcRange();
    // 范围变化后，下一帧再测量一次（新渲染的元素）
    nextTick(() => {
      measureItems();
    });
  };

  // sentinel observer
  const { reobserve } = useSentinelObserver({
    containerRef,
    topSentinelRef,
    bottomSentinelRef,
    onUpdate: update,
    onReachBottom,
  });

  // scroll 事件驱动：用 rAF 节流，保证滚动过程中持续更新渲染范围
  let rafId: number | null = null;
  let scrollHandler: (() => void) | undefined;
  let scrollendHandler: (() => void) | undefined;

  const setupScrollListener = () => {
    const container = containerRef.value;
    if (!container) return;

    // 连续滚动时用 rAF 节流更新
    scrollHandler = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        calcRange();
      });
    };
    container.addEventListener('scroll', scrollHandler, { passive: true });

    // scrollend 做最终修正（测量 + 补偿）
    scrollendHandler = () => {
      measureItems();
      calcRange();
    };
    container.addEventListener('scrollend', scrollendHandler);
  };

  const cleanupScrollListener = () => {
    const container = containerRef.value;
    if (container) {
      if (scrollHandler) container.removeEventListener('scroll', scrollHandler);
      if (scrollendHandler) container.removeEventListener('scrollend', scrollendHandler);
    }
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  // 初始化
  onMounted(() => {
    const list = listRef.value;
    heightCache.reset(list.length);

    // 初始渲染
    calcRange();

    nextTick(() => {
      measureItems();
      calcRange();
      reobserve();
      setupScrollListener();
    });
  });

  // 响应 list 变化
  watch(listRef, (newList) => {
    heightCache.reset(newList.length);
    if (containerRef.value) {
      containerRef.value.scrollTop = 0;
    }
    calcRange();
    nextTick(() => {
      measureItems();
      calcRange();
      reobserve();
    });
  });

  onBeforeUnmount(cleanupScrollListener);

  return {
    displayList,
    containerRef,
    wrapperRef,
    topSentinelRef,
    bottomSentinelRef,
    totalHeight,
    offsetY,
  };
}
