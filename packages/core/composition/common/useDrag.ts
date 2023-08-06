/**
 * @description drag hook
 * @author 阿怪
 * @date 2023/5/23 16:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MRef, MRefValue } from './MRef';
import interactjs from 'interactjs';
import { MessageDirectionType } from '../../lib/message/message';


export type InteractEvent = any;
export type DragPosition = { x: number, y: number };
export type DragOption = { startAxis: 'x' | 'y', lockAxis: 'x' | 'y' };


export default function useDrag(config: {
  direction: MessageDirectionType,
  value: {
    domRef: MRefValue<HTMLElement | null>
  },
  event?: {
    getOption?: () => DragOption,
    movePositionHandler?: (event: InteractEvent, position: DragPosition) => DragPosition,
    onDragLeave?: (event: InteractEvent) => void
  }
}) {
  const domRef = MRef(config.value.domRef);

  const init = (basePosition?: { x?: number, y?: number }) => {
    if (!domRef.value) {
      return;
    }
    const position: DragPosition = { x: basePosition?.x ?? 0, y: basePosition?.y ?? 0 };
    return interactjs(domRef.value)
      .styleCursor(false)
      .draggable({
        ...config.event?.getOption?.(),
        listeners: {
          end: event => {
            config.event?.onDragLeave?.(event);
          },
          move: event => {
            const { x, y } = config.event?.movePositionHandler?.(event, position) ?? {
              x: position.x + event.dx, y: position.y + event.dy
            };
            position.x = x;
            position.y = y;
            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
          }
        }
      });
  };


  return {
    init
  };

}
