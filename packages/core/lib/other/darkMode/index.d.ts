/**
 * @description dark mode api type
 * @author 阿怪
 * @date 2023/2/1 00:10
 * @version v1.0.0
 *
 * @name m-dark-mode
 * @docDescription dark mode component with shuimo-ui style.
 *                 For switching between day and night mode.
 *                 水墨组件的太极组件。
 *                 用于切换日夜间模式。
 * @docUrl https://shuimo.design/dark-mode
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type DarkModeProps = {
  /**
   * @description switch value. 开关绑定值
   * @type boolean
   * @vue
   */
  value?: boolean
}

export declare type DarkModeEvents = {
  onClick?: (e: MouseEvent) => void
}
