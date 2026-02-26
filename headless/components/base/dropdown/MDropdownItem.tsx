/**
 * @description headless dropdown item 组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, inject } from 'vue';
import { DropdownCore } from '@shuimo-design/ui-core';
import { DropdownItemProps } from '@shuimo-design/ui-core/components/base/dropdown/props';

const { itemProps } = DropdownCore;

// 从 MDropdown 注入的选项点击处理器
const DROPDOWN_ITEM_CLICK_KEY = Symbol('dropdownItemClick');

export { DROPDOWN_ITEM_CLICK_KEY };

export default defineComponent((props: DropdownItemProps, ctx) => {
  // 注入父级 Dropdown 提供的点击处理器
  const handleItemClick = inject<(item: DropdownItemProps) => void>(DROPDOWN_ITEM_CLICK_KEY);

  const getItemClass = () => [
    'm-dropdown-item',
    { 'm-dropdown-item-disabled': props.disabled },
    { 'm-dropdown-item-divided': props.divided },
  ];

  return () => {
    return (
      <div
        class={getItemClass()}
        onClick={() => handleItemClick?.(props)}
      >
        {ctx.slots.default?.() ?? props.label}
      </div>
    );
  };
}, {
  name: 'MDropdownItem',
  props: itemProps,
});
