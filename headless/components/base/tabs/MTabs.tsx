/**
 * @description headless tabs 组件，无视觉样式，仅提供结构和逻辑
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Comment, defineComponent, Fragment } from 'vue';
import { TabsCore } from '@shuimo-design/ui-core';
import { TabsProps } from '@shuimo-design/ui-core/components/base/tabs/props';
import './tabs.css';

const { props, useTabs } = TabsCore;

export default defineComponent((_props: TabsProps, ctx) => {
  const { slots } = ctx;
  const p = _props as Required<TabsProps>;
  const { tabsClass, navClass, getNavItemClass, contentClass, switchTab, isActive, activeTab } = useTabs(p, ctx);

  return () => {
    // 收集 MTabPane 子节点，生成导航项和内容区
    const defaultSlot: any[] = slots.default?.() ?? [];
    const panes: any[] = [];

    defaultSlot.forEach(vnode => {
      // v-for 产生的 Fragment 需展开
      if (vnode.type === Fragment) {
        (vnode.children as any[])?.forEach(c => panes.push(c));
        return;
      }
      // 跳过注释节点
      if (vnode.type === Comment) return;
      // 只收集 MTabPane 子组件
      if (typeof vnode.type === 'object' && (vnode.type as any).name === 'MTabPane') {
        panes.push(vnode);
      }
    });

    // 判断是否使用插槽 API 或 items prop API
    const useSlotApi = panes.length > 0;

    // 渲染导航栏
    const renderNav = () => {
      if (useSlotApi) {
        // 从 MTabPane vnode props 中读取 label/name/disabled
        return panes.map(pane => {
          const paneProps = pane.props ?? {};
          const name = paneProps.name;
          const label = paneProps.label;
          const disabled = paneProps.disabled ?? false;
          return (
            <div
              class={getNavItemClass(name, disabled)}
              onClick={() => switchTab(name, disabled)}
            >
              {label}
            </div>
          );
        });
      }
      // items prop API
      return (p.items ?? []).map(item => (
        <div
          class={getNavItemClass(item.name, item.disabled)}
          onClick={() => switchTab(item.name, item.disabled)}
        >
          {item.label}
        </div>
      ));
    };

    // 渲染内容区
    const renderContent = () => {
      if (useSlotApi) {
        // 将对应 MTabPane vnode 传递给内容区，由 MTabPane 自身控制显隐
        return panes.map(pane => {
          // 注入 active 状态至 pane props，以便 MTabPane 内部读取
          return { ...pane, props: { ...pane.props, active: isActive(pane.props?.name) } };
        });
      }
      // items prop API 下无内容渲染（由外部 v-show 控制），仅提供容器
      return slots.content?.({ active: activeTab.value });
    };

    return (
      <div class={tabsClass.value}>
        <div class={navClass}>
          {renderNav()}
        </div>
        <div class={contentClass}>
          {renderContent()}
        </div>
      </div>
    );
  };
}, {
  name: 'MTabs',
  emits: ['update:modelValue', 'change'],
  props,
});
