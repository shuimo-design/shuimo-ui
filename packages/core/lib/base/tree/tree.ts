import { TreeConfig, TreeData, TreeNodeData, TreeStatusKey } from './index';


/**
 *  Symbol key in stage3. todo
 *  export type TreeNodeWeakMap = WeakMap<Symbol, TreeNodeData>
 *  Use Map now
 */
export type TreeDataMap = Map<TreeNodeData['key'], TreeNodeData>

export const DEFAULT_CONFIG: TreeConfig = {
  key: 'key',
  label: 'label',
  value: 'value',
  children: 'children'
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
  #source: TreeNodeData[];
  #cacheMap: TreeDataMap;
  #config: TreeConfig = DEFAULT_CONFIG;
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
    this.#config = config;
    this.#initialConfig = {
      defaultExpandAll,
      checkStrictly
    };
    this.#init();
  }

  #genTreeNodeData(data: TreeData, parentKey?: TreeData['key']) {
    const { defaultExpandAll } = this.#initialConfig;
    const { key: k, children: c } = this.#config;

    const node: TreeNodeData = {
      ...data,
      expand: defaultExpandAll,
      selected: false,
      checked: false,
      indeterminate: false,
      parent: parentKey ? this.#cacheMap.get(parentKey) : undefined,
      isRoot: !parentKey
    };
    this.#cacheMap.set(node[k], node);
    if (node[c] && node[c].length > 0) {
      node[c] = this.#genCacheMap(node[c], node[k]);
    }
    return node;
  }

  #clearCache() {
    this.#cacheMap.clear();
  }

  #init() {
    this.#clearCache();
    this.#genCacheMap();
  }

  #genCacheMap(data = this.#source, parentKey?: TreeData['key']) {
    const len = data.length;
    let i;
    const treeNodeData: TreeNodeData[] = [];
    for (i = 0; i < len; i++) {
      const item = data[i];
      const treeNode = this.#genTreeNodeData(item, parentKey);
      data[i] = item;
      treeNodeData.push(treeNode);
    }

    return treeNodeData;
  }

  #getCacheList() {
    return Array.from(this.#cacheMap.values());
  }

  #setParentChecked(parent: TreeNodeData) {
    if (parent.disabled) {
      return
    }
    const { children: c } = this.#config;
    const children: TreeNodeData[] = parent[c] ?? [];
    const allChecked = children.every((child) => child.checked);
    const oneChecked = children.some((child) => child.checked);
    const onIndeterminate = children.some((child) => child.indeterminate);
    if (allChecked) {
      parent.indeterminate = false;
      parent.checked = true;
    } else {
      parent.indeterminate = oneChecked || onIndeterminate;
      parent.checked = false;
    }
    if (parent.parent) {
      this.#setParentChecked(parent.parent);
    }
  }

  #setChildrenStatus(statusKey: TreeStatusKey, nodes: TreeNodeData[], value: boolean) {
    const { children: c } = this.#config;
    nodes.forEach((node) => {
      if (node.disabled) {
        return
      }
      node[statusKey] = value;
      if (node[c]) {
        this.#setChildrenStatus(statusKey, node[c], value);
      }
    });
  }

  getChildrenKeys(node: TreeNodeData): TreeNodeData['key'][] {
    const { children: c, key: k } = this.#config;
    if (node[c]) {
      return node[c].map((it: TreeNodeData) => it[k]);
    }
    return [];
  }

  getNodesByKeys(keys: TreeNodeData['key'][]) {
    return keys.map((key) => {
      return this.#cacheMap.get(key);
    });
  }

  getTreeData(keys?: TreeNodeData['key'][]) {
    if (keys) {
      return this.getNodesByKeys(keys);
    }
    const values = this.#getCacheList();
    return values.filter((it) => it.isRoot);
  }

  getKeys() {
    const expandKeys: TreeNodeData['key'][] = [];
    const checkedKeys: TreeNodeData['key'][] = [];
    const iterator = this.#cacheMap[Symbol.iterator]();
    let next = iterator.next();
    while (!next.done) {
      const [, node] = next.value;
      const key = Reflect.get(node, this.#config.key);
      // 排除半选
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

  toggleExpand(node: TreeNodeData, value?: boolean) {
    if (value !== undefined) {
      node.expand = value;
    } else {
      node.expand = !node.expand;
    }
  }

  setNodeCheckbox(node: TreeNodeData, checked: boolean) {
    node.checked = checked;
    node.indeterminate = false;
    const { checkStrictly } = this.#initialConfig
    if (!checkStrictly) {
      return
    }
    if (node.children) {
      this.#setChildrenStatus('checked', node.children, checked);
    }
    if (node.parent) {
      this.#setParentChecked(node.parent);
    }
  }

  setCheckedByKeys(keys: TreeNodeData['key'][]) {
    const nodes = this.getNodesByKeys(keys);
    nodes.forEach((node) => {
      if (node) {
        this.setNodeCheckbox(node, true);
      }
    });
  }
}
