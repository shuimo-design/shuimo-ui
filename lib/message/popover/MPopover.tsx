/**
 * @description MPopover
 * @author youus
 * @date 2022/4/3 18:07
 * @version v1.0.0
 *
 * Hello, humor
 */

import { defineComponent, onMounted, ref, toRefs, Transition } from 'vue';
import Printer from '../../other/printer/Printer';
import { props } from "./api";
import usePopper from '../../dependents/_composables/usePopper';
import usePopperCommon from '../../dependents/_composables/usePopperCommon';

const printer = Printer();

export default defineComponent({
  name: 'MPopover',
  props,
  emits: ['open:popper', 'close:popper'],
  setup(props, { slots, emit }) {
    const popperNode = ref();
    const triggerNode = ref();

    onMounted(() => {
      const children = slots.default && slots.default();

      if (children && children.length > 1) {
        return printer.error(
          `[MPopover]: The <MPopover> or <m-popover>component expects only one child element at its root. You passed ${children.length} child nodes.`,
        );
      }
    });

    const {
      locked,
      offsetDistance,
      offsetSkid,
      placement,
    } = toRefs(props);

    const popperHandleMap = usePopper({
      emit,
      locked: locked.value,
      offsetDistance: offsetDistance.value,
      offsetSkid: offsetSkid.value,
      placement,
      popperNode,
      triggerNode,
    });

    const {
      popperContainerNode,
      modifiedIsOpen,
      hover,
      togglePopper,
      openPopper,
      closePopper,
      interactive,
      shouldShowPopper,
      interactiveStyle
    } = usePopperCommon(props, slots, popperHandleMap, popperNode)

    return () => (
      <div
        class="m-popover"
        style={interactiveStyle.value}
        onMouseleave={() => hover.value && closePopper()}
        ref={popperContainerNode}
      >
        <div
          ref={triggerNode}
          onMouseover={() => hover.value && openPopper()}
          onClick={togglePopper}
          onFocus={openPopper}
          onKeyup={(e) => e.key === 'esc' && closePopper()}
        >
          {slots.default && slots.default()}
        </div>
        <Transition name="w-linear">
          <div
            onClick={() => !interactive.value && closePopper()}
            class="popover"
            ref={popperNode}
            hidden={!shouldShowPopper.value}
          >
            <div class="content">
              {slots.content && slots.content({ close: popperHandleMap.close, isOpen: modifiedIsOpen.value })}
            </div>
          </div>
        </Transition>
      </div>
    )
  },
})
