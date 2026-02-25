/**
 * @description tooltip 类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * @name m-tooltip
 * @docDescription Tooltip component.
 *                 文字提示组件。
 * @docUrl https://shuimo.design/tooltip
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type TooltipProps = {
  /**
   * @description 提示内容，简单文本可直接通过 prop 传入
   * @type string
   * @default ''
   */
  content?: string;
  /**
   * @description 弹出位置
   * @type 'top' | 'bottom' | 'left' | 'right'
   * @default 'top'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * @description 是否禁用
   * @type boolean
   * @default false
   */
  disabled?: boolean;
};
