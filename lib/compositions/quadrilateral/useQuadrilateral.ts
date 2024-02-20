/**
 * @description quadrilateral hook
 * @author 阿怪
 * @date 2023/6/22 03:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import useQuadrilateralOptions from './useQuadrilateralOptions';
import useDegMode from './useDegMode';

const degMode = useDegMode;

export default function useQuadrilateral(options: {
  w: number,
  h: number,
  options: COptions,
  mode?: 'deg' | 'coordinate'
}) {
  const { A, B, C, D } = useQuadrilateralOptions({
    points: options.options.points,
    A: options.options.a,
    B: options.options.b,
    C: options.options.c,
    D: options.options.d,
  });

  const isXYEmpty = [A, B, C, D].every(e => e.x === undefined || e.y === undefined);
  const isDegMode = isXYEmpty || options.mode === 'deg';

  // deg mode
  const degList = [A, B, C, D].map(e => e.deg);
  if (isDegMode || degList.every(e => e !== undefined)) {
    return degMode(options.w, options.h, degList as number[]);
  }


  // coordinate mode


}
