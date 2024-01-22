/**
 * @description rice paper api
 * @author 阿怪
 * @date 2023/4/19 21:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { RicePaperProps } from './index';
import { MCOPO } from '../../types/props';


export const props :MCOPO<RicePaperProps>= {
  cold: { type: Boolean, default: true },
  mountain: { type: Boolean, default: true },
  crane: { type: Boolean, default: true }
}
