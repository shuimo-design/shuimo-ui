/**
 * @description tooltip 运行时 props
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { TooltipProps } from './props';
import { MCOPO, MPropType } from '../../types/props';

export const props: MCOPO<TooltipProps> = {
  content: { type: String, default: '' },
  placement: {
    type: String as MPropType<NonNullable<TooltipProps['placement']>>,
    default: 'top',
  },
  disabled: { type: Boolean, default: false },
};
