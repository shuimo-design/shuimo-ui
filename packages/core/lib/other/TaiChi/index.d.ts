/**
 * @description TaiChi api type
 * @author 阿怪
 * @date 2023/2/1 00:10
 * @version v1.0.0
 *
 * @name m-tai-chi
 * @docDescription TaiChi component with shuimo-ui style.
 *                 For switching between day and night mode.
 *                 水墨组件的太极组件。
 *                 用于切换日夜间模式。
 * @docUrl https://shuimo.janghood.com/tai-chi
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type TaiChiProps = {
  /**
   * @description switch value. 开关绑定值
   * @type boolean
   * @vue
   */
  modelValue: boolean,
  /**
   * @description switch value. 开关绑定值
   * @type boolean
   * @web
   */
  value: boolean
}

export declare type TaiChiEvents = {
  onClick: (e: MouseEvent) => void
}
