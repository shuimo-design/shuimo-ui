/**
 * @description menu props 类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

/**
 * 菜单数据项
 */
export interface MenuData {
  key: string | number;
  label?: string;
  value?: string | number;
  children?: MenuData[];
  disabled?: boolean;
  [k: string]: unknown;
}

/**
 * 菜单内部节点数据（带状态）
 */
export interface MenuNodeData extends MenuData {
  /** 是否展开 */
  expand?: boolean;
  /** 是否激活 */
  isActive?: boolean;
  /** 是否选中（checkbox 模式） */
  checked?: boolean;
  /** 半选状态 */
  indeterminate?: boolean;
  /** 子节点 */
  children?: MenuNodeData[];
  /** 父节点引用 */
  parent?: MenuNodeData | null;
  /** 是否根节点 */
  isRoot?: boolean;
}

/**
 * 菜单字段映射配置
 */
export interface MenuConfig {
  key: string;
  label: string;
  children: string;
}

export declare type MenuProps = {
  /**
   * @description 菜单数据
   * @type MenuData[]
   * @default []
   */
  data?: MenuData[];
  /**
   * @description 字段映射配置
   * @type MenuConfig
   * @default { key: 'key', label: 'label', children: 'children' }
   */
  config?: MenuConfig;
  /**
   * @description 是否使用 checkbox
   * @type boolean
   * @default false
   */
  checkbox?: boolean;
  /**
   * @description 默认展开所有节点
   * @type boolean
   * @default false
   */
  defaultExpandAll?: boolean;
  /**
   * @description 选中的 key 列表
   * @type Array<string|number>
   * @default []
   */
  checkedKeys?: Array<string | number>;
};
