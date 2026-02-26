/**
 * @description timeline api
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { TimelineProps, TimelineItemProps } from './props';

export const timelineProps: MCOPO<TimelineProps> = {
  reverse: { type: Boolean, default: false },
};

export const timelineItemProps: MCOPO<TimelineItemProps> = {
  timestamp: { type: String, default: '' },
  hideTimestamp: { type: Boolean, default: false },
  placement: { type: String as MPropType<'top' | 'bottom'>, default: 'bottom' },
  type: { type: String as MPropType<'primary' | 'success' | 'warning' | 'error' | 'info'>, default: 'primary' },
  size: { type: String as MPropType<'normal' | 'large'>, default: 'normal' },
  icon: { type: String, default: '' },
  hollow: { type: Boolean, default: false },
};
