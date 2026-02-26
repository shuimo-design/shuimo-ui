/**
 * @description descriptions api
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { DescriptionsProps, DescriptionsItemProps } from './props';

export const descriptionsProps: MCOPO<DescriptionsProps> = {
  title: { type: String, default: '' },
  column: { type: Number, default: 3 },
  direction: { type: String as MPropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  border: { type: Boolean, default: false },
  size: { type: String as MPropType<'small' | 'medium' | 'large'>, default: 'medium' },
};

export const descriptionsItemProps: MCOPO<DescriptionsItemProps> = {
  label: { type: String, required: true },
  span: { type: Number, default: 1 },
};
