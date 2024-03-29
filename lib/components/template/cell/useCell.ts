/**
 * @description core cell hook
 * @author 阿怪
 * @date 2023/06/21 01:05
 * @version v0.0.1-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { CellProps } from './index';
import { Options } from '../../../compositions/common/defineCore.ts';
import { ref } from 'vue';
import { useElementSize } from '../../../compositions/common/useElementSize.ts';
import useQuadrilateral from '../../../compositions/quadrilateral/useQuadrilateral.ts';

// export type PC = Partial<CSSStyleDeclaration>;
export type PC = any;


const BW = 3; // means border width, vertical border width actually is 6px ,use half
const BH = 2.5; // means border height, horizontal border height actually is 5px ,use half


export function useCell(options: Options<{
  props: CellProps,
}>) {
  const { props } = options;
  const cellRef = ref<HTMLElement | null>(null);

  const { w, h } = useElementSize(cellRef);

  const getSize = (_props = props) => {
    const res = useQuadrilateral({
      w: w.value, h: h.value, options: _props,
    });

    if (res) {
      const { A, B, C, D, path } = res;
      const styleA = {
        top: `${A.y - BH}px`,
        left: `${A.x}px`,
        width: `${A.length}px`,
        transform: A.deg ? `rotate(${A.deg}deg)` : undefined,
      };
      const styleB = {
        top: `${B.y - BH / 2}px`,
        right: `${w.value - B.x - BW / 2}px`,
        height: `${B.length}px`,
        transform: B.deg ? `rotate(${B.deg}deg)` : undefined,
      };
      const styleC = {
        bottom: `${h.value - C.y - BH}px`,
        right: `${w.value - C.x}px`,
        width: `${C.length}px`,
        transform: C.deg ? `rotate(${C.deg}deg)` : undefined,
      };
      const styleD = {
        bottom: `${h.value - D.y}px`,
        left: `${D.x - BW}px`,
        height: `${D.length}px`,
        transform: D.deg ? `rotate(${D.deg}deg)` : undefined,
      };
      const style = {
        'clip-path': path,
      };
      return {
        style, styleA, styleB, styleC, styleD,
      };
    } else {
      console.log(res);
    }
    return {};
  };


  return { getSize, cellRef };

}
