/**
 * @description core usePopover hook
 * @author 阿怪
 * @date 2023/1/29 10:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Placement, PopperConfig, PositionStyle, usePopper } from '../../../composition/popper/usePopper';
import MPrinter from '../../other/printer/Printer';
import { PopoverProps } from './index';
import { MRef, MRefValue, RMRef } from '../../../composition/common/MRef';
import useClickAway from '../../../composition/popper/useClickAway';
import { Options } from '../../../composition/common/defineCore';

const error = MPrinter('水墨Popover组件').error;
export type IPopper = ReturnType<typeof usePopper>;


export class PopoverImpl {

  protected _active: HTMLElement;
  protected _content: HTMLElement;
  protected _arrow: HTMLElement | undefined;
  popperInstance: IPopper;
  style: RMRef;
  arrowStyle: RMRef;
  placement: RMRef;
  visible: boolean = false;
  onShow?: Function;
  onHide?: Function;

  constructor(
    val: { style: RMRef, arrowStyle: RMRef, placement: RMRef, /*default*/show: boolean },
    active?: HTMLElement,
    content?: HTMLElement,
    arrow?: HTMLElement,
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
    this._arrow = arrow;
    this.popperInstance = usePopper(this._active, this._content,
      (positionStyle: PositionStyle) => this.update(positionStyle), this._arrow, config);
    this.style = val.style;
    this.arrowStyle = val.arrowStyle;
    this.placement = val.placement;
    this.visible = val.show;
    this.onShow = lifecycle?.onShow;
    this.onHide = lifecycle?.onHide;
  }

  get content() {
    return this._content;
  }

  async show() {
    this.style.value = { display: 'block', opacity: '0' };
    this.arrowStyle.value = { display: 'block', opacity: '0' };
    this.visible = true;
    await this.popperInstance.getPositionStyle();
    this.onShow?.();
  }

  update(positionStyle: PositionStyle) {
    if (!this.visible) {
      this.hide();
      return;
    }
    this.style.value = positionStyle.style;
    this.arrowStyle.value = positionStyle.arrowStyle;
    this.placement.value = positionStyle.placement;
  }

  hide() {
    this.style.value = undefined;
    this.arrowStyle.value = undefined;
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

export function usePopover(options: Options<{
    props: PopoverProps,
    value: {
      style: any,
      arrowStyle: any,
      placement: Placement
    }
  }>,
  lifecycle?: { /* event can't use optional... */
    onShow?: Function,
    onHide?: Function
  }) {

  const style = MRef(options.value.style);
  const arrowStyle = MRef(options.value.arrowStyle);
  const placement = MRef(options.value.placement);
  let instance: PopoverImpl | null = null;
  let clickAwayInstance: ReturnType<typeof useClickAway>;

  const createPopover = (
    active: HTMLElement,
    content: HTMLElement,
    arrow?: HTMLElement,
    config?: PopperConfig
  ) => {
    instance = new PopoverImpl(
      { style, arrowStyle, placement, show: options.props.show },
      active,
      content,
      arrow,
      config,
      {
        onShow: () => {
          clickAwayInstance?.add();
          lifecycle?.onShow?.();
        },
        onHide: () => {
          clickAwayInstance?.remove();
          lifecycle?.onHide?.();
        }
      });
    return instance;
  };

  const props = options.props;
  const popoverEnter = () => {
    if (props.hover) {
      instance?.show();
    }
  };
  const popoverLeave = () => {
    if (props.hover) {
      instance?.hide();
    }
  };

  const onMountedEvents: Function[] = [];
  const onBeforeDestroyEvents: Function[] = [];

  onMountedEvents.push(() => {
    if (options.props.disableClickAway) {
      return;
    }

    clickAwayInstance = useClickAway({
      target: () => instance?.content?.parentElement,
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
    popoverEnter,
    popoverLeave,
    lifecycle: {
      onMountedEvents,
      onBeforeDestroyEvents
    }
  };
}
