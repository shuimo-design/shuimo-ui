/**
 * @description popper hook
 * @author 阿怪
 * @date 2023/1/29 10:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { arrow, autoUpdate, computePosition, ComputePositionConfig } from '@floating-ui/dom';

export type Placement =
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end';
export type PopperConfig = Partial<ComputePositionConfig>;

type DomStyle = { left: string; top: string; display: string; position: string };
export type PositionStyle = { style: DomStyle; arrowStyle: DomStyle, placement: Placement };

export const usePopper = (
  triggerNode: HTMLElement,
  popperNode: HTMLElement,
  update: (data: PositionStyle) => void,
  arrowNode?: HTMLElement,
  config?: PopperConfig
) => {

  const getPositionStyle = async () => {
    if (arrowNode && config?.middleware) {
      config.middleware.push(arrow({ element: arrowNode }));
    }


    const { x, y, placement, middlewareData } = await computePosition(triggerNode, popperNode, config);
    const res: PositionStyle = {
      style: {
        left: `${x}px`,
        top: `${y}px`,
        display: 'block',
        position: 'absolute'
      },
      arrowStyle: {
        left: `${middlewareData.arrow?.x ?? 0}px`,
        top: `${middlewareData.arrow?.y ?? 0}px`,
        display: 'block',
        position: 'absolute'
      },
      placement
    };
    update(res);

    return res;
  };

  const clear = autoUpdate(triggerNode, popperNode, getPositionStyle);


  return {
    getPositionStyle,
    clear
  };
};
