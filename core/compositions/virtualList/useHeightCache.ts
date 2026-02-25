/**
 * @description 虚拟列表高度缓存
 * @author 阿怪
 * @date 2026/2/25 14:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 管理每个列表项的高度缓存，支持预估高度和实际高度
 * 提供基于 scrollTop 的二分查找定位
 */

export interface HeightCache {
  /** 更新指定索引的实际高度 */
  update: (index: number, height: number) => void;
  /** 获取指定索引的高度（实际或预估） */
  getHeight: (index: number) => number;
  /** 获取 [0, index) 的累计高度（即第 index 项的顶部偏移） */
  getOffset: (index: number) => number;
  /** 获取所有项的总高度 */
  getTotalHeight: () => number;
  /** 根据 scrollTop 二分查找对应的起始索引 */
  findIndex: (scrollTop: number) => number;
  /** 重置缓存（列表数据变化时） */
  reset: (total: number) => void;
}

export function createHeightCache(total: number, estimatedHeight: number): HeightCache {
  // 存储实际测量的高度，null 表示未测量
  const heights: (number | null)[] = new Array(total).fill(null);

  const getHeight = (index: number): number => {
    return heights[index] ?? estimatedHeight;
  };

  const update = (index: number, height: number) => {
    if (index >= 0 && index < heights.length) {
      heights[index] = height;
    }
  };

  const getOffset = (index: number): number => {
    let offset = 0;
    const end = Math.min(index, heights.length);
    for (let i = 0; i < end; i++) {
      offset += getHeight(i);
    }
    return offset;
  };

  const getTotalHeight = (): number => {
    return getOffset(heights.length);
  };

  /** 二分查找：scrollTop 对应的第一个可见项索引 */
  const findIndex = (scrollTop: number): number => {
    let low = 0;
    let high = heights.length - 1;

    while (low <= high) {
      const mid = (low + high) >>> 1;
      const offset = getOffset(mid);
      const offsetEnd = offset + getHeight(mid);

      if (offsetEnd <= scrollTop) {
        low = mid + 1;
      } else if (offset > scrollTop) {
        high = mid - 1;
      } else {
        return mid;
      }
    }

    return Math.min(low, heights.length - 1);
  };

  const reset = (newTotal: number) => {
    heights.length = newTotal;
    heights.fill(null);
  };

  return { update, getHeight, getOffset, getTotalHeight, findIndex, reset };
}
