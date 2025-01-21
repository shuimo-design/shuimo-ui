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
   * @description global setting border or not and support object setting,
   *              priority lower than direct setting
   * @default true
   * @type boolean | string
   */
  border?: boolean | { top?: boolean, right?: boolean, bottom?: boolean, left?: boolean };
  /**
   * @description top line display or not
   * @default undefined
   * @type boolean | string | undefined
   */
  top?: boolean | string | undefined;
  /**
   * @description right line display or not
   * @default undefined
   * @type boolean | string | undefined
   */
  right?: boolean | string | undefined;
  /**
   * @description bottom line display or not
   * @default undefined
   * @type boolean | string | undefined
   */
  bottom?: boolean | string | undefined;
  /**
   * @description left line display or not
   * @default undefined
   * @type boolean | string | undefined
   */
  left?: boolean | string | undefined;
  /**
   * @description need mask or not
   * @default true
   * @type boolean
   */
  mask?: boolean;
  /**
   * @description instead main div with slot
   * @default false
   * @type boolean | string
   */
  insteadMain?: boolean | string;
};
