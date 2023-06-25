export interface TreeData {
  key: string | number
  label?: string
  value?: string | number
  children?: TreeData[]
  [k: string]: any
}

export interface TreeNodeData extends TreeData {
  // checkbox选中
  checked?: boolean
  // 半选
  indeterminate?: boolean
  // 点击选中
  selected?: boolean
  // 展开
  expand?: boolean
  // 收起
  close?: boolean
  // 娃儿们
  children?: TreeNodeData[]
  // 老父亲
  parent?: TreeNodeData | null;
  // 顶层的标识符
  isRoot?: boolean
}

export type TreeStatusKey = 'checked' | 'selected' | 'expand' | 'close'

// Symbol key in stage3. todo
// export type TreeNodeWeakMap = WeakMap<Symbol, TreeNodeData>
// Use Map now
export type TreeDataMap = Map<TreeNodeData['key'], TreeNodeData>

export interface TreeConfig {
  key: string | number
  label: string
  value: string
  children: string
}

export declare type TreeProps = {
  data?: TreeData | TreeData[]
  config?: TreeConfig
  defaultExpandAll?: boolean
  checkable?: boolean
  checkedKeys?: Array<string | number>
  checkStrictly?: boolean
}

export declare type TreeEvents = {
  // onInput?: (e: HTMLElementEvent<HTMLInputElement>) => void
  // onFocus?: (e: FocusEvent) => void
  // onBlur?: (e: FocusEvent) => void
}


// MTreeNodeProps
export declare type TreeNodeProps = {
  data?: TreeNodeData[];
  config?: TreeConfig;
  checkable?: boolean;
  getNodesByKeys: (keys: TreeNodeData['key'][]) => TreeNodeData[];
  handleExpand: (node: TreeNodeData, e: MouseEvent ) => void;
  handleCheck: (node: TreeNodeData, check: boolean) => void;
  handleItemClick: (node: TreeNodeData, e: MouseEvent) => void;
}
