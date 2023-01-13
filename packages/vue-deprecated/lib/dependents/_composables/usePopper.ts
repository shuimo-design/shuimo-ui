import type { Ref } from 'vue';
import { nextTick, onBeforeUnmount, reactive, toRefs, watch } from 'vue';
import { arrow, createPopper, flip, Instance, offset, preventOverflow } from '@popperjs/core';

const toInt = (x: string) => parseInt(x, 10);

export type Placement = 'auto' | 'auto-start' | 'auto-end'
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'right' | 'right-start' | 'right-end'
  | 'left' | 'left-start' | 'left-end'

interface IPopper {
  arrowPadding?: string,
  emit: (event: 'close:popper' | 'open:popper', ...args: any[]) => void,
  locked: boolean,
  offsetDistance: string,
  offsetSkid: string,
  placement: Ref<Placement>,
  popperNode: Ref,
  triggerNode: Ref
}

interface IState {
  isOpen: boolean,
  popperInstance?: Instance
}

export default function usePopper(popper: IPopper) {
  const { emit, arrowPadding = '0', placement } = popper;
  const state = reactive<IState>({
    isOpen: false
  });

  // Enable or disable event listeners to optimize performance.
  const setPopperEventListeners = (enabled: boolean) => {
    state.popperInstance?.setOptions((options: any) => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled }]
    }));
  };

  const enablePopperEventListeners = () => setPopperEventListeners(true);
  const disablePopperEventListeners = () => setPopperEventListeners(false);

  const close = () => {
    if (!state.isOpen) {
      return;
    }

    state.isOpen = false;
    emit('close:popper');
  };

  const open = () => {
    if (state.isOpen) {
      return;
    }

    state.isOpen = true;
    emit('open:popper');
  };

  // When isOpen or placement change
  watch([() => state.isOpen, placement], async ([isOpen]) => {
    if (isOpen) {
      await initializePopper();
      enablePopperEventListeners();
    } else {
      disablePopperEventListeners();
    }
  });

  const initializePopper = async () => {
    await nextTick();
    if (popper.triggerNode.value && popper.popperNode.value) {
      state.popperInstance = createPopper(popper.triggerNode.value, popper.popperNode.value, {
        placement: popper.placement.value,
        modifiers: [
          preventOverflow,
          flip,
          {
            name: 'flip',
            enabled: !popper.locked
          },
          arrow,
          {
            name: 'arrow',
            options: {
              padding: toInt(arrowPadding)
            }
          },
          offset,
          {
            name: 'offset',
            options: {
              offset: [toInt(popper.offsetSkid), toInt(popper.offsetDistance)]
            }
          }
        ]
      });

      // Update its position
      await state.popperInstance.update();
    }
  };

  onBeforeUnmount(() => {
    state.popperInstance?.destroy();
  });

  return {
    ...toRefs(state),
    open,
    close
  };
}
