/**
 * @description button api type
 * @author 阿怪
 * @date 2022/4/2 12:58 AM
 * @version v1.0.0
 *
 * @name m-button
 * @docDescription Button component with shuimo-ui style.
 *              水墨组件的按钮组件。
 * @docUrl https://shuimo.janghood.com/button
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export declare type ButtonProps = {
  /**
   * @description button inline text, will replace by slot
   *              按钮文本 会被slot覆盖
   * @type string
   * @default ''
   */
  text?: string,
  /**
   * @description link or not 是否是链接
   * @type boolean
   * @default false
   */
  link?: boolean,
  /**
   * @description disable or not 是否禁用
   * @type boolean
   * @default false
   */
  disabled?: boolean,
  /**
   * @description button type 按钮类型
   * @type string
   * @default default
   * @enum default|primary|error|confirm|warning
   */
  type?: string
};

export declare type ButtonEvents = {
  onClick?: (e: MouseEvent) => void
};
