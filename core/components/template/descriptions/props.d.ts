/**
 * @description descriptions api type
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type DescriptionsProps = {
  /**
   * @description 标题文本
   * @type string
   */
  title?: string,
  /**
   * @description 每行列数
   * @type number
   * @default 3
   */
  column?: number,
  /**
   * @description 标签与值的布局方向
   * @type 'horizontal' | 'vertical'
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical',
  /**
   * @description 是否显示边框
   * @type boolean
   * @default false
   */
  border?: boolean,
  /**
   * @description 尺寸，影响内边距
   * @type 'small' | 'medium' | 'large'
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large',
};

export declare type DescriptionsItemProps = {
  /**
   * @description 标签文本
   * @type string
   */
  label: string,
  /**
   * @description 列跨度
   * @type number
   * @default 1
   */
  span?: number,
};
