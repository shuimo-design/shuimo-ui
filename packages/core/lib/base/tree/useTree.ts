import {TreeNodeData, TreeProps} from "./index";
import TreeNode from "./tree";
import { watch, shallowRef, onMounted } from 'vue'

export const useTree = (props: Required<TreeProps>) => {
  const tree = shallowRef<TreeNode>(new TreeNode({
    data: props.data,
    config: props.config,
    defaultExpandAll: props.defaultExpandAll
  }))

  watch(() => props.data, (newData) => {
    if (newData) {
      tree.value.updateTreeData(newData)
    }
  })

  const getTreeNodeData = () => {
    return tree.value.getTreeData()
  }

  const getTree = () => {
    return tree
  }

  const handleToggleExpand = (node: TreeNodeData, e: MouseEvent) => {
    e.stopPropagation()
    tree.value.toggleStatusByNode('expand', node)
  }
  const handleToggleChecked = (node: TreeNodeData) => {
    tree.value.toggleStatusByNode('checked', node)
  }

  const handleToggleSelect = (node: TreeNodeData) => {
    tree.value.toggleStatusByNode('selected', node)
  }

  // ones in mounted
  onMounted(() => {
    tree.value.updateTreeData(props.data)
  })

  return {
    getTreeNodeData,
    getTree,
    handleToggleExpand,
    handleToggleChecked,
    handleToggleSelect
  }
}
