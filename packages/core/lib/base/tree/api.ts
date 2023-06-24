import { MCOPO, MPropType } from '@shuimo-design/types';
import { TreeNodeData, TreeNodeProps, TreeProps } from './index';
import { DEFAULT_CONFIG } from "./tree";


export const props: MCOPO<TreeProps> = {
  data: { type: [Object, Array], default: () => []},
  config: { type: Object, default: () => DEFAULT_CONFIG },
  defaultExpandAll: { type: Boolean, default: false },
  checkable: { type: Boolean, default: false },
  checkedKeys: { type: Array, default: () => []},
  checkStrictly: { type: Boolean, default: true },
};


export const treeNodeProps: MCOPO<TreeNodeProps> = {
  data: { type: Array, default: () => [] },
  config: { type: Object, default: () => DEFAULT_CONFIG },
  checkable: { type: Boolean, default: false },
  getNodesByKeys: { type: Function as MPropType<(keys: TreeNodeData['key'][]) => TreeNodeData[]>, required: true },
  handleCheck: { type: Function as MPropType<(node: TreeNodeData, check: boolean) => void>, required: true },
  handleExpand: { type: Function as MPropType<(node: TreeNodeData, e: MouseEvent) => void>, required: true },
  handleItemClick: { type: Function as MPropType<(node: TreeNodeData, e: MouseEvent) => void>, required: true },
}
