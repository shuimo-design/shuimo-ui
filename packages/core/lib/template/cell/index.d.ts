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
   * @description cell height
   *              单元格高度
   *              we should use height to calculate the border of cell...
   * @default 0
   * @type number
   */
  h?: number;
  /**
   * @description cell width
   *              单元格宽度
   *              we should use width to calculate the border of cell...
   * @default 0
   * @type number
   */
  w?: number;
  /**
   * @description the point configuration of the cell, which can be an angle or a coordinate
   *              单元格的点配置，可以是角度也可以是坐标
   * @default undefined
   * @type number | string | undefined
   */
  points?: number | string | undefined;
  /**
   * @description A point configuration of the cell
   *             单元格的A点配置
   * @default undefined
   * @type CPoint | number | string | undefined
   */
  a?: CPoint | number | string | undefined;
  /**
   * @description B point configuration of the cell
   *             单元格的B点配置
   * @default undefined
   * @type CPoint | number | string | undefined
   */
  b?: CPoint | number | string | undefined;
  /**
   * @description C point configuration of the cell
   *             单元格的C点配置
   * @default undefined
   * @type CPoint | number | string | undefined
   */
  c?: CPoint | number | string | undefined;
  /**
   * @description D point configuration of the cell
   *             单元格的D点配置
   * @default undefined
   * @type CPoint | number | string | undefined
   */
  d?: CPoint | number | string | undefined;
  /**
   * @description maybe you want to inject some styles into the cell
   *             也许你想向单元格注入一些样式
   * @default {}
   * @type Record<string, string|number>
   */
  style?: Record<string, string | number> | undefined;
};

