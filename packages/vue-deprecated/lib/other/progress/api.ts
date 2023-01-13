/**
 * @description progress api
 * @author 阿怪
 * @date 2022/4/17 01:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { ProgressProps } from './index';

export const props: WCOPO<ProgressProps> = {
  width: { type: Number, default: 399 },
  height: { type: Number, default: 26.547 },
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  showInfo: { type: Boolean, default: false },
  infoWidth: { type: Number, default: 44 },
  leafHeight: { type: Number, default: 28 }
};
