import { TreeNodeData, TreeProps } from './index';
import Tree from './tree';
import { Options } from '../../../composition/common/defineCore';
import { MRef } from '../../../composition/common/MRef';

export const useTree = (options: Options<{
  props: TreeProps,
  value: {
    treeRef: Tree
  },
  event: {
    triggerTree: () => void
  }
}>) => {
  const { props,value,event } = options;
  const treeRef = MRef<Tree>(value.treeRef);
  treeRef.value = new Tree({
    data: props.data,
    config: props.config,
    defaultExpandAll: props.defaultExpandAll,
    checkStrictly: props.checkStrictly
  });

  const handleToggleExpand = (node: TreeNodeData, e: MouseEvent) => {
    e.stopPropagation()
    treeRef.value?.toggleExpand(node)
    event.triggerTree()
  }
  const handleToggleChecked = (node: TreeNodeData, checked: boolean) => {
    treeRef.value?.setNodeCheckbox(node, checked)
    event.triggerTree()
  }

  const getNodesByKeys = (keys: TreeNodeData['key'][]) => {
    return treeRef.value.getTreeData(keys);
  };

  return {
    getNodesByKeys,
    handleToggleExpand,
    handleToggleChecked,
  };
};
