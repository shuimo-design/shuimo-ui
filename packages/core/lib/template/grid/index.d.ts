/**
 * @description grid apis
 * @author 阿怪
 * @date 2023/06/22 00:38
 * @version v1.0.0
 *
 * @name m-grid
 * @docDescription grid component with shuimo-ui style.
 * @docUrl https://shuimo.design/grid,
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type GridProps = {
  /**
   * @description gird height
   *              网格高度
   * @default 0
   * @type number
   */
  h?: number;
  /**
   * @description cell width
   *              网格宽度
   * @default 0
   * @type number
   */
  w?: number;
  /**
   * @description cell gap
   *              网格的通用gap
   * @default 0
   * @type number|string
   */
  gap?: number | string,
  /**
   * @description cell column gap
   *              网格的列gap
   * @default 0
   * @type number|string
   */
  colGap?: number | string,
  /**
   * @description cell row gap
   *              网格的行gap
   * @default 0
   * @type number|string
   */
  rowGap?: number | string,
  /**
   * @description gap rotate list
   * @default []
   * @type number[]
   */
  gapRotate?: number[]
  /**
   * @description grid direction
   *             网格方向
   * @default 'row'
   * @type 'column'|'row'
   */
  direction?: 'column' | 'row'
};
