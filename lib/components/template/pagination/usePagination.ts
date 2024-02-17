/**
 * @description core pagination hook
 * @author 阿怪
 * @date 2023/05/25 23:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { PaginationProps } from './index';
import { Options } from '../../../compositions/common/defineCore.ts';
import { Ref, ref } from 'vue';


/**
 * ue to the need for elegant interaction near the button, the button needs to be rendered symmetrically,
 * so it must be an odd number
 */
const oddNum = (num: number) => {
  return num % 2 === 0 ? num + 1 : num;
};

export type Pager = {
  value: number,
  type: 'number',
  isCurrent: boolean,
  jump?: number
} | {
  value: string,
  type: 'folded',
  isCurrent: false,
  jump: number
}

export function usePagination(
  options: Options<{
    props: PaginationProps,
    value: {
      currentValue: number
    }
  }>
) {

  const {  value } = options;

  const currentValueRef = ref(value.currentValue);


  const getPageBtnLength = () => {
    const { total, pageSize } = options.props;
    return Math.ceil(total / pageSize);
  };

  const toPager = (value: number | string, config?: Partial<Omit<Pager, 'value'>>) => {
    return {
      value,
      type: config?.type ?? 'number',
      isCurrent: currentValueRef.value === value,
      jump: config?.jump ?? value
    } as Pager;
  };

  const toFoldedPager = (jump: number): Pager => {
    return toPager('...', { type: 'folded', jump });
  };

  const getPageNumList: () => Pager[] = () => {
    const pageBtnLength = getPageBtnLength();
    const {
      total, pageSize,
      foldedMaxPageBtn, maxPageBtn,
      showEdgePageNum
    } = options.props;

    if (total <= pageSize) {
      return [toPager(1)];
    }
    if (!maxPageBtn || getPageBtnLength() <= maxPageBtn || foldedMaxPageBtn && foldedMaxPageBtn >= pageBtnLength - 1) {
      return getPageNumListRange(1, pageBtnLength);
    }
    const foldedMaxPageBtnOdd = Math.max(oddNum(foldedMaxPageBtn ?? 5), 1); // this nub must be odd

    const edgeConfig = {
      length: showEdgePageNum ? 1 : 0,
      rightStartSub: showEdgePageNum ? 0 : 1
    };
    // remove edge page num
    const btnNumWithoutEdge = foldedMaxPageBtnOdd - (showEdgePageNum ? 2 : 0);
    const pageEdge = (btnNumWithoutEdge - 1) / 2;
    const leftEdgeNum = pageEdge + 2;
    const rightEdgeNum = pageBtnLength - pageEdge - 1;
    const rightStart = pageBtnLength - foldedMaxPageBtnOdd + 2 - edgeConfig.rightStartSub;


    if (currentValueRef.value <= leftEdgeNum) {
      const numLength = foldedMaxPageBtnOdd - edgeConfig.length;
      const res: Pager[] = [
        ...getPageNumListRange(1, numLength),
        toFoldedPager(1 + numLength)
      ];
      if (showEdgePageNum) {
        res.push(toPager(pageBtnLength));
      }
      return res;
    }
    if (currentValueRef.value >= rightEdgeNum) {
      const res: Pager[] = [];
      if (showEdgePageNum) {
        res.push(toPager(1));
      }
      res.push(toFoldedPager(rightStart - 1), ...getPageNumListRange(rightStart, foldedMaxPageBtnOdd - edgeConfig.length));
      return res;
    }
    const leftStart = currentValueRef.value - pageEdge;
    const rightEnd = currentValueRef.value + pageEdge;
    const leftFolded = Math.abs(leftStart - 1) > 2 || !showEdgePageNum ? toFoldedPager(leftStart - 1) : toPager(showEdgePageNum ? 2 : 1);
    const rightFolded = Math.abs(rightEnd - pageBtnLength) > 2 || !showEdgePageNum ? toFoldedPager(rightEnd + 1) : toPager(showEdgePageNum ? pageBtnLength - 1 : pageBtnLength);

    const res: Pager[] = [];
    if (showEdgePageNum) {
      res.push(toPager(1));
    }

    res.push(leftFolded,
      ...getPageNumListRange(leftStart, foldedMaxPageBtnOdd - edgeConfig.length * 2),
      rightFolded);

    if (showEdgePageNum) {
      res.push(toPager(pageBtnLength));
    }

    return res;
  };

  const getPageNumListRange = (start: number, length: number) => {
    return Array.from({ length }, (_, i) => toPager(i + start));
  };

  return {
    getPageNumList,
    getPageBtnLength
  };

}
