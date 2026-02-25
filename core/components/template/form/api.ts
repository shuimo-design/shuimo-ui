/**
 * @description form 运行时 props
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { FormProps, FormItemProps } from './props';

export const formProps: MCOPO<FormProps> = {
  inline: { type: Boolean, default: false },
  submit: { type: Boolean, default: false },
};

export const formItemProps: MCOPO<FormItemProps> = {
  label: { type: String, default: '' },
  prop: { type: String, default: '' },
};
