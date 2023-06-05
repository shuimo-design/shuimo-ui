/**
 * @description vue version tooltip
 * @author 阿怪
 * @date 2023/06/05 01:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref, VNode } from 'vue';
import { props } from '@shuimo-design/core/lib/message/tooltip/api';
import { useTooltip } from '@shuimo-design/core/lib/message/tooltip/useTooltip';
import usePopover from '../../composition/usePopover';
import useBorder from '../../composition/useBorder';

export default defineComponent({
  name: 'MTooltip',
  props,
  setup: (props, { slots }) => {

    const { popoverOptions } = useTooltip({ props });
    const { withPopover } = usePopover(popoverOptions, 'm-tooltip');
    const { withBorder } = useBorder();

    return () => {
      return withPopover<VNode | VNode[]>({
        default: () => slots.default(),
        content: () => withBorder(<div class="m-tooltip-wrapper">{slots.content?.()}</div>),
        arrow: () => <div class="m-arrow" data-popper-arrow/>
      });
    };
  }
});
