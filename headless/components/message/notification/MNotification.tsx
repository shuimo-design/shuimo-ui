/**
 * @description headless Notification 单条通知组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.1.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   <div class="m-notification m-notification-{type} m-notification-{position}">
 *     <div class="m-notification-icon" />
 *     <div class="m-notification-body">
 *       <div class="m-notification-title">{title}</div>
 *       <div class="m-notification-message">{message}</div>
 *     </div>
 *     <span class="m-notification-close" />  // closable 时渲染
 *   </div>
 *
 * 拖拽关闭：
 *   - top-left / bottom-left  → 向左拖超过 1/3 宽触发关闭
 *   - top-right / bottom-right → 向右拖超过 1/3 宽触发关闭
 *   - 未超过阈值松手后弹回原位（CSS transition 过渡）
 */
import { defineComponent, ref } from 'vue';
import { NotificationCore } from '@shuimo-design/ui-core/components/message/notification';
import { NotificationProps } from '@shuimo-design/ui-core/components/message/notification/props';
import { useNotificationDrag } from './useNotificationDrag';

const { notificationProps } = NotificationCore;

export default defineComponent((_props: NotificationProps, _ctx: any) => {
  const props = _props as Required<NotificationProps>;
  const { slots, emit } = _ctx;

  /** 通知根节点 ref，拖拽 hook 需要 */
  const domRef = ref<HTMLElement | null>(null);

  const onClose = () => {
    emit('close');
  };

  const { onPointerDown, onPointerMove, onPointerUp } = useNotificationDrag(
    domRef,
    props.position,
    onClose,
  );

  return () => (
    <div
      ref={domRef}
      class={['m-notification', `m-notification-${props.type}`, `m-notification-${props.position}`]}
      onPointerdown={onPointerDown}
      onPointermove={onPointerMove}
      onPointerup={onPointerUp}
      onPointercancel={onPointerUp}
    >
      {/* 类型图标区域 */}
      <div class="m-notification-icon">
        {slots.icon ? slots.icon() : null}
      </div>

      {/* 标题 + 正文 */}
      <div class="m-notification-body">
        <div class="m-notification-title">
          {slots.title ? slots.title() : props.title}
        </div>
        {(props.message || slots.default) && (
          <div class="m-notification-message">
            {slots.default ? slots.default() : props.message}
          </div>
        )}
      </div>

      {/* 关闭按钮 */}
      {props.closable && (
        <span class="m-notification-close" onClick={onClose} />
      )}
    </div>
  );
}, {
  name: 'MNotification',
  props: notificationProps,
  emits: ['close'],
});
