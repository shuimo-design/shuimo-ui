/**
 * @description core message drag hook
 * @author 阿怪
 * @date 2023/5/23 21:48
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MRef, RMRef } from '../../../composition/common/MRef';
import { MessageDirectionType } from './index';
import { DragOption, DragPosition, InteractEvent } from '../../../composition/common/useDrag';


export default function useMessageDrag(domRef: RMRef<HTMLElement | null>, event: {
  needRemove: () => void,
}) {

  let width = 0;
  let height = 0;
  let checkW = 0;
  let checkH = 0;
  let needRemoveFlag = false;

  const messageDragInit = () => {
    width = domRef.value?.offsetWidth || 0;
    height = domRef.value?.offsetHeight || 0;
    checkW = width / 3;
    checkH = height / 3;
  };

  const onDragLeave = () => {
    if (needRemoveFlag) {
      event.needRemove();
    } else {
      domRef.value!.style.transform = `translate(0px, 0px)`;
    }
  };

  const needRemove = () => {
    domRef.value?.classList.add('m-message-remove');
    needRemoveFlag = true;
  };

  const unNeedRemove = () => {
    domRef.value?.classList.remove('m-message-remove');
    needRemoveFlag = false;
  };

  const directionStrategy = (direction: MessageDirectionType) => {
    let option: DragOption = { startAxis: 'x', lockAxis: 'x' };
    if (direction === 'top-center') {
      option = { startAxis: 'y', lockAxis: 'y' };
    }

    let movePositionHandler;

    //left support drag to left
    if (['top-left', 'bottom-left'].includes(direction)) {
      movePositionHandler = (event: InteractEvent, position: DragPosition) => {
        const positionX = position.x + event.dx;
        if (position.x < -checkW) {
          needRemove();
        } else {
          unNeedRemove();
        }
        return { x: positionX < 0 ? positionX : 0, y: 0 };
      };
    } else if (['top-right', 'bottom-right'].includes(direction)) {
      movePositionHandler = (event: InteractEvent, position: DragPosition) => {
        const positionX = position.x + event.dx;
        if (position.x > checkW) {
          needRemove();
        } else {
          unNeedRemove();
        }
        return { x: positionX > 0 ? positionX : 0, y: 0 };
      };

    } else {
      // center
      movePositionHandler = (event: InteractEvent, position: DragPosition) => {
        const positionY = position.y + event.dy;
        if (position.y < -checkH) {
          needRemove();
        } else {
          unNeedRemove();
        }
        return { x: 0, y: positionY < 0 ? positionY : 0 };
      };

    }


    return {
      option,
      movePositionHandler
    };
  };

  return {
    messageDragInit,
    directionStrategy,
    onDragLeave
  };

}
