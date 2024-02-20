/**
 * @description vue version tooltip
 * @author 阿怪
 * @date 2023/06/05 01:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, VNode } from 'vue';
import usePopover from '../../../../lib/compositions/usePopover';
import useBorder from '../../../../lib/compositions/useBorder';
import { props } from './api.ts';
import { useTooltip } from './useTooltip.ts';
import './tooltip.css';

export default defineComponent((props, { slots }) => {

  const { popoverOptions } = useTooltip({ props });
  const { withPopover } = usePopover(popoverOptions, 'm-tooltip');
  const { withBorder } = useBorder();

  return () => {
    return withPopover<VNode | VNode[]>({
      default: () => slots.default?.() ?? <></>,
      content: () => withBorder(<div class="m-tooltip-wrapper">{slots.content?.()}</div>),
      arrow: () => <div class="m-arrow" data-popper-arrow/>,
    });
  };
}, {
  name: 'MTooltip',
  props,
});
