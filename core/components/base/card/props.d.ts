/**
 * @description card api type
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * @name m-card
 * @docDescription Card component with shuimo-ui style.
 *                 水墨组件的卡片组件。
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type CardProps = {
  /**
   * @description 卡片标题
   * @type string
   */
  title?: string;
  /**
   * @description 阴影显示时机
   * @type 'always' | 'hover' | 'never'
   * @default 'never'
   */
  shadow?: 'always' | 'hover' | 'never';
  /**
   * @description 卡片内容区自定义样式
   * @type Record<string, string>
   */
  bodyStyle?: Record<string, string>;
};
