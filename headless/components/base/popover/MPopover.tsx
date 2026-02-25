/**
 * @description headless popover 组件
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h, Teleport, TeleportProps, VNode, watch } from 'vue';
import { PopoverCore } from '@shuimo-design/ui-core';
import usePopover from '@shuimo-design/ui-core/components/base/popover/usePopover.ts';
import { PopoverProps } from '@shuimo-design/ui-core/components/base/popover/props';
import './popover.css';


/**
 * 处理 teleport 渲染
 */
const renderTeleport = (teleportProps: PopoverProps['teleport'], slot: VNode | VNode[]) => {
  const to = (teleportProps === true || teleportProps === undefined) ? 'body' : (teleportProps as TeleportProps)?.to ?? 'body';
  return h(Teleport, { to }, slot);
};


export default defineComponent((_props: PopoverProps, ctx) => {
  const props = _props as Required<PopoverProps>;
  const { slots, expose } = ctx;

  if (!slots.content) {
    console.error('MPopover: content slot is required');
    return () => null;
  }

  if (!slots.default) {
    console.error('MPopover: default slot (trigger) is required');
    return () => null;
  }

  const {
    popoverEnter,
    popoverLeave,
    popoverRef, contentRef, arrowRef,
    popperInstance,
    style, arrowStyle,
    placement,
  } = usePopover(props, ctx);

  const show = async () => {
    await popperInstance.value?.show();
  };
  const hide = () => {
    popperInstance.value?.hide();
  };

  expose({ show, hide });

  watch(() => props.show, () => {
    if (props.show) { show(); } else { hide(); }
  });

  const handleClick = async () => {
    if (props.hover) { return; }
    await popperInstance.value?.toggle();
  };

  /**
   * 渲染弹出内容，处理 teleport 和 mountRender 逻辑
   */
  const renderContent = () => {
    const visible = popperInstance.value?.visible ?? false;
    // 非 mountRender 且不可见时不渲染内容
    if (!props.mountRender && !visible) {
      return null;
    }

    const contentSlot = slots.content?.() ?? [];
    const content = props.teleport ? renderTeleport(props.teleport, contentSlot) : contentSlot;
    return content;
  };

  return () => {
    return <div class="m-popover" data-popper-placement={placement.value}
                onMouseleave={popoverLeave}>
      <div class="m-popover-default-wrapper"
           ref={popoverRef}
           onMouseenter={popoverEnter}
           onClick={handleClick}>
        {slots.default?.()}
      </div>
      <div class="m-popover-content" ref={contentRef} style={style.value}>
        {renderContent()}
        {
          slots.arrow ?
            <div class="m-popover-arrow" ref={arrowRef} style={arrowStyle.value}>{slots.arrow()}</div> : null
        }
      </div>
    </div>;
  };
}, {
  name: 'MPopover',
  props: PopoverCore.props,
  emits: ['update:show'],
});
