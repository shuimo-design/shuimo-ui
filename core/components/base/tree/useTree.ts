/**
 * @description Tree 组件 composable，封装树的初始化与交互逻辑
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { shallowRef } from 'vue';
import Tree from './tree';
import { TreeData, TreeNodeData, TreeProps } from './props';

/** fixKey 内部递归实现：为无 key 的节点生成唯一 key */
const _fixKey = (data: TreeData[], key: string | number = 'key', prefixKey: string | number): TreeData[] => {
  let keyStart = 0;
  return data.map(d => {
    if (!d[key]) {
      d[key] = `${prefixKey}${keyStart++}`;
    }
    if (d.children) {
      d.children = _fixKey(d.children as TreeData[], key, d[key] as string | number) as TreeData[];
    }
    return d;
  });
};

/**
 * 为没有 key 的节点递归生成唯一标识
 * @param data 树数据（数组或单节点）
 * @param key  key 字段名，默认 'key'
 * @param prefixKey 前缀 key，用于构造子节点唯一 id
 */
export const fixKey = (
  data: TreeData | TreeData[],
  key: string | number,
  prefixKey: string | number = '',
): TreeData | TreeData[] => {
  return Array.isArray(data)
    ? _fixKey(data, key ?? 'key', prefixKey)
    : _fixKey([data], key ?? 'key', prefixKey)[0];
};

export interface UseTreeOptions {
  props: TreeProps;
  event: {
    /** 触发 shallowRef 更新，通知 Vue 重新渲染 */
    triggerTree: () => void;
  };
}

/**
 * useTree — Tree 组件逻辑 composable
 *
 * 返回：
 * - treeRef：Tree 实例的 shallowRef
 * - initTreeRef：重新初始化 Tree（数据变化时调用）
 * - handleToggleExpand：切换节点展开/收起
 * - handleToggleChecked：切换节点 checkbox 选中状态
 * - getNodesByKeys：根据 key 批量获取节点
 */
export const useTree = (options: UseTreeOptions) => {
  const { props, event } = options;
  const treeRef = shallowRef<Tree>();

  /**
   * 初始化 Tree 实例
   * 使用 structuredClone 深拷贝数据，避免直接修改外部数据源
   */
  const initTreeRef = (data: TreeData | TreeData[] | undefined = props.data) => {
    // 统一转为数组
    const rawArr = Array.isArray(data) ? data : (data ? [data] : []);
    // 深拷贝避免污染原始数据（不使用 structuredClone，因为 Vue 响应式代理无法被 clone）
    const cloned = JSON.parse(JSON.stringify(rawArr)) as TreeData[];
    // 为无 key 节点补充 key
    const keyField = props.config?.key ?? 'key';
    const fixed = fixKey(cloned, keyField) as TreeData[];

    treeRef.value = new Tree({
      data: fixed,
      config: props.config,
      defaultExpandAll: props.defaultExpandAll,
      checkStrictly: props.checkStrictly,
    });
  };

  // 组件挂载时立即初始化
  initTreeRef();

  /** 切换节点展开/收起，并触发 Vue 响应式更新 */
  const handleToggleExpand = (node: TreeNodeData, e: MouseEvent) => {
    e.stopPropagation();
    treeRef.value?.toggleExpand(node);
    event.triggerTree();
  };

  /** 切换节点 checkbox 选中状态，并触发 Vue 响应式更新 */
  const handleToggleChecked = (node: TreeNodeData, checked: boolean) => {
    treeRef.value?.setNodeCheckbox(node, checked);
    event.triggerTree();
  };

  /** 根据 key 数组获取节点列表（透传给 MTreeNode 使用） */
  const getNodesByKeys = (keys: TreeNodeData['key'][]): TreeNodeData[] => {
    return treeRef.value!.getTreeData(keys);
  };

  return {
    treeRef,
    getNodesByKeys,
    handleToggleExpand,
    handleToggleChecked,
    initTreeRef,
  };
};
