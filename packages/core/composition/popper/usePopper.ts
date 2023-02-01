/**
 * @description popper hook
 * @author 阿怪
 * @date 2023/1/29 10:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createPopper } from '@popperjs/core';

export type Placement = 'auto' | 'auto-start' | 'auto-end'
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'right' | 'right-start' | 'right-end'
  | 'left' | 'left-start' | 'left-end'

export const usePopper = (triggerNode: HTMLElement, popperNode: HTMLElement, placement: Placement = 'auto') => {
  const res = createPopper(triggerNode, popperNode, {});
  return res;
};
