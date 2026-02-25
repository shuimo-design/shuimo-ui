/**
 * @description headless MTree — 树组件主入口
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   .m-tree
 *     MTreeNode (递归节点组件)
 */
import { computed, defineComponent, triggerRef, watch } from 'vue';
import { TreeCore } from '@shuimo-design/ui-core/components/base/tree';
import { TreeNodeData, TreeNodeProps, TreeProps } from '@shuimo-design/ui-core/components/base/tree/props';
import MTreeNode from './MTreeNode.tsx';
import './tree.css';

const { props: treeProps, useTree } = TreeCore;

export default defineComponent((_props: TreeProps, { emit }) => {
  const props = _props as Required<TreeProps>;

  const { handleToggleExpand, handleToggleChecked, getNodesByKeys, treeRef } = useTree({
    props,
    event: { triggerTree: () => triggerRef(treeRef) },
  });

  // 根节点数据列表（依赖 shallowRef 触发更新）
  const treeData = computed(() => treeRef.value!.getTreeData());
  // 当前所有选中 key（用于 emit update:checkedKeys）
  const checkedKeys = computed(() => treeRef.value?.getKeys()?.checkedKeys ?? []);

  // 监听外部传入的 checkedKeys，同步到 Tree 实例
  watch(
    () => props.checkedKeys,
    (keys?: Array<string | number>) => {
      if (keys && keys.length > 0) {
        treeRef.value?.setCheckedByKeys(keys);
      }
    },
    { immediate: true },
  );

  const handleExpand = (node: TreeNodeData, e: MouseEvent) => {
    handleToggleExpand(node, e);
  };

  const handleCheck = (node: TreeNodeData, checked: boolean) => {
    handleToggleChecked(node, checked);
    emit('update:checkedKeys', checkedKeys.value);
  };

  const handleItemClick = (node: TreeNodeData, e: MouseEvent) => {
    emit('node-click', node, e);
  };

  return () => {
    const nodeProps: TreeNodeProps = {
      data: treeData.value,
      config: treeRef.value!.config,
      checkbox: props.checkbox,
      getNodesByKeys,
      handleExpand,
      handleCheck,
      handleItemClick,
    };

    return (
      <div class="m-tree">
        <MTreeNode {...nodeProps} />
      </div>
    );
  };
}, {
  name: 'MTree',
  props: treeProps,
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    'update:checkedKeys': (_keys: TreeNodeData['key'][]) => true,
    'node-click': (_node: TreeNodeData, _e: MouseEvent) => true,
  },
});
