/**
 * @description tree 组件类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * @name m-tree
 * @docDescription Tree component with shuimo-ui style.
 *                 水墨组件的树组件。
 * @docUrl https://shuimo.design/tree
 */

export declare type TreeProps = {
  /**
   * @description 树数据
   * @type TreeData | TreeData[]
   * @default []
   */
  data?: TreeData | TreeData[];
  /**
   * @description 树配置项，用于字段映射
   * @type TreeConfig
   * @default { key:'key', label:'label', value:'value', children: 'children' }
   */
  config?: TreeConfig;
  /**
   * @description 是否使用 checkbox 模式
   * @type boolean
   * @default false
   */
  checkbox?: boolean;
  /**
   * @description 是否默认展开所有节点
   * @type boolean
   * @default false
   */
  defaultExpandAll?: boolean;
  /**
   * @description 选中的 key 列表（v-model:checkedKeys）
   * @type Array<string|number>
   * @default []
   */
  checkedKeys?: Array<string | number>;
  /**
   * @description 父子节点选中状态是否关联（true 表示关联）
   * @type boolean
   * @default true
   */
  checkStrictly?: boolean;
};

export interface TreeData {
  key: string | number;
  label?: string;
  value?: string | number;
  children?: TreeData[];
  disabled?: boolean;
  [k: string]: unknown;
}

export interface TreeNodeData extends TreeData {
  /** checkbox 选中状态 */
  checked?: boolean;
  /** 半选状态（部分子节点选中） */
  indeterminate?: boolean;
  /** 点击选中状态 */
  selected?: boolean;
  /** 展开状态 */
  expand?: boolean;
  /** 收起状态 */
  close?: boolean;
  /** 子节点列表 */
  children?: TreeNodeData[];
  /** 父节点引用 */
  parent?: TreeNodeData | null;
  /** 是否为根节点 */
  isRoot?: boolean;
}

export type TreeStatusKey = 'checked' | 'selected' | 'expand' | 'close';

export interface TreeConfig {
  key: string | number;
  label: string;
  value: string;
  children: string;
  expand?: string;
}

/**
 * MTreeNode 子组件的 props 类型
 */
export declare type TreeNodeProps = {
  /** 当前层节点数据列表 */
  data?: TreeNodeData[];
  /** 字段映射配置 */
  config?: TreeConfig;
  /** 是否使用 checkbox */
  checkbox?: boolean;
  /** 根据 key 批量获取节点 */
  getNodesByKeys: (keys: (string | number)[]) => TreeNodeData[];
  /** 切换展开/收起 */
  handleExpand: (node: TreeNodeData, e: MouseEvent) => void;
  /** 切换 checkbox 选中 */
  handleCheck: (node: TreeNodeData, checked: boolean) => void;
  /** 节点点击 */
  handleItemClick: (node: TreeNodeData, e: MouseEvent) => void;
};
