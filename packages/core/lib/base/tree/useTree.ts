import {TreeProps} from "./index";
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

  return {
    getTreeNodeData,
    getTree
  }
}
