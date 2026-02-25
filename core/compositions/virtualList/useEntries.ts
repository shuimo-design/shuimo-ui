/**
 * @description 虚拟列表 IntersectionObserver 回调处理
 * @author 阿怪
 * @date 2026/2/25 13:30
 * @version v2.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 基于 IntersectionObserver 方案，通过观察子元素可见性变化判断滚动方向和位置
 */
import { Ref } from 'vue';
import { ACTION, POSITION_TYPE, EntryInfo } from './enums';

/** 位置变化 → 动作映射表 */
const ACTION_POSITION_MAP: Record<POSITION_TYPE, Partial<Record<POSITION_TYPE, ACTION>>> = {
  [POSITION_TYPE.TOP]: {
    [POSITION_TYPE.TOP_VISIBLE]: ACTION.LEAVE_TOP_START,
    [POSITION_TYPE.VISIBLE]: ACTION.LEAVE_TOP_END,
    [POSITION_TYPE.BOTTOM_VISIBLE]: ACTION.ENTER_BOTTOM_START,
    [POSITION_TYPE.BOTTOM]: ACTION.ENTER_BOTTOM_END,
  },
  [POSITION_TYPE.TOP_VISIBLE]: {
    [POSITION_TYPE.TOP]: ACTION.ENTER_TOP_END,
    [POSITION_TYPE.VISIBLE]: ACTION.LEAVE_TOP_END,
    [POSITION_TYPE.BOTTOM_VISIBLE]: ACTION.ENTER_BOTTOM_START,
    [POSITION_TYPE.BOTTOM]: ACTION.ENTER_BOTTOM_END,
  },
  [POSITION_TYPE.VISIBLE]: {
    [POSITION_TYPE.TOP]: ACTION.ENTER_TOP_END,
    [POSITION_TYPE.TOP_VISIBLE]: ACTION.ENTER_TOP_START,
    [POSITION_TYPE.BOTTOM_VISIBLE]: ACTION.ENTER_BOTTOM_START,
    [POSITION_TYPE.BOTTOM]: ACTION.ENTER_BOTTOM_END,
  },
  [POSITION_TYPE.BOTTOM_VISIBLE]: {
    [POSITION_TYPE.TOP]: ACTION.ENTER_TOP_END,
    [POSITION_TYPE.TOP_VISIBLE]: ACTION.ENTER_TOP_START,
    [POSITION_TYPE.VISIBLE]: ACTION.LEAVE_BOTTOM_END,
    [POSITION_TYPE.BOTTOM]: ACTION.ENTER_BOTTOM_END,
  },
  [POSITION_TYPE.BOTTOM]: {
    [POSITION_TYPE.TOP]: ACTION.ENTER_TOP_END,
    [POSITION_TYPE.TOP_VISIBLE]: ACTION.ENTER_TOP_START,
    [POSITION_TYPE.VISIBLE]: ACTION.LEAVE_BOTTOM_END,
    [POSITION_TYPE.BOTTOM_VISIBLE]: ACTION.LEAVE_BOTTOM_START,
  },
};

/** 根据 entry 计算元素相对于容器的位置 */
const getPosition = (entry: IntersectionObserverEntry): POSITION_TYPE => {
  const { top, bottom } = entry.rootBounds!;
  const { top: entryTop, bottom: entryBottom } = entry.boundingClientRect;
  const ratio = entry.intersectionRatio;

  if (entryTop >= top) {
    if (entryBottom <= bottom) {
      return POSITION_TYPE.VISIBLE;
    }
    return ratio > 0 ? POSITION_TYPE.BOTTOM_VISIBLE : POSITION_TYPE.BOTTOM;
  }

  return ratio > 0 ? POSITION_TYPE.TOP_VISIBLE : POSITION_TYPE.TOP;
};

/** 根据前后位置变化得出动作 */
const getAction = (entry: IntersectionObserverEntry, prevInfo: EntryInfo): ACTION => {
  const prevPosition = prevInfo.position;
  const currentPosition = getPosition(entry);

  let action: ACTION;

  if (prevPosition === currentPosition) {
    const ratioSub = entry.intersectionRatio - prevInfo.ratio;
    if (prevPosition === POSITION_TYPE.TOP_VISIBLE) {
      action = ratioSub > 0 ? ACTION.ENTER_TOP_START : ACTION.LEAVE_TOP_END;
    } else if (prevPosition === POSITION_TYPE.BOTTOM_VISIBLE) {
      action = ratioSub > 0 ? ACTION.ENTER_BOTTOM_START : ACTION.LEAVE_BOTTOM_END;
    } else {
      action = ACTION.UNKNOWN;
    }
  } else {
    action = ACTION_POSITION_MAP[prevPosition]?.[currentPosition] ?? ACTION.UNKNOWN;
  }

  prevInfo.position = currentPosition;
  return action;
};


