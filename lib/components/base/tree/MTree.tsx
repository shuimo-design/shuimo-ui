/**
 * @description vue version tree
 * @author Jobin
 * @date 2023/6/24 23:27
 * @version v1.0.0
 */
import { computed, defineComponent, triggerRef, watch } from 'vue';
import { TreeNodeData } from './index';
import { useTree } from './useTree.ts';
import { TreeNodeProps } from './treeNode';
import MTreeNode from './MTreeNode';
import { props } from './api.ts';
import './tree.css';

export default defineComponent((props, { emit }) => {


  const { handleToggleExpand, handleToggleChecked, getNodesByKeys, treeRef } = useTree({
    props,
    event: { triggerTree: () => {triggerRef(treeRef);} }
  });

  const treeData = computed(() => treeRef.value!.getTreeData());
  const checkedKeys = computed(() => treeRef.value?.getKeys()?.checkedKeys ?? []);

  watch(() => props.checkedKeys, (keys?: Array<string | number>) => {
    if (keys) {
      treeRef.value?.setCheckedByKeys(keys);
    }
  }, { immediate: true });

  const handleExpand = (node: TreeNodeData, e: MouseEvent) => {
    handleToggleExpand(node, e);
  };
  const handleCheckbox = (node: TreeNodeData, checked: boolean) => {
    handleToggleChecked(node, checked);
    emit('update:checkedKeys', checkedKeys.value);
  };

  const handleItemClick = (node: TreeNodeData, e: MouseEvent) => {
    emit('node-click', node, e);
  };

  return () => {
    const treeNodeProps: TreeNodeProps = {
      data: treeData.value,
      config: treeRef.value!.config,
      checkbox: props.checkbox,
      getNodesByKeys,
      handleExpand,
      handleCheck: handleCheckbox,
      handleItemClick
    };
    return <div class="m-tree">
      <MTreeNode {...treeNodeProps}/>
    </div>;
  };
}, {
  name: 'MTree',
  props,
  emits: {
    /* eslint-disable */
    'update:checkedKeys': (keys: TreeNodeData['key'][]) => true,
    /* eslint-disable */
    'node-click': (node: TreeNodeData, e: MouseEvent) => true
  }
});
