/**
 * @description headless tab pane 组件，单个标签页内容容器
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref } from 'vue';
import { TabsCore } from '@shuimo-design/ui-core';
import { TabPaneProps } from '@shuimo-design/ui-core/components/base/tabs/props';

const { tabPaneProps } = TabsCore;

export default defineComponent((_props: TabPaneProps & { active?: boolean }, ctx) => {
  const { slots } = ctx;
  // 记录是否已经被激活过，用于懒加载控制
  const hasBeenActive = ref(false);

  return () => {
    const p = _props as Required<TabPaneProps> & { active?: boolean };
    const active = p.active ?? false;

    // 懒加载：首次激活后才渲染内容
    if (active) {
      hasBeenActive.value = true;
    }

    const shouldRender = !p.lazy || hasBeenActive.value;

    return (
      <div
        class={['m-tab-pane', active ? 'm-tab-pane-active' : '']}
        style={{ display: active ? '' : 'none' }}
      >
        {shouldRender ? slots.default?.() : null}
      </div>
    );
  };
}, {
  name: 'MTabPane',
  props: {
    ...tabPaneProps,
    // active 由父组件 MTabs 注入，不在对外 API 中暴露
    active: { type: Boolean, default: false },
  },
});
