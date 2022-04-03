import type { Placement } from '../../dependents/_composables/usePopper'

export interface WPopoverProps {
  placement: Placement;
  
  disableClickAway?: boolean;
  
  offsetSkid?: string;
  
  offsetDistance?: string;
  
  hover?: boolean;
  
  show?: boolean
  
  disabled?: boolean
  
  openDelay?: number;
  
  closeDelay?: number;
  
  interactive?: boolean;
  
  locked?: boolean;
  
  content?: string
}