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

export function useLoading() {

  const getStyle = (props: Pick<LoadingProps, 'speed' | 'sideLength'>) => {
    const animationSpeed = (props.speed ?? 1500) / 1000;
    const isNumber = !isNaN(Number(props.sideLength));
    const fixedSideLength = isNumber ? `${props.sideLength}px` : props.sideLength;
    return { '--m-loading-speed': `${animationSpeed}s`, height: fixedSideLength, width: fixedSideLength };
  };

  return {
    getStyle
  };
}
