import {TreeData, TreeNodeData, TreeDataMap, TreeConfig} from "./index";

// export function getSymbolKey(id: TreeData['key']) {
//   return Symbol.for(id + '')
// }
export function genTreeDataMap(data: TreeData[], config: TreeConfig, treeMap: TreeDataMap) {
  const { key, children } = config
  const len = data.length
  for (let i = 0; i < len; i++ ) {
    const nodeData = data[i]
    treeMap.set(nodeData[key], nodeData)
    if (Reflect.has(nodeData, children)) {
      genTreeDataMap(nodeData[children], config, treeMap)
    }
  }
  return treeMap
}
