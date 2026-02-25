/**
 * @description tooltip composable，管理 hover 显示/隐藏及定位
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref, nextTick } from 'vue';
import { TooltipProps } from './props';

export type TooltipStyle = {
  position: string;
  left: string;
  top: string;
  zIndex: string;
};

/**
 * 根据 trigger 元素的 getBoundingClientRect 和 placement 计算 tooltip 的 fixed 定位样式
 */
function calcPosition(
  rect: DOMRect,
  tooltipEl: HTMLElement,
  placement: NonNullable<TooltipProps['placement']>,
): TooltipStyle {
  const gap = 8;
  const tooltipRect = tooltipEl.getBoundingClientRect();
  let left = 0;
  let top = 0;

  switch (placement) {
    case 'top':
      left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      top = rect.top - tooltipRect.height - gap;
      break;
    case 'bottom':
      left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      top = rect.bottom + gap;
      break;
    case 'left':
      left = rect.left - tooltipRect.width - gap;
      top = rect.top + rect.height / 2 - tooltipRect.height / 2;
      break;
    case 'right':
      left = rect.right + gap;
      top = rect.top + rect.height / 2 - tooltipRect.height / 2;
      break;
  }

  return {
    position: 'fixed',
    left: `${left}px`,
    top: `${top}px`,
    zIndex: '9999',
  };
}

export default function useTooltip(props: Required<TooltipProps>) {
  const visible = ref(false);
  const tooltipStyle = ref<TooltipStyle | Record<string, never>>({});

  const triggerRef = ref<HTMLElement | null>(null);
  const tooltipRef = ref<HTMLElement | null>(null);

  const show = async () => {
    if (props.disabled) return;
    visible.value = true;
    // 等待 tooltip DOM 渲染后再计算位置
    await nextTick();
    if (!triggerRef.value || !tooltipRef.value) return;
    const rect = triggerRef.value.getBoundingClientRect();
    tooltipStyle.value = calcPosition(rect, tooltipRef.value, props.placement);
  };

  const hide = () => {
    visible.value = false;
    tooltipStyle.value = {};
  };

  return {
    visible,
    tooltipStyle,
    triggerRef,
    tooltipRef,
    show,
    hide,
  };
}
