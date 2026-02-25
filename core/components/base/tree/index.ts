/**
 * @description tree core 入口，导出 TreeCore 及所有相关类型与工具
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props, treeNodeProps } from './api';
import { useTree } from './useTree';

/** TreeCore：供 headless/lib 组件层引用的打包入口 */
export const TreeCore = {
  props,
  treeNodeProps,
  useTree,
};

// 类型导出
export type {
  TreeProps,
  TreeData,
  TreeNodeData,
  TreeConfig,
  TreeStatusKey,
  TreeNodeProps,
} from './props';

// 工具/类导出
export { useTree } from './useTree';
export { fixKey } from './useTree';
export { default as Tree } from './tree';
export { DEFAULT_TREE_CONFIG, props as treeProps, treeNodeProps } from './api';
