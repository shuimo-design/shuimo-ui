/**
 * @description form core 导出
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { formProps, formItemProps } from './api';

/**
 * FormCore 使用包装对象导出，避免 formProps / formItemProps 两个 props 名称与其他组件冲突。
 * headless / lib 均通过解构 FormCore 取用。
 */
export const FormCore = {
  props: formProps,
  formItemProps,
};

export type { FormProps, FormItemProps } from './props';
