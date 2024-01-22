/**
 * @description checkbox api type
 * @author youus
 * @date 2022/4/7 00:02
 * @version v1.0.0
 *
 * @name m-checkbox
 * @docDescription Checkbox component with shuimo-ui style.
 *                 水墨组件的复选框组件。
 * @docUrl https://shuimo.design/checkbox
 *
 * Hello, humor
 */
import { HTMLElementEvent } from '../../types/template';

export declare type CheckboxProps = {
  /**
   * @description checkbox label text, will replace slot
   *              文本 会覆盖slot
   * @type string
   * @default ''
   */
  label?: string,
  /**
   * @description checkbox checked
   *              是否选中
   * @default undefined
   */
  checked?: boolean | undefined | null,
  /**
   * @description checkbox value
   * @default undefined
   */
  value?: any,
  /**
   * @description value
   *              绑定值
   * @type any
   * @default ''
   */
  modelValue?: any,
  /**
   * @description checkbox indeterminate
   *              是否为不确定状态  todo 暂未支持
   * @default undefined
   */
  indeterminate?: boolean,
  /**
   * @description checkbox disabled
   *              是否禁用 todo 暂未支持
   * @type boolean
   * @default false
   */
  disabled?: boolean
}


export declare type CheckboxEvents = {
  onChange?: (e: HTMLElementEvent<HTMLInputElement>) => void,
  onInput?: (value: any) => void
}

export declare type CheckboxGroupProps = {
  /**
   * @description checkbox value group
   * @type array
   * @default []
   */
  value?: any[],
  /**
   * @description type
   * @type string
   * @default single
   * @enum 'single' | 'multiple'
   */
  type?: 'single' | 'multiple'
}
