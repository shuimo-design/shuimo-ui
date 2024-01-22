/**
 * @description tree api type
 * @author Jobin
 * @date 2023/6/24 23:27
 * @version v1.0.0
 *
 * @name m-tree
 * @docDescription Tree component with shuimo-ui style.
 *                 水墨组件的树组件。
 * @docUrl https://shuimo.design/tree
 */
export declare type TreeProps = {
  /**
   * @description tree data
   *              树数据
   * @type TreeData
   * @default []
   */
  data?: TreeData | TreeData[];
  /**
   * @description tree config
   *              树配置
   * @type TreeConfig
   * @default { key:'key', label:'label', value:'value', children: 'children' }
   */
  config?: TreeConfig;
  /**
   * @description checkbox 是否使用checkbox
   *              树数据
   * @type TreeData
   * @default []
   */
  checkbox?: boolean;
  /**
   * @description default expand all nodes
   *              是否默认打开所有节点
   * @type boolean
   * @default false
   */
  defaultExpandAll?: boolean;
  /**
   * @description checked keys
   *              选中key列表
   * @type Array<string|number>
   * @default []
   */
  checkedKeys?: Array<string | number>;
  /**
   * @description the selected status of the parent and child nodes is no longer associated,
   *              and can be selected or canceled separately
   *              父子节点选中状态不再关联，可各自选中或取消
   * @type boolean
   * @default true
   */
  checkStrictly?: boolean;
}

export interface TreeData {
  key: string | number;
  label?: string;
  value?: string | number;
  children?: TreeData[];
  disabled?: boolean;
  [k: string]: any;
}

export interface TreeNodeData extends TreeData {
  /**
   * checkbox selected
   */
  checked?: boolean;
  /**
   * indeterminate
   */
  indeterminate?: boolean;
  /**
   * click to select
   */
  selected?: boolean;
  /**
   * expand
   */
  expand?: boolean;
  /**
   * close
   */
  close?: boolean;
  /**
   * children
   */
  children?: TreeNodeData[];
  /**
   * parent
   */
  parent?: TreeNodeData | null;
  /**
   * top-level identifier
   */
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

export declare type TreeEvents = {
  // onInput?: (e: HTMLElementEvent<HTMLInputElement>) => void
  // onFocus?: (e: FocusEvent) => void
  // onBlur?: (e: FocusEvent) => void
}
