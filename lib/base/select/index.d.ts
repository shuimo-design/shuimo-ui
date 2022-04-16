/**
 * @description select api type
 * @author 阿怪
 * @date 2022/4/16 21:10
 * @version v1.0.0
 *
 * @name w-select
 * @docDescription Select component with wash-painting-ui style.
 *                 水墨组件的选择组件。
 * @docUrl https://wash-painting.com/select
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type SelectProps = {
  /**
   * @description select value
   *              选择框的值
   * @type any
   * @default ''
   */
  modelValue?: any,
  /**
   * @description select options
   *              选择框的数组
   * @type any[]
   * @default []
   */
  options?: Array<any>,
  /**
   * @description support for which key value to update modelValue
   *              选择后使用option中的哪个key的值去更新modelValue
   * @type string
   * @default 'value'
   */
  keyParam?: string,
  /**
   * @description select dropdown display info key
   *              选择下拉框中显示内容的key
   * @type string
   * @default 'title'
   */
  titleParam?: string,
  /**
   * @description used to disable input event
   *              用于禁止输入事件
   * @type boolean
   * @default false
   */
  canChange?: boolean,
  /**
   * @description used to disable select
   *              是否禁用选择
   * @type boolean
   * @default false
   */
  disabled?: boolean,
  /**
   * @description input placeholder. 提示语
   * @type string
   * @default '请选择...'
   */
  placeholder?: string,
}
