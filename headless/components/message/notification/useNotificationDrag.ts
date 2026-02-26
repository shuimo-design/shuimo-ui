/**
 * @description headless Notification 拖拽关闭 hook
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 用原生 pointer events 实现拖拽关闭。
 * 不同位置的拖拽方向：
 *   - top-left / bottom-left  → 向左拖超过 1/3 宽触发关闭
 *   - top-right / bottom-right → 向右拖超过 1/3 宽触发关闭
 */
import { Ref } from 'vue';
import { NotificationPosition } from '@shuimo-design/ui-core/components/message/notification/props';

/** 移除标记 CSS 类名 */
const REMOVE_CLASS = 'm-notification-removing';

export function useNotificationDrag(
  domRef: Ref<HTMLElement | null>,
  position: NotificationPosition,
  onRemove: () => void,
) {
  /** 拖拽状态 */
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let needRemoveFlag = false;

  /** 元素宽/高的 1/3，作为触发关闭的阈值 */
  let thresholdX = 0;
  let thresholdY = 0;

  /** 标记为待移除：添加 class */
  const markForRemove = () => {
    if (!needRemoveFlag) {
      needRemoveFlag = true;
      domRef.value?.classList.add(REMOVE_CLASS);
    }
  };

  /** 取消移除标记：移除 class */
  const unmarkForRemove = () => {
    if (needRemoveFlag) {
      needRemoveFlag = false;
      domRef.value?.classList.remove(REMOVE_CLASS);
    }
  };

  /** 根据位置计算位移限制和阈值检测 */
  const calcPosition = (dx: number, dy: number): { x: number; y: number } => {
    if (position === 'top-left' || position === 'bottom-left') {
      // 只允许向左拖（负方向），x < 0
      const x = currentX + dx;
      const clamped = x < 0 ? x : 0;
      if (clamped < -thresholdX) {
        markForRemove();
      } else {
        unmarkForRemove();
      }
      return { x: clamped, y: 0 };
    } else {
      // top-right / bottom-right 只允许向右拖（正方向），x > 0
      const x = currentX + dx;
      const clamped = x > 0 ? x : 0;
      if (clamped > thresholdX) {
        markForRemove();
      } else {
        unmarkForRemove();
      }
      return { x: clamped, y: 0 };
    }
  };

  /** 应用位移到 DOM */
  const applyTransform = (x: number, y: number) => {
    if (domRef.value) {
      domRef.value.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  /** pointerdown：开始拖拽 */
  const onPointerDown = (e: PointerEvent) => {
    // 仅响应鼠标左键或触摸
    if (e.button !== undefined && e.button !== 0) return;

    const el = domRef.value;
    if (!el) return;

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    currentX = 0;
    currentY = 0;
    needRemoveFlag = false;

    // 计算阈值：宽/高的 1/3
    thresholdX = el.offsetWidth / 3;
    thresholdY = el.offsetHeight / 3;

    // 禁用文本选择，避免拖拽时选中文本
    el.style.userSelect = 'none';
    el.setPointerCapture(e.pointerId);

    e.preventDefault();
  };

  /** pointermove：拖拽中 */
  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;

    const { x, y } = calcPosition(dx, dy);
    currentX = x;
    currentY = y;
    applyTransform(x, y);
  };

  /** pointerup / pointercancel：结束拖拽 */
  const onPointerUp = (e: PointerEvent) => {
    if (!isDragging) return;
    isDragging = false;

    const el = domRef.value;
    if (el) {
      el.style.userSelect = '';
    }

    if (needRemoveFlag) {
      // 已超过阈值，执行移除
      onRemove();
    } else {
      // 未超过阈值，弹回原位（过渡动画由 CSS transition 完成）
      currentX = 0;
      currentY = 0;
      applyTransform(0, 0);
    }
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
