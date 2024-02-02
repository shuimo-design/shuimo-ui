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
import { computed, defineComponent, triggerRef, watch } from 'vue';
import MMenuItem from './MMenuItem.tsx';
import { props } from './api.ts';
import { useMenu } from './useMenu.ts';
import { TreeNodeData } from '../../base/tree';
import { TreeNodeProps } from '../../base/tree/treeNode';
import { MenuProps } from './index';

export default defineComponent((_props: MenuProps, { emit }) => {
  const props = _props as Required<MenuProps>;


  const { handleToggleExpand, handleToggleChecked, getNodesByKeys, initTreeRef,treeRef } = useMenu({
    props: {
      ...props,
      config: {
        expand: 'isActive',
        ...props.config
      }
    },
    event: { triggerTree: () => {triggerRef(treeRef);} }
  });

  watch(() => props.data, () => {
    initTreeRef();
  }, { deep: true });


  const treeData = computed(() => treeRef.value!.getTreeData());
  const checkedKeys = computed(() => treeRef.value?.getKeys()?.checkedKeys ?? []);
  const handleExpand = (node: TreeNodeData, e: MouseEvent) => {
    handleToggleExpand(node, e);
    e.stopPropagation();
  };
  const handleCheckbox = (node: TreeNodeData, checked: boolean) => {
    handleToggleChecked(node, checked);
    emit('update:checkedKeys', checkedKeys.value);
  };


  const handleItemClick = (node: TreeNodeData, e: MouseEvent) => {
    handleExpand(node, e);
    node.isActive = !node.isActive;
    emit('node-click', node, e);
    e.stopPropagation();
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


    return <div class="m-menu">
      <div class="m-menu-main">
        <MMenuItem {...treeNodeProps} root={true}/>
      </div>
    </div>;
  };
}, {
  name: 'MMenu',
  props,
  emits: {
    /* eslint-disable */
    'update:checkedKeys': (keys: TreeNodeData['key'][]) => true,
    /* eslint-disable */
    'node-click': (node: TreeNodeData, e: MouseEvent) => true
  }
});
