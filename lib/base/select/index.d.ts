/**
 * @description select api type
 * @author 阿怪
 * @date 2022/4/16 21:10
 * @version v1.0.1
 *
 * @name m-select
 * @docDescription Select component with shuimo-ui style.
 *                 水墨组件的选择组件。
 * @docUrl https://shuimo.janghood.com/select
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 新增多选和filter配置 Jimmy
 */

export declare type SelectProps = {
  /**
   * @description select value
   *              选择框的值
   * @type any | any[]
   * @default ''
   */
  modelValue?: any | any[],
  /**
   * @description select options
   *              选择框的数组
   * @type any[]
   * @default []
   */
  options?: Array<any>,
  /**
   * @description support for which key value to display in 'input'
   *              选择后使用option中的哪个key的值去更新modelValue
   * @type string
   * @default undefined
   */
  inputParam?: string,
  /**
   * @description select dropdown display info key
   *              选择下拉框中显示内容的key
   * @type string
   * @default undefined
   */
  optionParam?: string,
  /**
   * @description modelValue's key
   *              参数的key
   * @type string
   * @default undefined
   */
  valueParam?: string,
  /**
   * @description used to disable input event
   *              用于禁止输入事件
   * @type boolean
   * @default true
   */
  readonly?: boolean,
  /**
   * @description used to disable select
   *              是否禁用
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
  /**
   * @description modelValue match function
   *              用于比较参数和modelValue是否相等的方法，常用于modelValue为对象的场景
   *              option: 列表数据
   *              value: modelValue
   * @type function
   * @default undefined
   */
  toMatch?: (option: any, value: any) => boolean,
  /**
   * @description multiple choice
   *              是否为多选
   * @type boolean
   * @default false
   */
  multiple?: boolean,
  /**
   * @description in multiple, whether to show checkbox
   *              多选模式下是否启用checkbox
   * @type boolean
   * @default true
   */
  checkbox?: boolean,
  /**
   * @description defined input box filter query method
   *              自定义输入框filter查询方法
   * @type function  (options:any, inputValue: string) =>boolean
   * @default undefined
   */
  filter?: (options: any, inputValue: string) => boolean
};
