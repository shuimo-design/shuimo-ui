/**
 * @description input api
 * @author 阿怪
 * @date 2023/4/20 17:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { InputProps } from './index';


export const props: MCOPO<InputProps> = {
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  value: { type: [String, Number], default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
};
