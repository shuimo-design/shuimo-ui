/**
 * @description popper hook
 * @author 阿怪
 * @date 2023/1/29 10:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { autoUpdate, computePosition, ComputePositionConfig } from '@floating-ui/dom';

export type Placement =
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end';
export type PopperConfig = Partial<ComputePositionConfig>;

export const usePopper = (triggerNode: HTMLElement, popperNode: HTMLElement, config?: PopperConfig) => {

  const getPositionStyle = async () => {
    const { x, y } = await computePosition(triggerNode, popperNode, config);

    return {
      left: `${x}px`,
      top: `${y}px`,
      display: 'block',
      position: 'absolute'
    };
  };

  const clear = autoUpdate(triggerNode, popperNode, getPositionStyle);


  return {
    getPositionStyle,
    clear
  };
};
