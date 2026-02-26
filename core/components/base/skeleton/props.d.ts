/**
 * @description skeleton api type
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type SkeletonProps = {
  /**
   * @description 是否显示骨架屏（true=显示骨架，false=显示真实内容）
   * @type boolean
   * @default true
   */
  loading?: boolean,
  /**
   * @description 文本行数
   * @type number
   * @default 3
   */
  rows?: number,
  /**
   * @description 是否开启脉冲动画
   * @type boolean
   * @default true
   */
  animated?: boolean,
  /**
   * @description 是否显示头像占位圆
   * @type boolean
   * @default false
   */
  avatar?: boolean,
  /**
   * @description 是否显示标题占位条（较宽）
   * @type boolean
   * @default true
   */
  title?: boolean,
};
