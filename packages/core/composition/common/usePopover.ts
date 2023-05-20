/**
 * @description popover hook, for component like select, datepicker, etc.
 * @author 阿怪
 * @date 2023/5/19 00:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { PopoverProps } from '../../lib/message/popover';
import { flip, offset, shift } from '@floating-ui/dom';

export default function usePopover(){
  const popoverOptions: PopoverProps = {
    placement: 'bottom-start',
    popper: {
      middleware: [offset({ crossAxis: 3 }), flip(), shift()]
    }
  };

  return {
    popoverOptions
  }
}
