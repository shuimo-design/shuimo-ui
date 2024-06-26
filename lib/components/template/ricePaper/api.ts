/**
 * @description rice paper api
 * @author 阿怪
 * @date 2023/4/19 21:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { RicePaperProps } from './index';
import { MCOPO, MPropType } from '../../types/props';

export const props: MCOPO<RicePaperProps> = {
  type: { type: String as MPropType<'cold' | 'warm' | 'default'>, default: 'default' },
  mountain: { type: [Boolean, String], default: true },
  layout: { type: String as MPropType<'auto' | 'full-screen'>, default: 'auto' },
  autoDarkMode: { type: [Boolean, String], default: true },
};
