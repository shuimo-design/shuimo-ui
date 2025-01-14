/**
 * @description avatar api
 * @author 阿怪
 * @date 2023/05/08 22:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { AvatarProps } from './props';

export const props: MCOPO<AvatarProps> = {
  variant: { type: String as MPropType<'circle' | 'square'>, default: 'circle' },
  size: { type: String as MPropType<'large' | 'default' | 'small'>, default: 'default' },
  img: { type: String, default: '' },
};
