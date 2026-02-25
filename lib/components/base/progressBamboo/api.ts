/**
 * @description progress api
 * @author 阿怪
 * @date 2023/4/23 01:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { MCOPO } from '../../types/props';
import { ProgressProps } from './index';

export const props: MCOPO<ProgressProps> = {
  width: { type: Number, default: 399 },
  height: { type: Number, default: 26.547 },
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  showInfo: { type: Boolean, default: false },
  infoWidth: { type: Number, default: 44 },
  leafHeight: { type: Number, default: 28 },
};
