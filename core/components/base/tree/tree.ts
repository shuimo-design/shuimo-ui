/**
 * @description Tree 核心数据结构类，负责树节点的构建、缓存和状态管理
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { TreeConfig, TreeData, TreeNodeData, TreeStatusKey } from './props';

/** 节点缓存 Map 类型 */
export type TreeDataMap = Map<TreeNodeData['key'], TreeNodeData>;

/** 默认字段映射配置 */
export const DEFAULT_CONFIG: TreeConfig = {
  key: 'key',
  label: 'label',
  value: 'value',
  children: 'children',
  expand: 'expand',
};

/** 合并用户配置与默认配置 */
export const mergeConfig = (config: Partial<TreeConfig>): TreeConfig => {
  if (config === DEFAULT_CONFIG) {
    return DEFAULT_CONFIG;
  }
  return {
    key: config.key ?? DEFAULT_CONFIG.key,
    label: config.label ?? DEFAULT_CONFIG.label,
    value: config.value ?? DEFAULT_CONFIG.value,
    children: config.children ?? DEFAULT_CONFIG.children,
    expand: config.expand ?? DEFAULT_CONFIG.expand,
  };
};

export interface TreeNodeOptions {
  data: TreeData | TreeData[];
  config?: TreeConfig;
  defaultExpandAll?: boolean;
  checkStrictly?: boolean;
}

export interface TreeAttrs {
  defaultExpandAll: boolean;
  checkStrictly: boolean;
}

export default class Tree {
  /** 源数据（已深拷贝） */
  #source: TreeNodeData[];
  /** 节点缓存 Map，key 为节点标识 */
  #cacheMap: TreeDataMap;
  /** 字段映射配置 */
  #config: TreeConfig = DEFAULT_CONFIG;
  /** 初始化配置（defaultExpandAll / checkStrictly） */
  #initialConfig: TreeAttrs;

  constructor(options: TreeNodeOptions) {
    const {
      data,
      config = DEFAULT_CONFIG,
      defaultExpandAll = false,
      checkStrictly = true,
    } = options;
    this.#cacheMap = new Map<TreeNodeData['key'], TreeNodeData>();
    this.#source = Array.isArray(data) ? data : [data];
    this.#config = mergeConfig(config);
    this.#initialConfig = { defaultExpandAll, checkStrictly };
    this.#init();
  }

  /** 暴露配置，供组件层读取 */
  get config() {
    return this.#config;
  }

  /** 递归生成单个 TreeNodeData，并写入 cacheMap */
  #genTreeNodeData(data: TreeData, parentKey?: TreeData['key']): TreeNodeData {
    const { defaultExpandAll } = this.#initialConfig;
    const { key: k, children: c, expand: e } = this.#config;

    const node: TreeNodeData = {
      ...data,
      expand: defaultExpandAll || !!(data[e!] as boolean | undefined),
      selected: false,
      checked: false,
      indeterminate: false,
      parent: parentKey ? this.#cacheMap.get(parentKey) : undefined,
      isRoot: !parentKey,
    };

    // 使用节点自身的 key 字段值作为 Map 键
    this.#cacheMap.set(node[k] as TreeNodeData['key'], node);

    // 递归处理子节点
    const nodeChildren = node[c] as TreeNodeData[] | undefined;
    if (nodeChildren && nodeChildren.length > 0) {
      node[c] = this.#genCacheMap(nodeChildren, node[k] as TreeData['key']) as unknown;
    }

