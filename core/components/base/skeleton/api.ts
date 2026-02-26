/**
 * @description skeleton api
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { SkeletonProps } from './props';

export const props: MCOPO<SkeletonProps> = {
  loading: { type: Boolean, default: true },
  rows: { type: Number, default: 3 },
  animated: { type: Boolean, default: true },
  avatar: { type: Boolean, default: false },
  title: { type: Boolean, default: true },
};
