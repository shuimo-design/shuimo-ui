/**
 * @description popover composable
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Placement, PopperConfig, PositionStyle, usePopper } from '../../../compositions/popper/usePopper.ts';
import useClickAway from '../../../compositions/popper/useClickAway';
import { PopoverProps } from './props';
import { onBeforeMount, onMounted, ref, type Ref, shallowRef } from 'vue';


export type IPopper = ReturnType<typeof usePopper>;

/**
 * Popover 实例，管理定位、显示/隐藏状态
 */
export class PopoverImpl {

  protected _active: HTMLElement;
  protected _content: HTMLElement;
  protected _arrow: HTMLElement | undefined;
  popperInstance: IPopper;
  style: Ref;
  arrowStyle: Ref;
  placement: Ref;
  visible: boolean = false;
  onShow?: Function;
  onHide?: Function;

  constructor(
    val: { style: Ref, arrowStyle: Ref, placement: Ref, show: boolean },
    active: HTMLElement,
    content: HTMLElement,
    arrow?: HTMLElement,
    config?: PopperConfig,
    lifecycle?: {
      onShow?: Function,
      onHide?: Function
    },
  ) {
    if (!content) { throw new Error('MPopover: content is required'); }
    if (!active) { throw new Error('MPopover: active is required'); }

    this._active = active;
    this._content = content;
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


export default function usePopover(props: Required<PopoverProps>, ctx: any) {
  const style = ref();
  const arrowStyle = ref();
  const placement = ref<Placement>(props.placement);
  let instance: PopoverImpl | null = null;
  let clickAwayInstance: ReturnType<typeof useClickAway>;

  const popperInstance = shallowRef<PopoverImpl>();

  const popoverRef = ref<HTMLElement>();
  const contentRef = ref<HTMLElement>();
  const arrowRef = ref<HTMLElement>();

  const createPopover = (
    active: HTMLElement,
    content: HTMLElement,
    arrow?: HTMLElement,
    config?: PopperConfig,
  ) => {
    instance = new PopoverImpl(
      { style, arrowStyle, placement, show: props.show },
      active,
      content,
      arrow,
      config,
      {
        onShow: () => {
          clickAwayInstance?.add();
          ctx.emit('update:show', true);
        },
        onHide: () => {
          clickAwayInstance?.remove();
          ctx.emit('update:show', false);
        },
      });
    return instance;
  };

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

  onMounted(() => {
    if (!popoverRef.value || !contentRef.value) {
      return;
    }
    popperInstance.value = createPopover(popoverRef.value, contentRef.value, arrowRef.value, {
      ...props.popper,
      placement: props.placement,
    });

    if (props.disableClickAway) {
      return;
    }

    clickAwayInstance = useClickAway({
      target: () => instance?.content?.parentElement,
      handler: () => {
        instance?.hide();
      },
    });
  });

  onBeforeMount(() => {
    if (clickAwayInstance) {
      const { onBeforeDestroy } = clickAwayInstance;
      onBeforeDestroy();
    }
  });

  return {
    popoverEnter,
    popoverLeave,
    popoverRef, contentRef, arrowRef,
    popperInstance,
    style, arrowStyle,
    placement,
  };
}
