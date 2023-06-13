import { HTMLElementEvent } from "@shuimo-design/types";
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
  // 点击选中
  selected?: boolean
  // 展开
  expand?: boolean
  // 收起
  close?: boolean
  children?: TreeNodeData[]
  parent?: TreeNodeData
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
}

export declare type TreeEvents = {
  // onInput?: (e: HTMLElementEvent<HTMLInputElement>) => void
  // onFocus?: (e: FocusEvent) => void
  // onBlur?: (e: FocusEvent) => void
}
