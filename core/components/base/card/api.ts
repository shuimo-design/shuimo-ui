/**
 * @description card api
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { CardProps } from './props';

export const props: MCOPO<CardProps> = {
  title: { type: String, default: undefined },
  shadow: { type: String as MPropType<'always' | 'hover' | 'never'>, default: 'never' },
  bodyStyle: { type: Object, default: undefined },
};
