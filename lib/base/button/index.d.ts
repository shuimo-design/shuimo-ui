/**
 * @Description: button api type
 * @Author: 阿怪
 * @Date: 2022/4/2 12:58 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import type { ComponentPropsOptions, ComponentPublicInstance, VNode } from 'vue';

// 这玩意丢公共里去
export declare interface IComponentOption<T> {
  props: ComponentPropsOptions<T>;
  ctx: ComponentPublicInstance<T>;
}

export type ButtonProps = {
  /**
   * button inline text, will replace by slot
   * 按钮文本 会被slot覆盖
   * @type string ｜ VNode
   * @default ''
   * @public
   */
  text: string | VNode[],
  /**
   * disable or not 是否禁用
   * @type boolean
   * @default false
   * @public
   */
  disabled: boolean,
  /**
   * button type 按钮类型
   * @type string
   * @default 'primary'
   * @enum primary, gray
   * @public
   */
  type: string
}

export declare type OptionType = IComponentOption<ButtonProps>;
