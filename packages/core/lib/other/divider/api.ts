/**
 * @description divider api
 * @author 阿怪
 * @date 2023/4/23 11:55
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { DividerProps } from './index';


export const props: MCOPO<DividerProps> = {
  vertical: { type: Boolean, default: false }
};
