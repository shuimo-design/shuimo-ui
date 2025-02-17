/**
 * @description collapse api
 * @author 阿怪
 * @date 2025/02/17 20:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { MCOPO } from '../../types/props';
import { CollapseProps } from './props';

export const props: MCOPO<CollapseProps> = {
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  renderContext: { type: Boolean, default: false },
  line: { type: Boolean, default: true }
};
