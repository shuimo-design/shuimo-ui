import {TreeData, TreeNodeData, TreeDataMap, TreeConfig} from "./index";

// export function getSymbolKey(id: TreeData['key']) {
//   return Symbol.for(id + '')
// }
export function genTreeDataMap(data: TreeData[], config: TreeConfig, treeMap: TreeDataMap, parentNode?: TreeNodeData) {
  const { key, children } = config
  const len = data.length
  for (let i = 0; i < len; i++ ) {
    const nodeData = data[i]
    const treeNodeTata: TreeNodeData = {
      ...nodeData,
      parent: parentNode,
      expand: false,
      selected: false,
      checked: false
    }
    // 反赋值，保证变更时数据一起变动
    data[i] = treeNodeTata
    treeMap.set(nodeData[key], treeNodeTata)
    if (Reflect.has(nodeData, children)) {
      genTreeDataMap(nodeData[children], config, treeMap, treeNodeTata)
    }
  }
  return treeMap
}
