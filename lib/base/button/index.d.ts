/**
 * @Description: button api type
 * @Author: 阿怪
 * @Date: 2022/4/2 12:58 AM
 * @Version v1.0.0
 *
 * @name w-button
 * @docDescription Button component with wash-painting-ui style.
 *              水墨组件的按钮组件。
 * @docUrl https://wash-painting.com/button
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import type { VNode } from 'vue';
import type { IComponentOption } from "../../dependents/_types";

export declare type ButtonProps = {
  /**
   * @description button inline text, will replace by slot
   *              按钮文本 会被slot覆盖
   * @type string | VNode
   * @default ''
   */
  text: string | VNode;
  /**
   * @description disable or not 是否禁用
   * @type boolean
   * @default false
   */
  disabled: boolean,
  /**
   * @description button type 按钮类型
   * @type string
   * @default primary
   * @enum primary|gray
   */
  type: string
};

export declare type OptionType = IComponentOption<ButtonProps>;
