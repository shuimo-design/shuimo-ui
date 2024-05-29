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
   */
  modelValue?: boolean;
  /**
   * @description auto init mode. 自动初始化模式
   * @type boolean
   */
  autoMode?: boolean;
  /**
   * @description init handler. 初始化事件 return boolean need auto init or not
   * @type function
   */
  initHandler?: () => boolean;
  /**
   * @description is rotate. 是否旋转
   * @type boolean
   */
  isRotate?: boolean;
};

export declare type DarkModeEvents = {
  onClick?: (e: MouseEvent) => void
};
