/**
 * @description
 * @author 阿怪
 * @date 2025/1/21 11:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props } from './api.ts';
import { baseLineClass, lineType } from './lineType.ts';
import { borderOptions, useBorder } from './useBorder.ts';


export const BorderCore = {
  props,
  lineType,
  baseLineClass,
  useBorder,
  borderOptions
}
