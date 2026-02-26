/**
 * @description headless collapse 容器组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, provide } from 'vue';
import { CollapseCore } from '@shuimo-design/ui-core';
import { CollapseProps } from '@shuimo-design/ui-core/components/base/collapse/props';
import { COLLAPSE_IS_ACTIVE_KEY, COLLAPSE_TOGGLE_KEY } from './MCollapseItem.tsx';
import './collapse.css';

const { props } = CollapseCore;

export default defineComponent((_props: CollapseProps, ctx) => {
  const collapseProps = _props as Required<CollapseProps>;
  const { slots } = ctx;

  const {
    isActive,
    toggle,
    collapseClass,
  } = CollapseCore.useCollapse(collapseProps, ctx);

  // 向子级 MCollapseItem 提供状态读取与切换方法
  provide(COLLAPSE_IS_ACTIVE_KEY, isActive);
  provide(COLLAPSE_TOGGLE_KEY, toggle);

  return () => {
    return (
      <div class={collapseClass.value}>
        {slots.default?.()}
      </div>
    );
  };
}, {
  name: 'MCollapse',
  props,
  emits: ['update:modelValue', 'change'],
});
