import type { Ref } from 'vue';
import { computed, ref, toRefs, watch, watchEffect } from 'vue';
import useContent from './useContent';
import useDebounceFn from './useDebounceFn';
import useClickAway from './useClickAway';

export default function usePopperCommon(props: any, slots: any, emit: any, popperHandleMap: any, popperNode: Ref) {
  const popperContainerNode = ref<HTMLElement | null>(null);

  const modifiedIsOpen = ref(false);

  const { closeDelay, content, disableClickAway, disabled, interactive, offsetDistance, openDelay, show, hover } =
    toRefs(props);

  const { hasContent } = useContent(slots, popperNode, content);
  //eslint-disable-next-line vue/no-ref-as-operand
  const manualMode = computed(() => show && show.value !== null);
  const invalid = computed(() => disabled.value || !hasContent.value);
  const shouldShowPopper = computed(() => popperHandleMap.isOpen.value && !invalid.value);
  const enableClickAway = computed(() => !disableClickAway.value);
  const interactiveStyle = computed(() =>
    interactive.value && offsetDistance.value !== 0 ?
      { border: `${offsetDistance.value}px solid transparent` } : undefined
  );

  const openPopperDebounce = useDebounceFn(popperHandleMap.open, openDelay);
  const closePopperDebounce = useDebounceFn(popperHandleMap.close, closeDelay);

  const openPopper = async () => {
    if (invalid.value) {
      return;
    }

    if (manualMode.value) {
      emit('update:show', true);
    } else {
      openPopperDebounce();
    }
  };

  const closePopper = async () => {
    if (manualMode.value) {
      emit('update:show', false);
    } else {
      closePopperDebounce();
    }
  };

  const togglePopper = () => {
    if (!manualMode.value) {
      popperHandleMap.isOpen.value ? closePopper() : openPopper();
    }
  };

  /**
   * If Popper is open, we automatically close it if it becomes
   * disabled or without content.
   */
  watch([hasContent, disabled], ([hasContent, disabled]) => {
    if (popperHandleMap.isOpen.value && (!hasContent || disabled)) {
      popperHandleMap.close();
    }
  });

  /**
   * In order to eliminate flickering or visibly empty Poppers due to
   * the transition when using the isOpen slot property, we need to return a
   * separate debounced value based on isOpen.
   */
  watch(popperHandleMap.isOpen, isOpen => {
    if (isOpen) {
      modifiedIsOpen.value = true;
    } else {
      useDebounceFn(() => {
        modifiedIsOpen.value = false;
      }, 200);
    }
  });

  /**
   * Watch for manual mode.
   */
  watchEffect(() => {
    if (manualMode.value) {
      show.value ? openPopperDebounce() : closePopperDebounce();
    }
  });

  /**
   * Use click away if it should be enabled.
   */
  watchEffect(() => {
    if (enableClickAway.value) {
      useClickAway(popperContainerNode, closePopper);
    }
  });

  return {
    popperContainerNode,
    modifiedIsOpen,
    hover,
    togglePopper,
    openPopper,
    closePopper,
    interactive,
    shouldShowPopper,
    interactiveStyle
  };
}
