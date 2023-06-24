/**
 * @description core message item hook
 * @author 阿怪
 * @date 2023/5/22 16:38
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import successIcon from './assets/success.png';
import errorIcon from './assets/error.png';
import warningIcon from './assets/warning.png';
import infoIcon from './assets/info.png';
import { MessageProps, MessageType } from './index';
import { MRef, MRefValue } from '../../../composition/common/MRef';
import { fadeIn, fadeOut } from './animate';
import useDebounceFn from '../../../composition/common/useDebounceFn';
import useDrag from '../../../composition/common/useDrag';
import useMessageDrag from './useMessageDrag';
import { Options } from '../../../composition/common/defineCore';

export const messageIcon: Record<MessageType, any> = {
  success: successIcon,
  warning: warningIcon,
  info: infoIcon,
  error: errorIcon
};

export function useMessageItem(options: Options<{
  props:MessageProps,
  value:{
    domRef: HTMLElement | null
  },
  event: {
    closeDuration: () => void
  }
}>) {
  const { direction, duration } = options.props;
  const domRef = MRef(options.value.domRef);
  const { messageDragInit, directionStrategy, onDragLeave } = useMessageDrag(domRef, {
    needRemove: () => remove()
  });
  const { option, movePositionHandler } = directionStrategy(direction);

  const { init } = useDrag({
    direction,
    value: { domRef: options.value.domRef },
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
  }

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
    onMountedEvent,
    clearTimer, setTimer,
    onMouseEnterHandler, onMouseLeaveHandler
  };

}
