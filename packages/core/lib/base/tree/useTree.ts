import {TreeNodeData, TreeProps} from "./index";
import TreeNode from "./tree";
import { watch } from 'vue'

export const useTree = (props: Required<TreeProps>) => {
  const tree = new TreeNode({
    data: props.data,
    config: props.config
  })

  watch(() => props.data, (newData) => {
    if (newData) {
      tree.updateTreeData(newData)
    }
  })

  const getTreeNodeData = () => {
    return tree.getTreeData()
  }

  const getTree = () => {
    return tree
  }

  const handleToggleExpand = (node: TreeNodeData, e: MouseEvent) => {
    e.stopPropagation()
    tree.toggleStatusByNode('expand', node)
  }
  const handleToggleChecked = (node: TreeNodeData) => {
    tree.toggleStatusByNode('checked', node)
  }

  const handleToggleSelect = (node: TreeNodeData) => {
    tree.toggleStatusByNode('selected', node)
  }

  return {
    getTreeNodeData,
    getTree,
    handleToggleExpand,
    handleToggleChecked,
    handleToggleSelect
  }
}
