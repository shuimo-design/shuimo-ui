/**
 * @description dark mode api type
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.1.0
 *
 * @name m-dark-mode
 * @docDescription Headless dark mode component.
 *                 无样式暗色模式组件，用于切换日夜间模式。
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type DarkModeProps = {
  /**
   * @description 开关绑定值（true = 暗色）
   * @type boolean
   * @default false
   */
  modelValue?: boolean;
  /**
   * @description 自动初始化模式，跟随系统媒体查询
   * @type boolean
   * @default false
   */
  autoMode?: boolean;
  /**
   * @description 初始化事件，返回 true 则执行自动初始化
   * @type function
   */
  initHandler?: () => boolean;
  /**
   * @description localStorage 持久化 key，传入则启用持久化
   * @type string
   */
  storageKey?: string;
};
