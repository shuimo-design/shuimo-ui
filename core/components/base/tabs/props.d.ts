/**
 * @description tabs api type
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type TabItem = {
  /** 标签页显示文本 */
  label: string;
  /** 标签页唯一标识 */
  name: string | number;
  /** 是否禁用 */
  disabled?: boolean;
};

export declare type TabsProps = {
  /** 当前激活的标签页 name */
  modelValue: string | number;
  /** 标签页数据（与插槽 API 二选一） */
  items?: TabItem[];
  /** 标签页样式类型 */
  type?: 'line' | 'card';
};

export declare type TabsEvents = {
  onChange?: (name: string | number) => void;
};

export declare type TabPaneProps = {
  /** 标签页显示文本 */
  label: string;
  /** 标签页唯一标识，需与父组件 modelValue 对应 */
  name: string | number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否懒加载（首次激活才渲染内容） */
  lazy?: boolean;
};
