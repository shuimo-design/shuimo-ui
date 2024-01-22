/**
 * @description popover hook, for component like select, datepicker, etc.
 * @author 阿怪
 * @date 2023/5/19 00:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { PopoverProps } from '../../components/message/popover';
import { arrow, flip, offset, shift } from '@floating-ui/dom';
import { type OffsetOptions } from '@floating-ui/dom';

export {
  flip,
  offset,
  shift,
  arrow
};

export default function usePopover(
  props?: Partial<PopoverProps>,
  middleware?: {
    offset?: OffsetOptions
    extends?: any[]
  }
) {

  const offsetOptions = middleware?.offset ?? { crossAxis: 3 };


  const popoverOptions: PopoverProps = {
    placement: props?.placement ?? 'bottom-start',
    popper: {
      middleware: [
        offset(offsetOptions),
        flip(),
        shift(),
        ...middleware?.extends ?? []
      ]
    }
  };

  return {
    popoverOptions
  };
}
