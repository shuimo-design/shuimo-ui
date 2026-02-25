/**
 * @description headless Menu 主组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, watch } from 'vue';
import { MenuCore } from '@shuimo-design/ui-core/components/template/menu';
import { MenuProps, MenuNodeData } from '@shuimo-design/ui-core/components/template/menu/props';
import { useMenu } from '@shuimo-design/ui-core/components/template/menu/useMenu';
import MMenuItem from './MMenuItem.tsx';
import './menu.css';

const { props } = MenuCore;

export default defineComponent((_props: MenuProps, { emit, slots }) => {
  const p = _props as Required<MenuProps>;

  const {
    nodesRef,
    initNodes,
    toggleExpand,
    setActive,
    toggleChecked,
    getCheckedKeys,
    getNodesByKeys,
    config,
  } = useMenu(p);

  // 监听 data 变化时重新初始化节点树
  watch(
    () => p.data,
    newData => {
      initNodes(newData ?? []);
    },
    { deep: true },
  );

  /** 点击节点：激活 + 切换展开 + 触发事件 */
  const handleItemClick = (node: MenuNodeData, e: MouseEvent) => {
    if (node.disabled) return;
    setActive(node);
    toggleExpand(node);
    emit('node-click', node, e);
    e.stopPropagation();
  };

  /** 仅切换展开，不修改激活状态（通过展开箭头触发） */
  const handleExpand = (node: MenuNodeData, e: MouseEvent) => {
    if (node.disabled) return;
    toggleExpand(node);
    e.stopPropagation();
  };

  /** checkbox 选中回调，触发 update:checkedKeys */
  const handleCheck = (node: MenuNodeData, checked: boolean) => {
    toggleChecked(node, checked);
    emit('update:checkedKeys', getCheckedKeys());
  };

  return () => {
    return (
      <div class="m-menu">
        <div class="m-menu-main">
          <MMenuItem
            data={[...nodesRef.value]}
            config={config}
            checkbox={p.checkbox}
            root={true}
            getNodesByKeys={getNodesByKeys}
            handleExpand={handleExpand}
            handleCheck={handleCheck}
            handleItemClick={handleItemClick}
            v-slots={slots.default ? { default: slots.default } : undefined}
          />
        </div>
      </div>
    );
  };
}, {
  name: 'MMenu',
  props,
  emits: {
    'update:checkedKeys': (_keys: (string | number)[]) => true,
    'node-click': (_node: MenuNodeData, _e: MouseEvent) => true,
  },
});
