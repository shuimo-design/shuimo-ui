/**
 * @description pagination 核心逻辑（分页按钮列表计算）
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Ref } from 'vue';
import { PaginationProps } from './props';


/**
 * 由于靠近按钮时需要优雅的交互，按钮需要对称渲染，因此折叠区域数量必须为奇数
 */
const oddNum = (num: number) => {
  return num % 2 === 0 ? num + 1 : num;
};

/**
 * 页码按钮描述类型
 * - type 为 'number' 时表示普通页码按钮
 * - type 为 'folded' 时表示折叠省略号，jump 为点击后跳转的目标页
 */
export type Pager = {
  value: number;
  type: 'number';
  isCurrent: boolean;
  jump?: number;
} | {
  value: string;
  type: 'folded';
  isCurrent: false;
  jump: number;
};

/**
 * 分页核心 hook
 * @param props 分页组件 props（需包含 total / pageSize / foldedMaxPageBtn / maxPageBtn / showEdgePageNum）
 * @param currentValue 当前页的响应式引用，由调用方维护
 */
export function usePagination(props: PaginationProps, currentValue: Ref<number>) {
  /**
   * 计算总页数
   */
  const getPageBtnLength = () => {
    const total = props.total ?? 0;
    const pageSize = props.pageSize ?? 10;
    return Math.ceil(total / pageSize);
  };

  /**
   * 构造普通页码 Pager 对象
   */
  const toPager = (value: number | string, config?: Partial<Omit<Pager, 'value'>>): Pager => {
    return {
      value,
      type: config?.type ?? 'number',
      isCurrent: currentValue.value === value,
      jump: config?.jump ?? (value as number),
    } as Pager;
  };

  /**
   * 构造折叠省略号 Pager 对象
   */
  const toFoldedPager = (jump: number): Pager => {
    return toPager('...', { type: 'folded', jump });
  };

  /**
   * 生成从 start 开始、长度为 length 的连续页码列表
   */
  const getPageNumListRange = (start: number, length: number): Pager[] => {
    return Array.from({ length }, (_, i) => toPager(i + start));
  };

  /**
   * 生成完整的页码按钮列表，包含折叠逻辑
   *
   * 折叠规则：
   * - 总页数 ≤ 1 页时：直接返回 [1]
   * - 总页数 ≤ maxPageBtn 或 foldedMaxPageBtn ≥ 总页数-1 时：不折叠，显示全部
   * - 当前页靠近左边缘：左侧全显 + 右侧折叠
   * - 当前页靠近右边缘：左侧折叠 + 右侧全显
   * - 当前页居中：两侧折叠
   */
  const getPageNumList = (): Pager[] => {
    const pageBtnLength = getPageBtnLength();
    const total = props.total ?? 0;
    const pageSize = props.pageSize ?? 10;
    const foldedMaxPageBtn = props.foldedMaxPageBtn ?? 5;
    const maxPageBtn = props.maxPageBtn ?? 10;
    const showEdgePageNum = props.showEdgePageNum ?? true;

    // 只有一页时无需完整分页列表
    if (total <= pageSize) {
      return [toPager(1)];
    }

    // 总页数未超过 maxPageBtn，或 foldedMaxPageBtn 已足够覆盖大部分页数时不折叠
    // eslint-disable-next-line @stylistic/no-mixed-operators
    if (!maxPageBtn || pageBtnLength <= maxPageBtn || foldedMaxPageBtn && foldedMaxPageBtn >= pageBtnLength - 1) {
      return getPageNumListRange(1, pageBtnLength);
    }

    // 折叠区域页码数必须为奇数，保证两侧对称
    const foldedMaxPageBtnOdd = Math.max(oddNum(foldedMaxPageBtn ?? 5), 1);

    const edgeConfig = {
      // showEdgePageNum 时首尾各占 1 个槽位
      length: showEdgePageNum ? 1 : 0,
      // 右侧起始位置的偏移修正
      rightStartSub: showEdgePageNum ? 0 : 1,
    };

    // 折叠区去掉首尾边缘页码后，剩余的中间页码数
    const btnNumWithoutEdge = foldedMaxPageBtnOdd - (showEdgePageNum ? 2 : 0);
    // 当前页两侧各显示的页码数
    const pageEdge = (btnNumWithoutEdge - 1) / 2;

    // 当前页 ≤ leftEdgeNum 时认为靠左，右侧折叠
    const leftEdgeNum = pageEdge + 2;
    // 当前页 ≥ rightEdgeNum 时认为靠右，左侧折叠
    const rightEdgeNum = pageBtnLength - pageEdge - 1;
    // 靠右时右侧连续区域的起始页
    const rightStart = pageBtnLength - foldedMaxPageBtnOdd + 2 - edgeConfig.rightStartSub;

    // ---- 靠左：左侧全显 + 右侧折叠 ----
    if (currentValue.value <= leftEdgeNum) {
      const numLength = foldedMaxPageBtnOdd - edgeConfig.length;
      const res: Pager[] = [
        ...getPageNumListRange(1, numLength),
        toFoldedPager(1 + numLength),
      ];
      if (showEdgePageNum) {
        res.push(toPager(pageBtnLength));
      }
      return res;
    }

    // ---- 靠右：左侧折叠 + 右侧全显 ----
    if (currentValue.value >= rightEdgeNum) {
      const res: Pager[] = [];
      if (showEdgePageNum) {
        res.push(toPager(1));
      }
      res.push(toFoldedPager(rightStart - 1), ...getPageNumListRange(rightStart, foldedMaxPageBtnOdd - edgeConfig.length));
      return res;
    }

    // ---- 居中：两侧折叠 ----
    const leftStart = currentValue.value - pageEdge;
    const rightEnd = currentValue.value + pageEdge;

    // 左侧折叠符：距离边缘超过 2 格时用省略号，否则直接显示相邻页码
    const leftFolded = Math.abs(leftStart - 1) > 2 || !showEdgePageNum
      ? toFoldedPager(leftStart - 1)
      : toPager(showEdgePageNum ? 2 : 1);

    // 右侧折叠符：同理
    const rightFolded = Math.abs(rightEnd - pageBtnLength) > 2 || !showEdgePageNum
      ? toFoldedPager(rightEnd + 1)
      : toPager(showEdgePageNum ? pageBtnLength - 1 : pageBtnLength);

    const res: Pager[] = [];
    if (showEdgePageNum) {
      res.push(toPager(1));
    }
    res.push(
      leftFolded,
      ...getPageNumListRange(leftStart, foldedMaxPageBtnOdd - edgeConfig.length * 2),
      rightFolded,
    );
    if (showEdgePageNum) {
      res.push(toPager(pageBtnLength));
    }

    return res;
  };

  return {
    getPageNumList,
    getPageBtnLength,
  };
}
