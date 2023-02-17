/**
 * @description checkbox api type
 * @author youus
 * @date 2022/4/7 00:02
 * @version v1.0.0
 *
 * @name m-checkbox
 * @docDescription Checkbox component with shuimo-ui style.
 *                 水墨组件的复选框组件。
 * @docUrl https://shuimo.janghood.com/checkbox
 *
 * Hello, humor
 */
import { HTMLElementEvent } from '@shuimo-design/types';

export declare type CheckboxProps = {
  /**
   * @description checkbox label text, will replace by slot
   *              按钮文本 会被slot覆盖
   * @type string
   * @default ''
   */
  label?: string,
  /**
   * @description checkbox value
   *              复选框值，优先级高于slot
   * @type string | number
   * @default ''
   */
  value?: string | number,
  /**
   * @description checkbox disabled
   *              是否禁用
   * @type boolean
   * @default false
   */
  disabled?: boolean,
  /**
   * @description checkbox checked
   *              是否选中
   * @default undefined
   */
  checked?: boolean | undefined | null,
  /**
   * @description checkbox default value
   *              checkbox默认值
   * @type boolean
   * @default false
   */
  defaultChecked?: boolean,
  /**
   * @description checkbox modelValue
   * @default undefined
   */
  modelValue?: boolean | undefined
}


export declare type CheckboxEvents = {
  onChange: (e: HTMLElementEvent<HTMLInputElement>) => void
}
