/**
 * @description tag api
 * @author 阿怪
 * @date 2023/4/23 11:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { TagProps } from './index';

export const props: MCOPO<TagProps> = {
  type: { type: String as MPropType<'default' | 'primary' | 'error' | 'confirm' | 'warning'>, default: 'default' },
  size: { type: String as MPropType<'small' | 'default' | 'large'>, default: 'default' },
};
