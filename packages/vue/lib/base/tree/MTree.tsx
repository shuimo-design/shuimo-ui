/**
 * @description vue version tree
 * @author Jobin
 * @date 2023/6/24 23:27
 * @version v1.0.0
 */
import { computed, defineComponent, shallowRef, triggerRef, watch } from 'vue';
import { props } from '@shuimo-design/core/lib/base/tree/api';
import { useTree } from '@shuimo-design/core/lib/base/tree/useTree';
import { TreeNodeData } from '@shuimo-design/core/lib/base/tree';
import { TreeNodeProps } from '@shuimo-design/core/lib/base/tree/treeNode';
import MTreeNode from './MTreeNode';
import Tree from '@shuimo-design/core/lib/base/tree/tree';

export default defineComponent({
  name: 'MTree',
  props,
  emit: {
    'update:checkedKeys': (keys: TreeNodeData['key'][]) => true,
    'node-click': (node: TreeNodeData, e: MouseEvent) => true
  },
  setup: (props, { emit }) => {
    const treeRef = shallowRef<Tree>();

    const { handleToggleExpand, handleToggleChecked, getNodesByKeys } = useTree({
      props,
      value: { treeRef },
      event: { triggerTree: () => {triggerRef(treeRef);} }
    });

    const treeData = computed(() => treeRef.value.getTreeData());
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
        config: treeRef.value.config,
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
  }
});
