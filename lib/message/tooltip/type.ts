import type { Placement } from '../../dependents/_composables/usePopper'

export interface WTooltipProps {
  placement: Placement;
  
  disableClickAway?: boolean;
  
  offsetSkid?: string;
  
  offsetDistance?: string;
  
  hover?: boolean;
  
  disabled?: boolean
  
  openDelay?: number;
  
  closeDelay?: number;
  
  arrowPadding?: string;
  
  interactive?: boolean;
  
  locked?: boolean;
  
  content?: string
}