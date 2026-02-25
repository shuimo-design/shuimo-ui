/**
 * @description tree 运行时 props 定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { TreeNodeData, TreeNodeProps, TreeProps } from './props';
import { DEFAULT_CONFIG } from './tree';

/** 默认树配置（对外导出供使用方引用） */
export const DEFAULT_TREE_CONFIG = DEFAULT_CONFIG;

/** MTree 组件的 props 定义 */
export const props: MCOPO<TreeProps> = {
  data: { type: [Object, Array], default: () => [] },
  config: { type: Object, default: () => DEFAULT_CONFIG },
  checkbox: { type: Boolean, default: false },
  defaultExpandAll: { type: Boolean, default: false },
  checkedKeys: { type: Array, default: () => [] },
  checkStrictly: { type: Boolean, default: true },
};

/** MTreeNode 子组件的 props 定义 */
export const treeNodeProps: MCOPO<TreeNodeProps> = {
  data: { type: Array, default: () => [] },
  config: { type: Object, default: () => DEFAULT_CONFIG },
  checkbox: { type: Boolean, default: false },
  getNodesByKeys: {
    type: Function as MPropType<(keys: TreeNodeData['key'][]) => TreeNodeData[]>,
    required: true,
  },
  handleCheck: {
    type: Function as MPropType<(node: TreeNodeData, check: boolean) => void>,
    required: true,
  },
  handleExpand: {
    type: Function as MPropType<(node: TreeNodeData, e: MouseEvent) => void>,
    required: true,
  },
  handleItemClick: {
    type: Function as MPropType<(node: TreeNodeData, e: MouseEvent) => void>,
    required: true,
  },
};
