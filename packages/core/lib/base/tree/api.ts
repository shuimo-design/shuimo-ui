/**
 * @description tree props
 * @author Jobin
 * @date 2023/6/24 23:27
 * @version v1.0.0
 */
import { MCOPO, MPropType } from '@shuimo-design/types';
import { TreeNodeData, TreeProps } from './index';
import { TreeNodeProps } from './treeNode';
import { DEFAULT_CONFIG } from "./tree";


export const props: MCOPO<TreeProps> = {
  data: { type: [Object, Array], default: () => []},
  config: { type: Object, default: () => DEFAULT_CONFIG },
  checkbox: { type: Boolean, default: false },
  defaultExpandAll: { type: Boolean, default: false },
  checkedKeys: { type: Array, default: () => []},
  checkStrictly: { type: Boolean, default: true },
};


export const treeNodeProps: MCOPO<TreeNodeProps> = {
  data: { type: Array, default: () => [] },
  config: { type: Object, default: () => DEFAULT_CONFIG },
  checkbox: { type: Boolean, default: false },
  getNodesByKeys: { type: Function as MPropType<(keys: TreeNodeData['key'][]) => TreeNodeData[]>, required: true },
  handleCheck: { type: Function as MPropType<(node: TreeNodeData, check: boolean) => void>, required: true },
  handleExpand: { type: Function as MPropType<(node: TreeNodeData, e: MouseEvent) => void>, required: true },
  handleItemClick: { type: Function as MPropType<(node: TreeNodeData, e: MouseEvent) => void>, required: true },
}
