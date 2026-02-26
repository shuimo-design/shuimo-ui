/**
 * @description headless alert 组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref } from 'vue';
import { AlertCore } from '@shuimo-design/ui-core';
import { AlertProps } from '@shuimo-design/ui-core/components/base/alert/props';
import './alert.css';

const { props } = AlertCore;

export default defineComponent((props: AlertProps, { slots, emit }) => {
  // 控制显示/隐藏
  const visible = ref(true);

  const handleClose = () => {
    visible.value = false;
    emit('close');
  };

  return () => {
    if (!visible.value) return null;

    return (
      <div class={['m-alert', `m-alert-${props.type ?? 'info'}`]}>
        {/* 图标区域 */}
        {props.showIcon && (
          <div class="m-alert-icon">
            {slots.icon?.()}
          </div>
        )}

        {/* 内容区域 */}
        <div class="m-alert-content">
          {(props.title || slots.title) && (
            <div class="m-alert-title">
              {slots.title ? slots.title() : props.title}
            </div>
          )}
          {(props.description || slots.default) && (
            <div class="m-alert-description">
              {slots.default ? slots.default() : props.description}
            </div>
          )}
        </div>

        {/* 关闭按钮 */}
        {props.closable && (
          <button class="m-alert-close" onClick={handleClose}>
            {slots.closeIcon ? slots.closeIcon() : '×'}
          </button>
        )}
      </div>
    );
  };
}, {
  name: 'MAlert',
  emits: ['close'],
  props,
});
