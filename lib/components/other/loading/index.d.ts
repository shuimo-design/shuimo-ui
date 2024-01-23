/**
 * @description loading api type
 * @author 阿怪
 * @date 2022/8/25 11:07
 * @version v1.0.0
 *
 * @name m-loading
 * @docDescription loading component with shuimo-ui style.
 *                 水墨组件的加载组件。
 * @docUrl https://shuimo.design/loading
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { RefValue } from '@shuimo-design/types';

export declare type LoadingProps = {
  /**
   * @description transform speed
   * @type number
   * @default 1500
   */
  speed?: number,
  /**
   * @description logo size
   * @type number
   * @default 1
   */
  size?: number,
  /**
   * @description with mask or not
   * @type boolean
   * @default false
   */
  mask?: boolean,
  /**
   * @description length of loading item's side (px)
   * @type number | string
   * @default 50
   */
  sideLength?: number | string
};

export declare type LoadingRef = {
  /**
   * @description loading instance
   */
  loadingRef: RefValue,
  shua0Ref: RefValue,
  shua1Ref: RefValue,
  shua2Ref: RefValue,
  shua3Ref: RefValue,
  shua4Ref: RefValue,
  shua5Ref: RefValue,
  shua6Ref: RefValue,
  shua7Ref: RefValue,
};
