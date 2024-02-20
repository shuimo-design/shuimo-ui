/**
 * @description button api
 * @author 阿怪
 * @date 2023/4/20 11:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { ButtonProps } from './index';

export const props: MCOPO<ButtonProps> = {
  text: { type: String, default: '' },
  link: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: {
    type: String as MPropType<'default' | 'primary' | 'error' | 'confirm' | 'warning'>,
    default: 'default',
    enum: ['default', 'primary', 'error', 'confirm', 'warning'],
  },
};
