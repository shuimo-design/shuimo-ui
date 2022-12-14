/**
 * @description switch api type
 * @author 阿怪
 * @date 2022/8/16 23:13
 * @version v1.0.0
 *
 * @name m-switch
 * @docDescription Switch component with shuimo-ui style.
 *                  水墨组件的开关组件。
 *                  slot优先级高于text
 * @docUrl https://shuimo.janghood.com/switch
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type SwitchProps = {
  /**
   * @description switch value. 开关绑定值
   * @type any
   */
  modelValue: any,
  /**
   * @description switch disabled
   *              是否禁用
   * @default false
   */
  disabled?: boolean,
  /**
   * @description switch disabled
   *              是否加载中
   * @default false
   */
  loading?: boolean,
  /**
   * @description 打开文本
   * @type string
   */
  activeInfo?: string,
  /**
   * @description 关闭文本
   * @type string
   */
  inactiveInfo?: string,
  /**
   * @description 打开参数
   * @type string
   */
  activeValue?: any,
  /**
   * @description 关闭参数
   * @type string
   */
  inactiveValue?: any,
  /**
   * @description 是否控制
   * @type string
   * @default false
   */
  onControl?: boolean
}
