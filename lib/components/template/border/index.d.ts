/**
 * @description border api type
 * @author 阿怪
 * @date 2023/6/15 12:00
 * @version v1.0.0
 *
 * @name m-border
 * @docDescription Border component with shuimo-ui style
 *                 水墨组件的边框组件。
 * @docUrl https://shuimo.design/border
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type BorderProps = {
  /**
   * @description top line display or not
   * @default true
   * @type boolean | string
   */
  top?: boolean | string;
  /**
   * @description right line display or not
   * @default true
   * @type boolean | string
   */
  right?: boolean | string;
  /**
   * @description bottom line display or not
   * @default true
   * @type boolean | string
   */
  bottom?: boolean | string;
  /**
   * @description left line display or not
   * @default true
   * @type boolean | string
   */
  left?: boolean | string;
  /**
   * @description instead main div with slot
   * @default false
   * @type boolean | string
   */
  insteadMain?: boolean | string;
};