    return node;
  }

  /** 清空缓存 */
  #clearCache() {
    this.#cacheMap.clear();
  }

  /** 初始化：清空缓存后重新构建 */
  #init() {
    this.#clearCache();
    this.#genCacheMap();
  }

  /** 递归批量构建节点并填充 cacheMap */
  #genCacheMap(data: TreeNodeData[] = this.#source, parentKey?: TreeData['key']): TreeNodeData[] {
    const len = data.length;
    const treeNodeData: TreeNodeData[] = [];
    for (let i = 0; i < len; i++) {
      const treeNode = this.#genTreeNodeData(data[i], parentKey);
      treeNodeData.push(treeNode);
    }
    return treeNodeData;
  }

  /** 获取所有缓存节点列表 */
  #getCacheList(): TreeNodeData[] {
    return Array.from(this.#cacheMap.values());
  }

  /**
   * 向上递归更新父节点的选中/半选状态
   * 规则：所有子节点选中 → 父节点选中；部分选中或有半选 → 父节点半选
   */
  #setParentChecked(parent: TreeNodeData) {
    if (parent.disabled) {
      return;
    }
    const { children: c } = this.#config;
    const children: TreeNodeData[] = (parent[c] as TreeNodeData[]) ?? [];
    const allChecked = children.every(child => child.checked);
    const oneChecked = children.some(child => child.checked);
    const onIndeterminate = children.some(child => child.indeterminate);

    if (allChecked) {
      parent.indeterminate = false;
      parent.checked = true;
    } else {
      parent.indeterminate = oneChecked || onIndeterminate;
      parent.checked = false;
    }

    // 继续向上传播
    if (parent.parent) {
      this.#setParentChecked(parent.parent);
    }
  }

  /** 递归设置子节点的某个状态字段 */
  #setChildrenStatus(statusKey: TreeStatusKey, nodes: TreeNodeData[], value: boolean) {
    const { children: c } = this.#config;
    nodes.forEach(node => {
      if (node.disabled) {
        return;
      }
      (node as Record<string, unknown>)[statusKey] = value;
      const nodeChildren = node[c] as TreeNodeData[] | undefined;
      if (nodeChildren) {
        this.#setChildrenStatus(statusKey, nodeChildren, value);
      }
    });
  }

  // ==================== 公开方法 ====================

  /** 获取某节点的直接子节点 key 列表 */
  getChildrenKeys(node: TreeNodeData): TreeNodeData['key'][] {
    const { children: c, key: k } = this.#config;
    const children = node[c] as TreeNodeData[] | undefined;
    if (children) {
      return children.map((it) => it[k] as TreeNodeData['key']);
    }
    return [];
  }

  /** 根据 key 数组批量获取节点 */
  getNodesByKeys(keys: TreeNodeData['key'][]): TreeNodeData[] {
    return keys.map(key => this.#cacheMap.get(key)!);
  }

  /**
   * 获取树形数据
   * @param keys 若传入则返回对应 key 的节点列表，否则返回所有根节点
   */
  getTreeData(keys?: TreeNodeData['key'][]): TreeNodeData[] {
    if (keys) {
      return this.getNodesByKeys(keys);
    }
    return this.#getCacheList().filter(it => it.isRoot);
  }

  /** 获取当前所有选中 key 和展开 key */
  getKeys(): { checkedKeys: TreeNodeData['key'][]; expandKeys: TreeNodeData['key'][] } {
    const expandKeys: TreeNodeData['key'][] = [];
    const checkedKeys: TreeNodeData['key'][] = [];
    const iterator = this.#cacheMap[Symbol.iterator]();
    let next = iterator.next();
    while (!next.done) {
      const [, node] = next.value;
      const key = Reflect.get(node as Record<string, unknown>, this.#config.key as string) as TreeNodeData['key'];
      // 排除半选状态
      if (node.checked && !node.indeterminate) {
        checkedKeys.push(key);
      }
      if (node.children && node.expand) {
        expandKeys.push(key);
      }
      next = iterator.next();
    }
    return { checkedKeys, expandKeys };
  }

  /** 切换节点展开/收起状态 */
  toggleExpand(node: TreeNodeData, value?: boolean) {
    if (value !== undefined) {
      node.expand = value;
    } else {
      node.expand = !node.expand;
    }
  }

  /**
   * 设置节点 checkbox 选中状态
   * checkStrictly=true（默认）时级联更新子节点和父节点状态
   */
  setNodeCheckbox(node: TreeNodeData, checked: boolean) {
    node.checked = checked;
    node.indeterminate = false;
    const { checkStrictly } = this.#initialConfig;
    if (!checkStrictly) {
      return;
    }
    // 向下级联：设置所有子孙节点
    if (node.children) {
      this.#setChildrenStatus('checked', node.children, checked);
    }
    // 向上级联：更新父节点的半选/全选状态
    if (node.parent) {
      this.#setParentChecked(node.parent);
    }
  }

  /** 根据 key 数组批量设置节点为选中状态 */
  setCheckedByKeys(keys: TreeNodeData['key'][]) {
    const nodes = this.getNodesByKeys(keys);
    nodes.forEach(node => {
      if (node) {
        this.setNodeCheckbox(node, true);
      }
    });
  }
}
