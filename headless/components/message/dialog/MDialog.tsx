/**
 * @description headless dialog 组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构（visible 为 true 时）：
 *   <Teleport to="{teleport.to}">
 *     <div class="m-model-mask" v-show={showMask()} onClick={onMaskClick}>
 *       <div class="m-dialog" onClick={onContentClick}>
 *         [关闭按钮]
 *         [default slot]
 *       </div>
 *     </div>
 *   </Teleport>
 *   <div class="m-model-active" onClick={toggle}>[active slot]</div>
 */
import { defineComponent, Teleport } from 'vue';
import { useModal } from '@shuimo-design/ui-core/compositions/modal/useModal';
import { DialogCore } from '@shuimo-design/ui-core/components/message/dialog';
import { DialogProps } from '@shuimo-design/ui-core/components/message/dialog';
import './dialog.css';

const { props: dialogProps } = DialogCore;

export default defineComponent((_props: DialogProps, _ctx: any) => {
  const props = _props as Required<DialogProps>;
  const { slots, expose, emit } = _ctx;

  const {
    visible,
    open,
    close,
    toggle,
    onMaskClick,
    showMask,
    onContentClick,
  } = useModal(props, emit);

  expose({ open, close, toggle });

  return () => {
    // active 触发区域（可选 slot）
    const renderActive = () => {
      if (!slots.active) return null;
      return (
        <div class="m-model-active" onClick={toggle}>
          {slots.active()}
        </div>
      );
    };

    // 弹窗主体（通过 Teleport 挂载到目标节点）
    const renderDialog = () => {
      if (!visible.value) return null;

      return (
        <Teleport to={props.teleport.to}>
          <div class="m-model-mask" style={{ display: showMask() ? undefined : 'none' }} onClick={onMaskClick}>
            <div class="m-dialog" onClick={onContentClick}>
              {props.closeBtn && (
                <div class="m-model-close-btn" onClick={close} />
              )}
              {slots.default?.()}
            </div>
          </div>
        </Teleport>
      );
    };

    return (
      <>
        {renderActive()}
        {renderDialog()}
      </>
    );
  };
}, {
  name: 'MDialog',
  props: dialogProps,
  emits: ['update:visible'],
});
