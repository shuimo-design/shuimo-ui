import {TreeData, TreeNodeData, TreeDataMap, TreeConfig} from "./index";
import {TreeAttrs} from "./tree";

// export function getSymbolKey(id: TreeData['key']) {
//   return Symbol.for(id + '')
// }
export function genTreeDataMap(data: TreeData[], config: TreeConfig, treeAttrs: TreeAttrs, treeMap: TreeDataMap, parentNode?: TreeNodeData) {
  const { key, children } = config
  const { defaultExpandAll } = treeAttrs
  const len = data.length
  for (let i = 0; i < len; i++ ) {
    const nodeData = data[i]
    const treeNodeTata: TreeNodeData = {
      ...nodeData,
      parent: parentNode,
      expand: defaultExpandAll,
      selected: false,
      checked: false
    }
    // 反赋值，保证变更时数据一起变动
    data[i] = treeNodeTata
    treeMap.set(nodeData[key], treeNodeTata)
    if (Reflect.has(nodeData, children)) {
      genTreeDataMap(nodeData[children], config, treeAttrs, treeMap, treeNodeTata)
    }
  }
  return treeMap
}
