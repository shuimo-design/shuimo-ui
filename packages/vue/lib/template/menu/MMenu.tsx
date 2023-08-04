/**
 * @description vue version menu
 * @author 阿怪
 * @date 2023/08/03 15:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo these are temporary code for doc...
 */
import { computed, defineComponent, h, shallowRef, triggerRef } from 'vue';
import { props } from '@shuimo-design/core/lib/template/menu/api';
import { useMenu } from '@shuimo-design/core/lib/template/menu/useMenu';
import Tree from '@shuimo-design/core/lib/base/tree/tree';
import { TreeNodeProps } from '@shuimo-design/core/lib/base/tree/treeNode';
import { TreeNodeData } from '@shuimo-design/core/lib/base/tree';
import MMenuItem from './MMenuItem';

export default defineComponent({
  name: 'MMenu',
  props,
  emit: {
    'update:checkedKeys': (keys: TreeNodeData['key'][]) => true,
    'node-click': (node: TreeNodeData, e: MouseEvent) => true
  },
  setup: (props, { slots, emit }) => {
    const treeRef = shallowRef<Tree>();


    const { handleToggleExpand, handleToggleChecked, getNodesByKeys } = useMenu({
      props: {
        ...props,
        config: {
          expand: 'isActive',
          ...props.config
        }
      },
      value: { treeRef },
      event: { triggerTree: () => {triggerRef(treeRef);} }
    });


    const treeData = computed(() => treeRef.value.getTreeData());
    const checkedKeys = computed(() => treeRef.value?.getKeys()?.checkedKeys ?? []);
    const handleExpand = (node: TreeNodeData, e: MouseEvent) => {
      handleToggleExpand(node, e);
    };
    const handleCheckbox = (node: TreeNodeData, checked: boolean) => {
      handleToggleChecked(node, checked);
      emit('update:checkedKeys', checkedKeys.value);
    };


    const handleItemClick = (node: TreeNodeData, e: MouseEvent) => {
      handleExpand(node, e);
      node.isActive = !node.isActive;
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


      return <div class="m-menu">
        <div class="m-menu-main">
          <MMenuItem {...treeNodeProps}/>
        </div>
      </div>;
    };
  }
});
