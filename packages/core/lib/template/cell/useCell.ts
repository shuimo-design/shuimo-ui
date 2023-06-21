/**
 * @description core cell hook
 * @author 阿怪
 * @date 2023/06/21 01:05
 * @version v0.0.1-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { CellProps } from './index';
import { Options } from '../../../composition/common/defineCore';


export enum CELL_POSITION {
  LEFT_TOP = 'top-left',
  LEFT_BOTTOM = 'bottom-left',
  RIGHT_TOP = 'top-right',
  RIGHT_BOTTOM = 'bottom-right'
}

export const CELL_OPTIONS = {
  [CELL_POSITION.LEFT_TOP]: {
    '--m-cell-bl-to': 'top center',
    '--m-cell-bb-r': '0'
  },
  [CELL_POSITION.LEFT_BOTTOM]: {
    '--m-cell-bl-to': 'bottom center',
    '--m-cell-bt-r': '0'
  },
  [CELL_POSITION.RIGHT_TOP]: {
    '--m-cell-br-to': 'top center',
    '--m-cell-bb-l': '0'
  },
  [CELL_POSITION.RIGHT_BOTTOM]: {
    '--m-cell-br-to': 'bottom center',
    '--m-cell-bb-r': '0'
  }
};


export function useCell(options: Options<{
  props: CellProps
}>) {

  const { props } = options;

  const mCellClass = () => {
    return [
      props.rotatePosition?.includes('top') ? 'm-cell-b-top' : 'm-cell-b-bottom',
      props.rotatePosition?.includes('left') ? 'm-cell-b-left' : 'm-cell-b-right'
    ];
  };

  const getDeg = () => {
    if (props.deg == null) {
      return 0;
    }

    const isRight = props.rotatePosition?.includes('right');
    const isBottom = props.rotatePosition?.includes('bottom');
    const shouldInvert = isRight !== isBottom;

    return shouldInvert ? props.deg * -1 : props.deg;
  };

  const getStyle = (_pec: number) => {
    const pec = Math.abs(_pec);
    switch (props.rotatePosition) {
      case 'top-left':
        return {
          '--m-cell-clip-path': `polygon(0% 0%, 100% 0%, 100% 100%, ${pec * 100}% 100%)`
        };
      case 'bottom-left':
        return {
          '--m-cell-clip-path': `polygon(${pec * 100}% 0%, 100% 0%, 100% 100%, 0% 100%)`
        };
      case 'top-right':
        return {
          '--m-cell-clip-path': `polygon(0% 0%, 100% 0%, ${(1 - pec) * 100}% 100%, 0% 100%)`
        };
      case 'bottom-right':
        return {
          '--m-cell-clip-path': `polygon(0% 0%, ${(1 - pec) * 100}% 0%, 100% 100%, 0% 100%)`
        };
    }
  };


  return {
    mCellClass,
    getDeg,
    getStyle
  };

}
