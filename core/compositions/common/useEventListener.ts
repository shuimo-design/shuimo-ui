/**
 * @description event listener hook
 * @author 阿怪
 * @date 2023/5/12 00:57
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export type EventListenerOptions = {
  target: any,
  event: string,
  handler: EventListenerOrEventListenerObject,
};

export default function useEventListener(options: EventListenerOptions) {

  const getTarget = () => {
    if (typeof options.target === 'function') {
      return options.target();
    }
    return options.target;
  };

  const add = () => {
    getTarget().addEventListener(options.event, options.handler);
  };

  const remove = () => {
    getTarget().removeEventListener(options.event, options.handler);
  };

  const onMounted = () => {
    add();
  };

  const onBeforeDestroy = () => {
    remove();
  };

  return {
    add, remove,
    onMounted,
    onBeforeDestroy,
  };

}
