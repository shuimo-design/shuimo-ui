/**
 * @description tabs hook
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed } from 'vue';
import { TabsProps } from './props';

export default function useTabs<
  Props extends Record<string, unknown>,
>(props: Props, ctx: any) {
  const { emit } = ctx;

  /** 当前激活的标签名 */
  const activeTab = computed(() => (props as unknown as TabsProps).modelValue);

  /** 判断某个标签是否为激活状态 */
  const isActive = (name: string | number) => activeTab.value === name;

  /** 切换标签页，禁用状态下不响应 */
  const switchTab = (name: string | number, disabled?: boolean) => {
    if (disabled) {
      return;
    }
    if (name === activeTab.value) {
      return;
    }
    emit('update:modelValue', name);
    emit('change', name);
  };

  /** 容器根节点 class */
  const tabsClass = computed(() => {
    const type = (props as unknown as TabsProps).type ?? 'line';
    return [
      'm-tabs',
      `m-tabs-${type}`,
    ];
  });

  /** 导航栏 class */
  const navClass = 'm-tabs-nav';

  /** 获取单个导航项的 class */
  const getNavItemClass = (name: string | number, disabled?: boolean) => [
    'm-tabs-nav-item',
    isActive(name) ? 'm-tabs-nav-item-active' : '',
    disabled ? 'm-tabs-nav-item-disabled' : '',
  ].filter(Boolean);

  /** 内容区域 class */
  const contentClass = 'm-tabs-content';

  return {
    activeTab,
    isActive,
    switchTab,
    tabsClass,
    navClass,
    getNavItemClass,
    contentClass,
  };
}
