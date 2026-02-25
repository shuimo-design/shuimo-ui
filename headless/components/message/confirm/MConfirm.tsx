/**
 * @description headless confirm 组件（命令式确认框）
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构（visible 为 true 时）：
 *   <Teleport to="{teleport.to}">
 *     <div class="m-model-mask" onClick={onMaskClick}>
 *       <div class="m-confirm" onClick={onContentClick}>
 *         <div class="m-confirm-content">[default slot 或 content prop]</div>
 *         <div class="m-confirm-footer">
 *           <button class="m-confirm-cancel" onClick={onCancel}>{cancelText}</button>
 *           <button class="m-confirm-ok" onClick={onConfirm}>{confirmText}</button>
 *         </div>
 *       </div>
 *     </div>
 *   </Teleport>
 */
import { defineComponent, Teleport } from 'vue';
import { useModal } from '@shuimo-design/ui-core/compositions/modal/useModal';
import { ConfirmCore } from '@shuimo-design/ui-core/components/message/confirm';
import { ConfirmProps } from '@shuimo-design/ui-core/components/message/confirm';
import './confirm.css';

const { props: confirmProps } = ConfirmCore;

export default defineComponent((_props: ConfirmProps, _ctx: any) => {
  const props = _props as Required<ConfirmProps>;
  const { slots, expose, emit } = _ctx;

  const {
    visible,
    open,
    close,
    onMaskClick,
    onContentClick,
  } = useModal(props, emit);

  /** 点击确认按钮 */
  const onConfirm = () => {
    emit('confirm');
    close();
  };

  /** 点击取消按钮 */
  const onCancel = () => {
    emit('cancel');
    close();
  };

  expose({ open, close });

  return () => {
    if (!visible.value) return null;

    return (
      <Teleport to={props.teleport.to}>
        <div class="m-model-mask" onClick={onMaskClick}>
          <div class="m-confirm" onClick={onContentClick}>
            <div class="m-confirm-content">
              {slots.default?.() ?? props.content}
            </div>
            <div class="m-confirm-footer">
              <button class="m-confirm-cancel" onClick={onCancel}>
                {props.cancelText}
              </button>
              <button class="m-confirm-ok" onClick={onConfirm}>
                {props.confirmText}
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    );
  };
}, {
  name: 'MConfirm',
  props: confirmProps,
  emits: ['update:visible', 'confirm', 'cancel'],
});
