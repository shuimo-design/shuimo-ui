/**
 * @description headless dropdown 组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, provide, Teleport } from 'vue';
import { DropdownCore } from '@shuimo-design/ui-core';
import { DropdownProps } from '@shuimo-design/ui-core/components/base/dropdown/props';
import { DROPDOWN_ITEM_CLICK_KEY } from './MDropdownItem.tsx';
import './dropdown.css';

const { props } = DropdownCore;

export default defineComponent((_props: DropdownProps, ctx) => {
  const dropdownProps = _props as Required<DropdownProps>;
  const { slots } = ctx;

  const {
    visible,
    triggerRef,
    menuRef,
    handleTriggerClick,
    handleMouseenter,
    handleMouseleave,
    handleItemClick,
    dropdownClass,
    menuClass,
  } = DropdownCore.useDropdown(dropdownProps, ctx);

  // 向子级 MDropdownItem 提供点击处理器
  provide(DROPDOWN_ITEM_CLICK_KEY, handleItemClick);

  return () => {
    return (
      <div
        class={dropdownClass.value}
        onMouseenter={handleMouseenter}
        onMouseleave={handleMouseleave}
      >
        {/* 触发器区域 */}
        <div
          ref={triggerRef}
          class="m-dropdown-trigger"
          onClick={handleTriggerClick}
        >
          {slots.default?.()}
        </div>

        {/* 菜单通过 Teleport 挂载到 body，避免 overflow 裁剪 */}
        {visible.value && (
          <Teleport to="body">
            <div
              ref={menuRef}
              class={menuClass.value}
              style={{
                position: 'fixed',
                zIndex: '9999',
              }}
            >
              {slots.menu?.()}
            </div>
          </Teleport>
        )}
      </div>
    );
  };
}, {
  name: 'MDropdown',
  props,
  emits: ['command'],
});
