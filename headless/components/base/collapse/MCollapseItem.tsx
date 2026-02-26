/**
 * @description headless collapse item 组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, inject } from 'vue';
import { CollapseCore } from '@shuimo-design/ui-core';
import { CollapseItemProps } from '@shuimo-design/ui-core/components/base/collapse/props';

const { itemProps } = CollapseCore;

// 从 MCollapse 注入的 isActive 和 toggle 方法
export const COLLAPSE_IS_ACTIVE_KEY = Symbol('collapseIsActive');
export const COLLAPSE_TOGGLE_KEY = Symbol('collapseToggle');

export default defineComponent((props: CollapseItemProps, ctx) => {
  const isActive = inject<(name: string | number) => boolean>(COLLAPSE_IS_ACTIVE_KEY);
  const toggle = inject<(name: string | number, disabled: boolean) => void>(COLLAPSE_TOGGLE_KEY);

  const getItemClass = () => [
    'm-collapse-item',
    { 'm-collapse-item-active': isActive?.(props.name) },
    { 'm-collapse-item-disabled': props.disabled },
  ];

  return () => {
    const active = isActive?.(props.name) ?? false;

    return (
      <div class={getItemClass()}>
        {/* 面板头部，点击切换展开/收起 */}
        <div
          class="m-collapse-header"
          onClick={() => toggle?.(props.name, props.disabled ?? false)}
        >
          {ctx.slots.title?.() ?? props.title}
        </div>

        {/* 面板内容区，通过 CSS height 过渡实现动画 */}
        <div class={['m-collapse-content', { 'm-collapse-content-active': active }]}>
          <div class="m-collapse-content-inner">
            {ctx.slots.default?.()}
          </div>
        </div>
      </div>
    );
  };
}, {
  name: 'MCollapseItem',
  props: itemProps,
});
