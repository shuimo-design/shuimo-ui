import { defineComponent } from 'vue';
import { props } from '@shuimo-design/core/lib/base/tree/api';
import { useTree } from "@shuimo-design/core/lib/base/tree/useTree";
import { TreeNodeData, TreeNodeProps} from "@shuimo-design/core/lib/base/tree";
import MTreeNode from './MTreeNode'
export default defineComponent({
  name: 'MTree',
  props,
  components: {
    MTreeNode
  },
  emit: {
    'update:checkedKeys': (keys: TreeNodeData['key'][]) => true,
    'node-click': (node: TreeNodeData, e: MouseEvent) => true,
  },
  setup: (props, { emit }) => {
    const { treeData, checkedKeys, handleToggleExpand, handleToggleChecked, getNodesByKeys } = useTree(props)

    const handleExpand = (node: TreeNodeData, e: MouseEvent) => {
      handleToggleExpand(node, e)
    }
    const handleCheckbox = (node: TreeNodeData, checked: boolean) => {
      handleToggleChecked(node, checked)
      emit('update:checkedKeys', checkedKeys.value)
    }

    const handleItemClick = (node: TreeNodeData, e: MouseEvent) => {
      emit('node-click', node, e)
    }

    return () => {
      const treeNodeProps: TreeNodeProps = {
        data: treeData.value,
        config: props.config,
        checkable: props.checkable,
        getNodesByKeys,
        handleExpand,
        handleCheck: handleCheckbox,
        handleItemClick,
      }
      return <div class="m-tree">
        <MTreeNode {...treeNodeProps}></MTreeNode>
      </div>
    };
  }
});
