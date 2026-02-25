/**
 * @description headless drawer 组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构（visible 为 true 时）：
 *   <Teleport to="{teleport.to}">
 *     <div class="m-model-mask" v-show={showMask()} onClick={onMaskClick}>
 *       <div class="m-drawer m-drawer-{direction} ...drawerClass" onClick={onContentClick}>
 *         [default slot]
 *       </div>
 *     </div>
 *   </Teleport>
 *   <div class="m-model-active" onClick={toggle}>[active slot]</div>
 */
import { defineComponent, Teleport } from 'vue';
import { useModal } from '@shuimo-design/ui-core/compositions/modal/useModal';
import { DrawerCore } from '@shuimo-design/ui-core/components/message/drawer';
import { DrawerProps } from '@shuimo-design/ui-core/components/message/drawer';
import './drawer.css';

const { props: drawerProps } = DrawerCore;

export default defineComponent((_props: DrawerProps, _ctx: any) => {
  const props = _props as Required<DrawerProps>;
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

    // 抽屉主体（通过 Teleport 挂载到目标节点）
    const renderDrawer = () => {
      if (!visible.value) return null;

      // 合并方向类名与用户自定义类名
      const drawerClass = [
        'm-drawer',
        `m-drawer-${props.direction}`,
        ...(props.drawerClass || []),
      ];

      return (
        <Teleport to={props.teleport.to}>
          <div class="m-model-mask" style={{ display: showMask() ? undefined : 'none' }} onClick={onMaskClick}>
            <div class={drawerClass} onClick={onContentClick}>
              {slots.default?.()}
            </div>
          </div>
        </Teleport>
      );
    };

    return (
      <>
        {renderActive()}
        {renderDrawer()}
      </>
    );
  };
}, {
  name: 'MDrawer',
  props: drawerProps,
  emits: ['update:visible'],
});
