/**
 * @description grid props 类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type GridProps = {
  /**
   * @description 网格高度
   * @type number
   */
  h?: number;
  /**
   * @description 网格宽度
   * @type number
   */
  w?: number;
  /**
   * @description 通用间距，同时作用于行列
   * @default 0
   * @type number | string
   */
  gap?: number | string;
  /**
   * @description 列间距，优先级高于 gap
   * @type number | string
   */
  colGap?: number | string;
  /**
   * @description 行间距，优先级高于 gap
   * @type number | string
   */
  rowGap?: number | string;
  /**
   * @description 子元素排列方向
   * @default 'row'
   * @type 'column' | 'row'
   */
  direction?: 'column' | 'row';
};
