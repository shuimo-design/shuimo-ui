/**
 * @description core loading hook
 * @author 阿怪
 * @date 2023/03/05 01:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 */
import { LoadingProps } from './index';

const DEFAULT_WIDTH = 64;
const DEFAULT_HEIGHT = 50;


export function useLoading() {

  const getStyle = (props: Pick<LoadingProps, 'speed' | 'sideLength' | 'size'>) => {
    const animationSpeed = (props.speed ?? 1500) / 1000;
    const isNumber = !isNaN(Number(props.sideLength));
    const fixedSideLength = isNumber ? `${props.sideLength}px` : props.sideLength;
    const logoWidth = (props.size ?? 1) * DEFAULT_WIDTH;
    const logoHeight = (props.size ?? 1) * DEFAULT_HEIGHT;
    return {
      '--m-loading-speed': `${animationSpeed}s`,
      '--m-loading-size-w': `${logoWidth}px`,
      '--m-loading-size-h': `${logoHeight}px`,
      height: fixedSideLength,
      width: fixedSideLength
    };
  };

  return {
    getStyle
  };
}
