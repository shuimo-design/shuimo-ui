/**
 * @description click away hook
 * @author 阿怪
 * @date 2023/5/12 01:02
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import useEventListener from '../common/useEventListener';


const event = 'pointerdown';
export default function useClickAway(options: {
  target: any,
  handler: (event: any) => void
}) {
  if (typeof window === 'undefined' || !window) {
    return;
  }

  const listener = (event: any) => {
    const el = typeof options.target === 'function' ? options.target() : options.target;
    if (!el) {
      return;
    }

    if (el === event.target || event.composedPath().includes(el)) {
      return;
    }

    options.handler(event);
  };

  return useEventListener({
    target: window,
    event,
    handler: listener
  });


}
