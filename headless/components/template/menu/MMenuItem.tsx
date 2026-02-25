/**
 * @description headless 菜单项组件（递归渲染）
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h, resolveComponent, PropType } from 'vue';
import { MenuNodeData, MenuConfig } from '@shuimo-design/ui-core/components/template/menu/props';

/** MMenuItem 的内部 props 类型 */
type MenuItemProps = {
  data: MenuNodeData[];
  config: MenuConfig;
  checkbox: boolean;
  root: boolean;
  getNodesByKeys: (keys: (string | number)[]) => MenuNodeData[];
  handleExpand: (node: MenuNodeData, e: MouseEvent) => void;
  handleCheck: (node: MenuNodeData, checked: boolean) => void;
  handleItemClick: (node: MenuNodeData, e: MouseEvent) => void;
};

export default defineComponent({
  name: 'MMenuItem',
  inheritAttrs: false,
  props: {
    data: { type: Array as PropType<MenuNodeData[]>, default: () => [] },
    config: { type: Object as PropType<MenuConfig>, required: true },
    checkbox: { type: Boolean, default: false },
    root: { type: Boolean, default: false },
    getNodesByKeys: { type: Function as PropType<(keys: (string | number)[]) => MenuNodeData[]>, required: true },
    handleExpand: { type: Function as PropType<(node: MenuNodeData, e: MouseEvent) => void>, required: true },
    handleCheck: { type: Function as PropType<(node: MenuNodeData, checked: boolean) => void>, required: true },
    handleItemClick: { type: Function as PropType<(node: MenuNodeData, e: MouseEvent) => void>, required: true },
  },
  setup(_props, { slots }) {
    const props = _props as Required<MenuItemProps>;

    const clickEvent = (e: MouseEvent, d: MenuNodeData) => {
      props.handleItemClick(d, e);
    };

    const expandEvent = (e: MouseEvent, d: MenuNodeData) => {
      props.handleExpand(d, e);
      e.stopPropagation();
    };

    const checkEvent = (e: Event, d: MenuNodeData) => {
      const checked = (e.target as HTMLInputElement).checked;
      props.handleCheck(d, checked);
    };

    return () => {
      const { label: l, key: k, children: c } = props.config;
      // 获取 MMenuItem 组件引用（支持递归渲染子节点）
      const MMenuItem = resolveComponent('MMenuItem');

      return (
        <>
          {props.data.map(d => {
            // 优先使用已构建好状态的 children，否则通过 getNodesByKeys 查找
            const childNodes: MenuNodeData[] = d.children
              ? d.children
              : (() => {
                  const raw = d[c] as MenuNodeData[] | undefined;
                  return raw
                    ? props.getNodesByKeys(raw.map(it => it[k] as string | number))
                    : [];
                })();

            const hasChildren = childNodes.length > 0;

            return (
              <li
                key={d[k] as string | number}
                class={[
                  'm-menu-item',
                  { 'm-menu-item-root': props.root },
                  { 'm-menu-item-disabled': !!d.disabled },
                  { 'm-menu-item-active': !!d.isActive },
                ]}
                onClick={(e: MouseEvent) => clickEvent(e, d)}
              >
                <div class="m-menu-item-content">
                  {/* checkbox 模式 */}
                  {props.checkbox ? (
                    <input
                      type="checkbox"
                      class="m-menu-item-checkbox"
                      checked={!!d.checked}
                      disabled={!!d.disabled}
                      onChange={(e: Event) => checkEvent(e, d)}
                      onClick={(e: MouseEvent) => e.stopPropagation()}
                    />
                  ) : null}

                  {/* 节点标签 */}
                  <span
                    class="m-menu-item-label"
                    onClick={(e: MouseEvent) => expandEvent(e, d)}
                  >
                    {slots.default ? slots.default({ data: d[l] }) : (d[l] as string)}
                  </span>

                  {/* 展开箭头（有子节点时显示） */}
                  {hasChildren ? (
                    <span
                      class={['m-menu-item-arrow', { 'm-menu-item-arrow-expand': d.expand }]}
                      onClick={(e: MouseEvent) => expandEvent(e, d)}
                    />
                  ) : null}
                </div>

                {/* 子节点区域（展开时渲染） */}
                {hasChildren && d.expand ? (
                  <div class="m-menu-item-children">
                    {h(
                      MMenuItem,
                      {
                        data: childNodes,
                        config: props.config,
                        checkbox: props.checkbox,
                        root: false,
                        getNodesByKeys: props.getNodesByKeys,
                        handleExpand: props.handleExpand,
                        handleCheck: props.handleCheck,
                        handleItemClick: props.handleItemClick,
                      },
                      slots.default ? { default: slots.default } : undefined,
                    )}
                  </div>
                ) : null}
              </li>
            );
          })}
        </>
      );
    };
  },
});
