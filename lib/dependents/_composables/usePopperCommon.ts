import { computed, Ref, ref, toRefs, watch, watchEffect } from 'vue';
import useContent from './useContent';
import debounce from '../_utils/debounce';
import useClickAway from './useClickAway';

export default function usePopperCommon(props: any, slots: any, popperHandleMap: any, popperNode: Ref) {
  const popperContainerNode = ref<HTMLElement | null>(null);
  
  const modifiedIsOpen = ref(false);
  
  const {
    closeDelay,
    content,
    disableClickAway,
    disabled,
    interactive,
    offsetDistance,
    openDelay,
    show,
    hover
  } = toRefs(props);
  
  const { hasContent } = useContent(slots, popperNode, content);
  
  const manualMode = computed(() => show && show.value !== null);
  const invalid = computed(() => disabled.value || !hasContent.value);
  const shouldShowPopper = computed(() => popperHandleMap.isOpen.value && !invalid.value);
  const enableClickAway = computed(
    () => !disableClickAway.value && !manualMode.value,
  );
  const interactiveStyle = computed(() =>
    interactive.value
      ? {
        border: `${offsetDistance.value}px solid transparent;`
      }
      : undefined,
  );
  
  const openPopperDebounce = debounce(popperHandleMap.open, openDelay.value);
  const closePopperDebounce = debounce(popperHandleMap.close, closeDelay.value);
  
  const openPopper = async () => {
    if (invalid.value || manualMode.value) {
      return;
    }
    
    closePopperDebounce.clear();
    openPopperDebounce();
  };
  
  const closePopper = async () => {
    if (manualMode.value) {
      return;
    }
    
    openPopperDebounce.clear();
    closePopperDebounce();
  };
  
  const togglePopper = () => {
    popperHandleMap.isOpen.value ? closePopper() : openPopper();
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
      debounce(() => {
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
  }
}