import {TreeConfig, TreeData, TreeNodeData, TreeDataMap} from "./index";
import {genTreeDataMap} from "./treeUtil";

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

  public getTreeData() {
    return this.#treeData
  }

  public findNodeById(id: TreeNodeData['key']) {
    return this.#treeMap.get(id)
  }

  public setChildStatus(node: TreeNodeData) {
    if (Reflect.has(node, 'expand')) {
      node.expand = !node.expand
    } else {
      Reflect.set(node, 'expand', true)
    }
    const { children: childrenKey } = this.#config
    const children: TreeNodeData[] = node[childrenKey] ?? []
    if (children.length > 0) {
      children.forEach((n) => this.setChildStatus(n))
    }
  }

  public toggleExpand(node: TreeNodeData) {
    console.log('toggle ')
    this.setChildStatus(node)
    console.log('current node => ', node)
  }
}
