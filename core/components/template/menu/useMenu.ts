/**
 * @description menu 核心 composable，内建简化版树数据管理
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { shallowRef, triggerRef, ShallowRef } from 'vue';
import { MenuData, MenuNodeData, MenuConfig, MenuProps } from './props';

const DEFAULT_CONFIG: MenuConfig = { key: 'key', label: 'label', children: 'children' };

/**
 * 递归构建节点树，附加状态属性
 */
function buildNodes(
  data: MenuData[],
  config: MenuConfig,
  nodeMap: Map<string | number, MenuNodeData>,
  defaultExpandAll: boolean = false,
  parent: MenuNodeData | null,
): MenuNodeData[] {
  return data.map(item => {
    const key = item[config.key] as string | number;
    const childrenKey = config.children;
    const node: MenuNodeData = {
      ...item,
      expand: defaultExpandAll,
      isActive: false,
      checked: false,
      indeterminate: false,
      parent,
      isRoot: !parent,
    };
    nodeMap.set(key, node);

    const rawChildren = item[childrenKey];
    if (Array.isArray(rawChildren) && rawChildren.length > 0) {
      node.children = buildNodes(
        rawChildren as MenuData[],
        config,
        nodeMap,
        defaultExpandAll,
        node,
      );
    }

    return node;
  });
}

export function useMenu(props: MenuProps) {
  const config: MenuConfig = { ...DEFAULT_CONFIG, ...props.config };
  const nodeMap = new Map<string | number, MenuNodeData>();
  const nodesRef: ShallowRef<MenuNodeData[]> = shallowRef([]);

  /**
   * 将原始 MenuData[] 转换为带状态的 MenuNodeData[]
   * 供初始化或 data prop 变更时调用
   */
  const initNodes = (data: MenuData[] = []) => {
    nodeMap.clear();
    nodesRef.value = buildNodes(data, config, nodeMap, props.defaultExpandAll ?? false, null);

    // 处理外部传入的 checkedKeys
    if (props.checkedKeys?.length) {
      props.checkedKeys.forEach(key => {
        const node = nodeMap.get(key);
        if (node) {
          node.checked = true;
        }
      });
    }

    triggerRef(nodesRef);
  };

  // 首次初始化
  initNodes(props.data ?? []);

  /**
   * 切换节点展开/收起状态
   */
  const toggleExpand = (node: MenuNodeData) => {
    node.expand = !node.expand;
    triggerRef(nodesRef);
  };

  /**
   * 设置节点为激活状态，同时取消其他节点的激活
   */
  const setActive = (node: MenuNodeData) => {
    nodeMap.forEach(n => {
      n.isActive = false;
    });
    node.isActive = true;
    triggerRef(nodesRef);
  };

  /**
   * 切换 checkbox 选中状态
   */
  const toggleChecked = (node: MenuNodeData, checked: boolean) => {
    node.checked = checked;
    node.indeterminate = false;
    triggerRef(nodesRef);
  };

  /**
   * 获取当前所有选中节点的 key 列表
   */
  const getCheckedKeys = (): (string | number)[] => {
    const keys: (string | number)[] = [];
    nodeMap.forEach((node, key) => {
      if (node.checked && !node.indeterminate) {
        keys.push(key);
      }
    });
    return keys;
  };

  /**
   * 根据 key 列表批量获取节点
   */
  const getNodesByKeys = (keys: (string | number)[]): MenuNodeData[] => {
    return keys
      .map(key => nodeMap.get(key))
      .filter((n): n is MenuNodeData => n !== undefined);
  };

  return {
    nodesRef,
    nodeMap,
    initNodes,
    toggleExpand,
    setActive,
    toggleChecked,
    getCheckedKeys,
    getNodesByKeys,
    config,
  };
}
