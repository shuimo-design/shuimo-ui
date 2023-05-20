/**
 * @description popover hook
 * @author 阿怪
 * @date 2023/5/19 00:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref, VNode } from 'vue';
import MPopover from '../lib/message/MPopover';
import { PopoverProps } from '@shuimo-design/core/lib/message/popover';


export default function usePopover(popoverOptions: PopoverProps,className?:string) {

  const popoverInstance = ref<VNode | null>(null);
  const popoverRef = ref<typeof MPopover>();
  const withPopover = <T = VNode>(slots: { default: () => T, content: () => T, }) => {
    const p = <MPopover {...popoverOptions} class={className} ref={popoverRef}>{slots}</MPopover>;
    popoverInstance.value = p;
    return p;
  };

  return {
    popoverInstance,
    popoverRef,
    withPopover
  }

}
