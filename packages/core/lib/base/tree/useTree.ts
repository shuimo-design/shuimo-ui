import { TreeNodeData, TreeProps } from "./index";
import { watch, shallowRef, computed, triggerRef } from 'vue'
import Tree from "./tree";

export const useTree = (props: Required<TreeProps>) => {
  const tree = shallowRef<Tree>(new Tree({
    data: props.data,
    config: props.config,
    defaultExpandAll: props.defaultExpandAll,
    checkStrictly: props.checkStrictly
  }))
  const checkedKeys = computed(() => tree.value?.getKeys()?.checkedKeys ?? [])

  watch(() => props.data, (newData) => {
    if (newData) {
      console.log('a')
    }
  })

  watch(() => props.checkedKeys, (keys?: Array<string | number>) => {
    if (keys) {
      tree.value?.setCheckedByKeys(keys)
    }
  }, { immediate: true })

  const treeData = computed(() => tree.value?.getTreeData())

  const handleToggleExpand = (node: TreeNodeData, e: MouseEvent) => {
    e.stopPropagation()
    tree.value?.toggleExpand(node)
    triggerRef(tree)
  }
  const handleToggleChecked = (node: TreeNodeData, checked: boolean) => {
    tree.value?.setNodeCheckbox(node, checked)
    triggerRef(tree)
  }


  const getNodesByKeys = (keys: TreeNodeData['key'][]) => {
    return tree.value?.getTreeData(keys)
  }

  return {
    treeData,
    getNodesByKeys,
    handleToggleExpand,
    handleToggleChecked,
    checkedKeys,
  }
}
