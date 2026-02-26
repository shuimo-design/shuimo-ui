/**
 * @description space api type
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * @name m-space
 * @docDescription Space component with shuimo-ui style.
 *                 水墨组件的间距组件。
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type SpaceProps = {
  /**
   * @description 排列方向
   * @type 'horizontal' | 'vertical'
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description 间距大小，支持预设或数字（px）
   * @type 'small' | 'medium' | 'large' | number
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | number;
  /**
   * @description 是否自动换行（仅水平方向有效）
   * @type boolean
   * @default false
   */
  wrap?: boolean;
  /**
   * @description 交叉轴对齐方式
   * @type 'start' | 'center' | 'end' | 'baseline'
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end' | 'baseline';
};
