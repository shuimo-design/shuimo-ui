/**
 * @description virtual list requestAnimationFrame hook
 * @author 阿怪
 * @date 2023/7/20 22:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * fix style any
 */
import { Ref } from 'vue';
import { ACTION } from './enums';


export default function useEntries(options: {
  getChildren: () => HTMLCollection,
  getVisibleCount: () => number,
  getList: (from: number) => void,
  getInfo: () => {
    renderFrom: number,
    realFrom: number,
    realEnd: number,
    renderEnd: number,
  },
  setVisibleCount: (count: number) => void,
  getTotal: () => number,
  reachBottom: () => void,
  styleRef: Ref<any>
}) {
  const entriesInfoWeakMap: WeakMap<Element, EntryInfo> = new WeakMap();
  const transformYList: number[] = [0]; // reduce transformY
  const onInit = (entries: IntersectionObserverEntry[]) => {

    // all entries visible, need reload list [todo: until visibleCount = entries.length]

    const info = options.getInfo();
    const { renderFrom, realFrom, realEnd } = info;
    if (entries[realFrom - renderFrom]?.isIntersecting && entries[realEnd - renderFrom - 1]?.isIntersecting) {
      const totalHeight = entries.map(e => e.boundingClientRect.height).reduce((a, b) => a + b, 0);
      const length = entries.length;
      const avgHeight = totalHeight / length;
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
        if (prevH == null) {
          console.error('prevH is null', realIndex, transformYList, e.target);
        } else {
          transformYList[realIndex] = prevH + e.boundingClientRect.height;
        }
      }

      entriesInfoWeakMap.set(e.target, {
        ratio: e.intersectionRatio,
        position: getPosition(e),
        realIndex,
        translateY: transformYList[realIndex],
      });
    });
  };


  const entriesHandler = (entries: IntersectionObserverEntry[]) => {

    const maxIndex = options.getTotal() - 1;
    let touchBottom = false;

    const actionList = entries.map(e => {
      const prevInfo = entriesInfoWeakMap.get(e.target)!;
      if (prevInfo == null) {
        console.error('prevInfo is null', e.target);
      }
      const action = getAction(e, prevInfo);
      prevInfo.ratio = e.intersectionRatio;

      if (prevInfo.realIndex === maxIndex) {
        if (e.isIntersecting) {
          touchBottom = true;
        }
      }


      return { action, target: e.target };
    });

    if (touchBottom) {
      options.reachBottom();
    }


    // get every action last target
    const actionMap = new Map<ACTION, Element[]>();
    actionList.forEach(({ action, target }) => {
      if (actionMap.has(action)) {
        actionMap.get(action)!.push(target);
      } else {
        actionMap.set(action, [target]);
      }
    });

    // 暂时先获取完全离开顶部index todo use enum
    let type = '下拉';
    let topEndTarget = actionMap.get(ACTION.ENTER_TOP_END);
    if (topEndTarget == null) {
      type = '上拉';
      topEndTarget = actionMap.get(ACTION.LEAVE_TOP_END);
    }
    if (topEndTarget != null) {
      const target = type === '上拉' ? topEndTarget[0] : topEndTarget[topEndTarget.length - 1];
      const info = entriesInfoWeakMap.get(target)!;
      options.getList(info.realIndex);
      options.styleRef.value = {
        transform: `translateY(${transformYList[info.realIndex - 1]}px)`,
      };
      return;
    }
    const bottomEndTarget = actionMap.get(ACTION.ENTER_BOTTOM_END);
    if (bottomEndTarget != null) {

      requestAnimationFrame(() => {

        const firstTargetInfo = entriesInfoWeakMap.get(entries[0].target);
        if (firstTargetInfo?.position === ACTION.LEAVE_TOP_START) {
          // beta --> A workaround that hasn't been fully tested
          const children = options.getChildren();
          const firstChild = children[0];
          if (firstChild) {
            const firstChildInfo = firstChild.getBoundingClientRect();
            if (firstChildInfo.bottom > entries[0].rootBounds!.bottom) {
              options.getList(0); // 开摆！！
              options.styleRef.value = { transform: `translateY(0px)` };
            }
          }

        }

      });

      return;
    }


  };

  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const cb = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entries.length === options.getChildren().length) {
      onInit(entries);
      return;
    }
    entriesHandler(entries);
  };


  return {
    cb,
  };


}

enum POSITION_TYPE {
  TOP,
  TOP_VISIBLE,
  VISIBLE,
  BOTTOM_VISIBLE,
  BOTTOM,
}

export const ACTION_POSITION_MAP: Record<POSITION_TYPE, any> = {
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


const getPosition = (entry: IntersectionObserverEntry) => {
  const { top, bottom } = entry.rootBounds!;
  const { top: entryTop, bottom: entryBottom } = entry.boundingClientRect;
  const ratio = entry.intersectionRatio;
  if (entryTop > top) {
    // means not top
    if (entryBottom < bottom) {
      return POSITION_TYPE.VISIBLE;
    }
    return ratio > 0 ? POSITION_TYPE.BOTTOM_VISIBLE : POSITION_TYPE.BOTTOM;
  }

  return ratio > 0 ? POSITION_TYPE.TOP_VISIBLE : POSITION_TYPE.TOP;
};

export const getAction = (entry: IntersectionObserverEntry, prevInfo: EntryInfo) => {
  const prevPosition = prevInfo.position as POSITION_TYPE;
  const currentPosition = getPosition(entry);
  let returnAction;

  if (prevPosition === currentPosition) {
    const ratioSub = entry.intersectionRatio - prevInfo.ratio;
    if (prevPosition === POSITION_TYPE.TOP_VISIBLE) {
      returnAction = ratioSub > 0 ? ACTION.ENTER_TOP_START : ACTION.LEAVE_TOP_END;
    } else if (prevPosition === POSITION_TYPE.BOTTOM_VISIBLE) {
      returnAction = ratioSub > 0 ? ACTION.ENTER_BOTTOM_START : ACTION.LEAVE_BOTTOM_END;
    } else {
      // console.log(prevInfo.ratio, prevPosition, entry.intersectionRatio, currentPosition);
      returnAction = ACTION.UNKNOWN;
    }
  } else {
    returnAction = ACTION_POSITION_MAP[prevPosition]?.[currentPosition];
    if (returnAction == null) {
      // console.log(prevInfo.ratio, prevPosition, entry.intersectionRatio, currentPosition);
      returnAction = ACTION.UNKNOWN;
    }
  }


  prevInfo.position = currentPosition;

  return returnAction;

};
