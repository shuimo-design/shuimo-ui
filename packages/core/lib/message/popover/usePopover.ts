/**
 * @description core usePopover hook
 * @author 阿怪
 * @date 2023/1/29 10:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { usePopper } from '../../../composition/popper/usePopper';


export function usePopover() {

  let _active: HTMLElement;
  let _content: HTMLElement;

  const init = (active?: HTMLElement, content?: HTMLElement) => {
    if (!active || !content) {
      console.error('trigger or content is undefined', active, content);
      return;
    }
    usePopper(active, content);
    _active = active;
    _content = content;
  };

  const trigger = (e?: any) => {

    if (_content?.hasAttribute('show')) {
      _content.removeAttribute('show');
    } else {
      _content?.setAttribute('show', 'true');
    }
  };


  return {
    init,
    trigger
  };


}
