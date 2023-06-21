/**
 * @description cell api
 * @author 阿怪
 * @date 2023/06/21 01:05
 * @version v1.0.0
 *
 * @name m-cell
 * @docDescription cell component with shuimo-ui style.
 * @docUrl https://shuimo.janghood.com/cell,
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type CellProps = {
  /**
   * @description cell rotate position
   *              单元格旋转位置
   * @default undefined
   * @type 'top-left'|'bottom-left'|'top-right'|'bottom-right'
   */
  rotatePosition?: CellRotatePosition;
  /**
   * @description cell rotate deg
   *             单元格旋转角度
   * @default undefined
   * @type number
   */
  deg?: number,
  /**
   * @description cell height
   *              单元格高度
   *              we should use height to calculate the border of cell...
   * @default 0
   * @type number
   */
  h?: number,
  /**
   * @description cell width
   *              单元格宽度
   *              we should use width to calculate the border of cell...
   * @default 0
   * @type number
   */
  w?: number
};

export type CellRotatePosition = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
