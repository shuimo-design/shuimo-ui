/**
 * @description headless tooltip 组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   .m-tooltip (trigger 包装器，inline-block)
 *     default slot (触发元素)
 *   Teleport to body
 *     .m-tooltip-content (fixed 定位的提示内容)
 *       content slot 或 content prop
 */
import { defineComponent, Teleport } from 'vue';
import { TooltipCore } from '@shuimo-design/ui-core';
import { TooltipProps } from '@shuimo-design/ui-core/components/base/tooltip/props';
import './tooltip.css';

const { props: tooltipProps, useTooltip } = TooltipCore;

export default defineComponent((_props: TooltipProps, ctx) => {
  const props = _props as Required<TooltipProps>;
  const { slots, expose } = ctx;

  const {
    visible,
    tooltipStyle,
    triggerRef,
    tooltipRef,
    show,
    hide,
  } = useTooltip(props);

  expose({ show, hide });

  return () => {
    // tooltip 内容：优先使用 content slot，否则使用 content prop
    const renderTooltipContent = () => {
      if (!visible.value) return null;

      const inner = slots.content ? slots.content() : props.content;

      return (
        <Teleport to="body">
          <div
            class="m-tooltip-content"
            ref={el => { tooltipRef.value = el as HTMLElement; }}
            style={tooltipStyle.value}
            data-placement={props.placement}
          >
            {inner}
          </div>
        </Teleport>
      );
    };

    return (
      <div
        class="m-tooltip"
        ref={el => { triggerRef.value = el as HTMLElement; }}
        onMouseenter={show}
        onMouseleave={hide}
      >
        {slots.default?.()}
        {renderTooltipContent()}
      </div>
    );
  };
}, {
  name: 'MTooltip',
  props: tooltipProps,
});
