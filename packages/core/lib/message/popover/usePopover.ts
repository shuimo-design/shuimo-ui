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
import useClickAway from '../../../composition/popper/useClickAway';

const error = MPrinter('水墨Popover组件').error;
export type IPopper = ReturnType<typeof usePopper>;


export class PopoverImpl {

  protected _active: HTMLElement;
  protected _content: HTMLElement;
  popperInstance: IPopper;
  style: RMRef;
  visible: boolean = false;
  onShow?: Function;
  onHide?: Function;

  constructor(
    val: { style: RMRef },
    active?: HTMLElement,
    content?: HTMLElement,
    config?: PopperConfig,
    lifecycle?: {
      onShow?: Function,
      onHide?: Function
    }
  ) {
    if (!content) {new Error('MPopover: content is required');}
    if (!active) {new Error('MPopover: active is required');}

    this._active = active!;
    this._content = content!;
    this.popperInstance = usePopper(this._active, this._content, config);
    this.style = val.style;
    this.onShow = lifecycle?.onShow;
    this.onHide = lifecycle?.onHide;
  }

  get content() {
    return this._content;
  }

  async show() {
    this.style.value = await this.popperInstance.getPositionStyle();
    this.visible = true;
    this.onShow?.();
  }

  hide() {
    this.style.value = undefined;
    this.visible = false;
    this.onHide?.();
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
  style: MRefValue,
  props: PopoverProps
}) {

  const style = MRef(config.style);
  let instance: PopoverImpl | null = null;
  let clickAwayInstance: ReturnType<typeof useClickAway>;

  const createPopover = (active: HTMLElement, content: HTMLElement, config?: PopperConfig) => {
    instance = new PopoverImpl({ style }, active, content, config, {
      onShow: () => {
        clickAwayInstance?.add();
      },
      onHide: () => {
        clickAwayInstance?.remove();
      }
    });
    return instance;
  };

  // const props = config.props;
  // const popoverEnter = () => {
  //   if (props.hover) {
  //     instance?.show();
  //   }
  // };
  // const popoverLeave = () => {
  //   if (props.hover) {
  //     instance?.hide();
  //   }
  // };

  const onMountedEvents: Function[] = [];
  const onBeforeDestroyEvents: Function[] = [];

  onMountedEvents.push(() => {
    if (config.props.disableClickAway) {
      return;
    }

    clickAwayInstance = useClickAway({
      target: () => instance?.content,
      handler: () => {
        instance?.hide();
        // emits?
      }
    });
    if (clickAwayInstance) {
      const { onBeforeDestroy } = clickAwayInstance;
      onBeforeDestroyEvents.push(onBeforeDestroy);
    }
  });


  const getContent = <T>(
    props: PopoverProps,
    getContentSlot: () => T,
    useTeleport: (options: any) => ArrayElement<T> | T,
    _instance = instance
  ) => {
    const contentTeleportWrapper = () => {
      if (props.teleport) {
        return useTeleport({
          teleportProps: props.teleport,
          slot: getContentSlot()
        });
      }
      return getContentSlot();
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
    getContent,
    // popoverEnter,
    // popoverLeave,
    lifecycle: {
      onMountedEvents,
      onBeforeDestroyEvents
    }
  };
}
