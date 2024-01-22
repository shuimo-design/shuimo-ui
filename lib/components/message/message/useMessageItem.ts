/**
 * @description core message item hook
 * @author 阿怪
 * @date 2023/5/22 16:38
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
// @ts-ignore  todo fix this
import successIcon from './assets/success.webp';
// @ts-ignore  todo fix this
import errorIcon from './assets/error.webp';
// @ts-ignore  todo fix this
import warningIcon from './assets/warning.webp';
// @ts-ignore  todo fix this
import infoIcon from './assets/info.webp';
import { MessageProps, MessageType } from './index';
import { fadeIn, fadeOut } from './animate';
import useMessageDrag from './useMessageDrag';
import { Options } from '../../../compositions/common/defineCore.ts';
import useDrag from '../../../compositions/common/useDrag.ts';
import { ref } from 'vue';
import useDebounceFn from '../../../compositions/common/useDebounceFn.ts';

export const messageIcon: Record<MessageType, any> = {
  success: successIcon,
  warning: warningIcon,
  info: infoIcon,
  error: errorIcon
};

export function useMessageItem(options: Options<{
  props: MessageProps,
  event: {
    closeDuration: () => void
  }
}>) {
  const { direction, duration } = options.props;
  const domRef = ref<HTMLElement | null>(null);
  const { messageDragInit, directionStrategy, onDragLeave } = useMessageDrag(domRef, {
    needRemove: () => remove()
  });
  const { option, movePositionHandler } = directionStrategy(direction);

  const { init } = useDrag({
    direction,
    value: { domRef },
    event: {
      getOption: () => option,
      movePositionHandler,
      onDragLeave
    }
  });

  const onMountedEvent = () => {
    fadeIn(domRef.value, direction);
    init();
    messageDragInit();
  };

  const remove = () => {
    fadeOut(domRef.value, direction, () => {
      options.event.closeDuration();
    });
  };

  let timer: ReturnType<typeof setTimeout>;
  const clearTimer = () => {
    if (duration < 0) {return;}
    clearTimeout(timer);
  };
  const setTimer = () => {
    if (duration < 0) {return;}
    timer = setTimeout(() => {
      if (domRef.value) {
        remove();
      }
    }, duration);
  };

  const debounceSetTimer = useDebounceFn(setTimer, 200);
  const debounceClearTimer = useDebounceFn(clearTimer, 200);

  const onMouseEnterHandler = () => {
    debounceClearTimer();
  };
  const onMouseLeaveHandler = () => {
    debounceSetTimer();
  };


  return {
    domRef,
    onMountedEvent,
    clearTimer, setTimer,
    onMouseEnterHandler, onMouseLeaveHandler
  };

}
