/**
 * @description badge api type
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * @name m-badge
 * @docDescription Badge component with shuimo-ui style.
 *                 水墨组件的徽标组件。
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type BadgeProps = {
  /**
   * @description 显示的值
   * @type string | number
   */
  value?: string | number;
  /**
   * @description 最大值，超出时显示 max+
   * @type number
   * @default 99
   */
  max?: number;
  /**
   * @description 是否显示小圆点
   * @type boolean
   * @default false
   */
  isDot?: boolean;
  /**
   * @description 是否隐藏
   * @type boolean
   * @default false
   */
  hidden?: boolean;
  /**
   * @description 类型，控制颜色
   * @type 'primary' | 'success' | 'warning' | 'error' | 'info'
   * @default 'error'
   */
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info';
};
