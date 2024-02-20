/**
 * @description core grid hook
 * @author 阿怪
 * @date 2023/06/22 00:38
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { GridProps } from './index';
import { Options } from '../../../compositions/common/defineCore.ts';
import { ref } from 'vue';
import { useElementSize } from '../../../compositions/common/useElementSize.ts';

const fixNum = (num?: number | string) => {
  if (typeof num === 'number') {
    return `${num}px`;
  }
  return num;
};

const removePx = (num?: number | string) => {
  if (typeof num === 'string') {
    return Number(num.replace('px', ''));
  }
  return num;
};

export function useGrid(options: Options<{
  props: GridProps
}>) {
  const gridRef = ref<HTMLElement | null>(null);
  const { w, h } = useElementSize(gridRef);
  const getGridClass = () => {
    return [`m-grid-${options.props.direction}`];
  };

  const getStyle = () => {
    const { props } = options;
    return {
      width: props.w,
      height: props.h,
      '--m-grid-col-gap': fixNum(props.colGap) ?? fixNum(props.gap) ?? 0,
      '--m-grid-direction': props.direction ?? 'row',
    };
  };

  const getSlotProp = (slot: any, key: string): number | undefined => {
    return slot.props[key];
  };

  const calcCells = (cells: any[]) => {
    const { props } = options;
    if (w.value === 0 || h.value === 0) {
      return;
    }
    const tan = (deg: number) => {
      return Math.round(Math.tan(deg * Math.PI / 180) * 1000000) / 1000000;
    };

    // row
    if (props.direction === 'row') {
      const { gapRotate } = props;
      const rowGap = removePx(props.rowGap) ?? removePx(props.gap) ?? 0;
      const wList = cells.map(cell => getSlotProp(cell, 'w'));
      const length = wList.length;
      const emptyLength = wList.filter(e => e === undefined).length;
      const usedLength = wList.reduce((a, b) => (a ?? 0) + (b ?? 0)) ?? 0;
      const totalGap = (length - 1) * rowGap;
      const remainW = w.value - totalGap - usedLength;
      const mLeft = [0, ...props.gapRotate.map(e => h.value * tan(e))];
      if (emptyLength !== 0) {
        // 平均数
        const average = remainW / emptyLength;
        wList.forEach((e, i) => {
          if (e === undefined) {
            wList[i] = average;
          }
        });
      }

      wList.forEach((w, i) => {
        cells[i].props.w = w;
        cells[i].props.b = gapRotate[i] ?? 0;
        cells[i].props.d = gapRotate[i - 1] ?? 0;
        if (mLeft[i] !== undefined && mLeft[i] !== 0) {
          cells[i].props.style = {
            'margin-left': `-${mLeft[i]}px`,
          };
        }
      });

    }


  };


  return {
    getStyle,
    getGridClass,
    gridRef,
    calcCells,
  };

}
