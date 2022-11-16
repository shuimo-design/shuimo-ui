/**
 * @description radio api
 * @author 阿怪
 * @date 2022/4/16 21:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { RadioProps } from './index';

export const props: WCOPO<RadioProps> = {
  modelValue: { type: [String, Number], default: '' },
  label: { type: [String, Number], default: '' }
};
