import { PropType } from 'vue';
import { WPopoverProps } from './type';

export default {
  placement: {
    type: String as PropType<WPopoverProps['placement']>,
    default: 'bottom',
    validator: (value: string) => [
      'auto',
      'auto-start',
      "auto-end",
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'right',
      'right-start',
      'right-end',
      'left',
      'left-start',
      'left-end',
    ].includes(value)
  },
  /**
   * Disables automatically closing the popover when the user clicks away from it
   */
  disableClickAway: {
    type: Boolean,
    default: false,
  },
  /**
   * Offset in pixels along the trigger element
   */
  offsetSkid: {
    type: String,
    default: '0',
  },
  /**
   * Offset in pixels away from the trigger element
   */
  offsetDistance: {
    type: String,
    default: '12',
  },
  /**
   * Trigger the popper on hover
   */
  hover: {
    type: Boolean,
    default: false,
  },
  /**
   * Manually open/close the Popper, other events are ignored if this prop is set
   */
  show: {
    type: Boolean,
    default: null,
  },
  /**
   * Disables the Popper. If it was already open, it will be closed.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * Open the Popper after a delay (ms).
   */
  openDelay: {
    type: [Number] as PropType<WPopoverProps['openDelay']>,
    default: 0,
  },
  /**
   * Close the Popper after a delay (ms).
   */
  closeDelay: {
    type: [Number] as PropType<WPopoverProps['closeDelay']>,
    default: 0,
  },
  /**
   * If the Popper should be interactive, it will close when clicked/hovered if false
   */
  interactive: {
    type: Boolean,
    default: true,
  },
  /**
   * Lock the Popper into place, it will not flip dynamically when it runs out of space if true
   */
  locked: {
    type: Boolean,
    default: false,
  },
  /**
   * If the content is just a simple string, it can be passed in as a prop
   */
  content: {
    type: String,
    default: '',
  },
}