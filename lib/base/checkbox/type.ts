type TNode<T = any> = (h: typeof import('vue').h, props?: T) => import('vue').VNodeChild;

export interface WCheckboxProps {
  /**
   * 主文案
   */
  label?: string | TNode;
  /**
   * 复选框的值
   */
  value?: string | number;
  /**
   * 是否禁用组件
   */
  disabled?: boolean;
  /**
   * 是否选中
   * @default false
   */
  checked?: boolean;
  /**
   * 值变化时触发
   */
  onChange?: (checked: boolean, context: { e: Event }) => void;
  /**
   * 默认是否选中，非受控属性
   * @default false
   */
  defaultChecked?: boolean;
}