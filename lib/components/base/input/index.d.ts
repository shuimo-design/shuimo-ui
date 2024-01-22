/**
 * @description input api type
 * @author 阿怪
 * @date 2022/4/6 10:50 PM
 * @version v1.0.0
 *
 * @name m-input
 * @docDescription Input component with shuimo-ui style.
 *              水墨组件的输入组件。
 * @docUrl https://shuimo.design/input
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { HTMLElementEvent } from '../../types/template';

export declare type InputProps = {
  /**
   * @description input type. 输入框类型
   * @type string
   * @default input
   * @enum input|textarea
   */
  type?: string,
  /**
   * @description input placeholder. 提示语
   * @type string
   * @default ''
   */
  placeholder?: string,
  /**
   * @description input value. 输入框绑定值
   * @type string|number
   * @default ''
   */
  modelValue?: string | number,
  /**
   * @description input readonly. 是否只读
   * @type boolean
   * @default false
   */
  readonly?: boolean,
  /**
   * @description input disabled. 是否禁用
   * @type boolean
   * @default false
   */
  disabled?: boolean
  /**
   * @description input autofocus. 是否自动聚焦
   * @type boolean
   * @default false
   */
  autofocus?: boolean
}

export declare type InputEvents = {
  onInput?: (e: HTMLElementEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
}
