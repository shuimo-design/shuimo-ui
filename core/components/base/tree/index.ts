/**
 * @description tree core 导出
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props, treeNodeProps } from './api';
import { useTree } from './useTree';

export const TreeCore = {
  props,
  treeNodeProps,
  useTree,
};

export type {
  TreeProps,
  TreeData,
  TreeNodeData,
  TreeConfig,
  TreeStatusKey,
  TreeNodeProps,
} from './props';

export { useTree, fixKey } from './useTree';
export { default as Tree } from './tree';
export { DEFAULT_TREE_CONFIG, props as treeProps, treeNodeProps } from './api';
