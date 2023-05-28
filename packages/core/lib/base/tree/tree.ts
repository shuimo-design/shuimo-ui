import {TreeConfig, TreeData, TreeNodeData, TreeDataMap, TreeStatusKey} from "./index";
import {genTreeDataMap} from "./treeUtil";
import {s} from "vitest/dist/types-e3c9754d";

export const DEFAULT_CONFIG: TreeConfig = {
  key: 'key',
  label: 'label',
  value: 'value',
  children: 'children'
}

export interface TreeNodeOptions {
  data: TreeData | TreeData[]
  config?: TreeConfig
}
export default class TreeNode<T extends TreeData = TreeData> {
  #treeData: TreeNodeData[] = []
  // flat tree data list
  #treeMap: TreeDataMap = new Map<TreeNodeData["key"], TreeNodeData>()
  // config
  #config: TreeConfig = DEFAULT_CONFIG
  constructor(options: TreeNodeOptions) {
    const { data, config = DEFAULT_CONFIG } = options
    this.#config = config
    this.updateTreeData(data)
  }

  public updateTreeData(data: TreeData | TreeData[]) {
    const originData = Array.isArray(data) ? data : [data]
    this.#treeData = originData
    this.#treeMap = genTreeDataMap(originData, this.#config, this.#treeMap)
  }

  public findChildrenByKey(key: TreeNodeData['key']): TreeNodeData[] {
    const node = this.#treeMap.get(key);
    return node ? node.children || [] : [];
  }
  public findParentByKey(key: TreeNodeData['key']): TreeNodeData | null {
    const node = this.#treeMap.get(key);
    return node ? node.parent || null : null;
  }

  public findSiblingsByKey(key: TreeNodeData['key']): TreeNodeData[] {
    const parent = this.findParentByKey(key);
    return parent ? parent.children || [] : [];
  }

  public getTreeData() {
    return this.#treeData
  }

  public findNodeById(id: TreeNodeData['key']) {
    return this.#treeMap.get(id)
  }

  #initialStatus(statusKey: TreeStatusKey, node?: TreeNodeData, defaultValue: boolean = true) {
    if (node) {
      if (Reflect.has(node, statusKey)) {
        node[statusKey] = !node[statusKey]
      } else {
        Reflect.set(node, statusKey, defaultValue)
      }
    }
  }

  #setChildStatus(statusKey: TreeStatusKey, node: TreeNodeData) {
    const { children: childrenKey } = this.#config
    const children: TreeNodeData[] = node[childrenKey] ?? []
    if (children.length > 0) {
      children.forEach((n) => this.#initialStatus(statusKey, n))
    }
  }

  #setParentStatus(statusKey: TreeStatusKey, node: TreeNodeData) {
    const parent = node.parent
    // TODO: If  Check siblings node status
    this.#initialStatus(statusKey, parent)
  }

  public toggleStatusByNode( statusKey: TreeStatusKey, node: TreeNodeData) {
    this.#initialStatus(statusKey, node)
    // this.#setChildStatus(statusKey, node)
    // this.#setParentStatus(statusKey, node)
  }
}
