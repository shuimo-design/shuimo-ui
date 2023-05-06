/**
 * @description core usePopover hook
 * @author 阿怪
 * @date 2023/1/29 10:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { PopperConfig, usePopper } from '../../../composition/popper/usePopper';
import MPrinter from '../../other/printer/Printer';
import { PopoverProps } from './index';
import { MRef, MRefValue, RMRef } from '../../../composition/common/MRef';

const error = MPrinter('水墨Popover组件').error;
export type IPopper = ReturnType<typeof usePopper>;


export class PopoverImpl {

  protected _active: HTMLElement;
  protected _content: HTMLElement;
  popperInstance: IPopper;
  style: RMRef;
  visible: boolean = false;

  constructor(
    val: { style: RMRef },
    active?: HTMLElement,
    content?: HTMLElement,
    config?: PopperConfig
  ) {
    if (!content) {new Error('MPopover: content is required');}
    if (!active) {new Error('MPopover: active is required');}

    this._active = active!;
    this._content = content!;
    this.popperInstance = usePopper(this._active, this._content, config);
    this.style = val.style;
  }

  async show() {
    this.style.value = await this.popperInstance.getPositionStyle();
    this.visible = true;
  }

  hide() {
    this.style.value = undefined;
    this.visible = false;
  }

  async toggle() {
    if (this.visible) {
      this.hide();
    } else {
      await this.show();
    }
  }

  destroy() {

  }
}

// magic tool type, get array element type
type ArrayElement<ArrayType> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export function usePopover(config: {
  style: MRefValue
}) {

  const style = MRef(config.style);
  let instance: PopoverImpl | null = null;

  const createPopover = (active: HTMLElement, content: HTMLElement, config?: PopperConfig) => {
    instance =  new PopoverImpl({ style }, active, content, config);
    return instance;
  };

  const getContent = <T>(
    props: PopoverProps,
    content: T,
    useTeleport: (options: any) => ArrayElement<T> | T,
    _instance = instance
  ) => {
    const contentTeleportWrapper = () => {
      if (props.teleport) {
        return useTeleport({
          teleportProps: props.teleport,
          slot: content
        });
      }
      return content;
    };

    if (props.mountRender) {
      return contentTeleportWrapper();
    }
    if (!_instance || !_instance.visible) {
      return null;
    }
    return contentTeleportWrapper();
  };

  return {
    createPopover,
    getContent
  };
}
