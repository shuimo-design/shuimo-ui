/**
 * @description form and form-item api
 * @author 阿怪
 * @date 2023/05/04 20:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { FormProps } from './form';
import { FormItemProps } from './formItem';

export const props: MCOPO<FormProps> = {
  inline: { type: Boolean, default: false },
  submit: { type: Boolean, default: false }
};

export const formItemProps: MCOPO<FormItemProps> = {
  label: { type: String, default: '' },
  prop: { type: String, default: '' }
};
