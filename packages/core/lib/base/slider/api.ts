/**
 * @description
 * @author 阿怪
 * @date 2023/06/29 17:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { SliderProps } from './index';

export const props: MCOPO<SliderProps> = {
  value: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  showInfo: { type: Boolean, default: false }
};
