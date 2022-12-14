/**
 * @description form api
 * @author 阿怪
 * @date 2022/4/5 9:42 AM
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { FormItemProps } from './formItem';
import { FormProps } from './form';

export const props: WCOPO<FormProps> = {
  inline: { type: Boolean, default: false },
  submit: { type: Boolean, default: false }
};

export const itemProps: WCOPO<FormItemProps> = {
  label: { type: String, default: '' },
  prop: { type: String, default: '' }
};