export interface UseEntriesOptions {
  /** 获取列表子元素 */
  getChildren: () => ArrayLike<Element>;
  /** 获取当前可见数量 */
  getVisibleCount: () => number;
  /** 从指定位置重新渲染列表 */
  getList: (from: number) => void;
  /** 获取当前渲染边界信息 */
  getInfo: () => {
    renderFrom: number;
    realFrom: number;
    realEnd: number;
    renderEnd: number;
  };
  /** 设置可见数量 */
  setVisibleCount: (count: number) => void;
  /** 获取总数 */
  getTotal: () => number;
  /** 触底回调 */
  reachBottom: () => void;
  /** translateY 样式 ref */
  styleRef: Ref<{ transform: string }>;
}

export default function useEntries(options: UseEntriesOptions) {
  const entriesInfoWeakMap: WeakMap<Element, EntryInfo> = new WeakMap();
  const transformYList: number[] = [0];

  /** 首次全部元素进入时的初始化 */
  const onInit = (entries: IntersectionObserverEntry[]) => {
    const info = options.getInfo();
    const { renderFrom, realFrom, realEnd } = info;

    // 检查可视范围内的元素是否都可见，用于计算 visibleCount
    const realFromEntry = entries[realFrom - renderFrom];
    const realEndEntry = entries[realEnd - renderFrom - 1];
    if (realFromEntry?.isIntersecting && realEndEntry?.isIntersecting) {
      const totalHeight = entries.reduce((sum, e) => sum + e.boundingClientRect.height, 0);
      const avgHeight = totalHeight / entries.length;
      const rootHeight = entries[0].rootBounds!.height;
      options.setVisibleCount(Math.ceil(rootHeight / avgHeight));
      options.getList(info.realFrom);
    }

    const visibleCount = options.getVisibleCount();
    entries.forEach((e, i) => {
      const realIndex = i + renderFrom;
      if (realIndex < visibleCount) {
        transformYList[realIndex] = 0;
      } else {
        const prevH = transformYList[realIndex - 1];
        if (prevH != null) {
          transformYList[realIndex] = prevH + e.boundingClientRect.height;
        }
      }

      entriesInfoWeakMap.set(e.target, {
        ratio: e.intersectionRatio,
        position: getPosition(e),
        realIndex,
        translateY: transformYList[realIndex] ?? 0,
      });
    });
  };

  /** 处理元素可见性变化 */
  const entriesHandler = (entries: IntersectionObserverEntry[]) => {
    const maxIndex = options.getTotal() - 1;
    let touchBottom = false;

    const actionList = entries.map(e => {
      const prevInfo = entriesInfoWeakMap.get(e.target);
      if (!prevInfo) {
        return { action: ACTION.UNKNOWN, target: e.target };
      }
      const action = getAction(e, prevInfo);
      prevInfo.ratio = e.intersectionRatio;

      if (prevInfo.realIndex === maxIndex && e.isIntersecting) {
        touchBottom = true;
      }

      return { action, target: e.target };
    });

    if (touchBottom) {
      options.reachBottom();
    }

    // 按 action 分组
    const actionMap = new Map<ACTION, Element[]>();
    actionList.forEach(({ action, target }) => {
      const list = actionMap.get(action);
      if (list) {
        list.push(target);
      } else {
        actionMap.set(action, [target]);
      }
    });

    // 上拉：元素从顶部完全离开 → 列表向下滚动
    const leaveTopTargets = actionMap.get(ACTION.LEAVE_TOP_END);
    if (leaveTopTargets) {
      const target = leaveTopTargets[0];
      const info = entriesInfoWeakMap.get(target);
      if (info) {
        options.getList(info.realIndex);
        const ty = transformYList[info.realIndex - 1] ?? 0;
        options.styleRef.value = { transform: `translateY(${ty}px)` };
      }
      return;
    }

    // 下拉：元素从顶部进入 → 列表向上滚动
    const enterTopTargets = actionMap.get(ACTION.ENTER_TOP_END);
    if (enterTopTargets) {
      const target = enterTopTargets[enterTopTargets.length - 1];
      const info = entriesInfoWeakMap.get(target);
      if (info) {
        options.getList(info.realIndex);
        const ty = transformYList[info.realIndex - 1] ?? 0;
        options.styleRef.value = { transform: `translateY(${ty}px)` };
      }
      return;
    }

    // 快速滚动到底部的边界修正
    const enterBottomTargets = actionMap.get(ACTION.ENTER_BOTTOM_END);
    if (enterBottomTargets) {
      requestAnimationFrame(() => {
        const firstEntry = entries[0];
        const firstInfo = entriesInfoWeakMap.get(firstEntry.target);
        if (firstInfo?.position === POSITION_TYPE.TOP) {
          // 所有元素都已经滚过去了，重置到顶部
          const children = options.getChildren();
          if (children.length > 0) {
            const firstChild = children[0];
            const rect = firstChild.getBoundingClientRect();
            const rootBottom = firstEntry.rootBounds?.bottom ?? 0;
            if (rect.bottom > rootBottom) {
              options.getList(0);
              options.styleRef.value = { transform: 'translateY(0px)' };
            }
          }
        }
      });
    }
  };

  /** IntersectionObserver 回调 */
  const cb = (entries: IntersectionObserverEntry[], _observer: IntersectionObserver) => {
    if (entries.length === options.getChildren().length) {
      onInit(entries);
      return;
    }
    entriesHandler(entries);
  };

  return { cb };
}
