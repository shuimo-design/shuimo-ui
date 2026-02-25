/**
 * @description form 组件类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

/**
 * Form 组件 Props 类型
 */
export declare type FormProps = {
  /**
   * @description form 是否行内显示
   * @type boolean
   * @default false
   */
  inline?: boolean;
  /**
   * @description form 是否允许默认提交行为
   * @type boolean
   * @default false
   */
  submit?: boolean;
};

/**
 * FormItem 组件 Props 类型
 */
export declare type FormItemProps = {
  /**
   * @description 表单项标题
   * @type string
   * @default ''
   */
  label?: string;
  /**
   * @description 表单内置 label 的原生 for/prop 属性
   * @type string
   * @default ''
   */
  prop?: string;
};
