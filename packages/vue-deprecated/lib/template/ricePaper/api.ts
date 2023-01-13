/**
 * @description rice paper api
 * @author 阿怪
 * @date 2022/7/15 00:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { RicePaperProps } from './index';

export const props: WCOPO<RicePaperProps> = {
  cold: { type: Boolean, default: true },
  mountain: { type: Boolean, default: true },
  crane: { type: Boolean, default: true }
};
