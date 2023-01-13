/**
 * @description input-number api type
 * @author 阿怪
 * @date 2022/4/17 00:49
 * @version v1.0.0
 *
 * @name m-input-number
 * @docDescription InputNumber component with shuimo-ui style.
 *                 水墨组件的数字输入框组件。
 * @docUrl https://shuimo.janghood.com/input#number
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type InputNumberProps = {
  /**
   * @description input-number modelValue
   * @type number | string
   * @default ''
   */
  modelValue: number | string,
  /**
   * @description input-number max
   * @type number
   * @default Infinity
   */
  max?: number,
  /**
   * @description input-number min
   * @type number
   * @default -Infinity
   */
  min?: number,
  /**
   * @description input-number precision
   * @type number
   * @default 0
   */
  precision?: number,
  /**
   * @description input-number min
   * @type boolean
   * @default false
   */
  disabled?: boolean,
  /**
   * @description input-number placeholder
   * @type string
   * @default ''
   */
  placeholder?: string
};
