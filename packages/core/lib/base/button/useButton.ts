/**
 * @description
 * @author 阿怪
 * @date 2022/12/12 14:51
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ButtonProps } from './index';
import { MNodeTemplate } from '../../../types';
import { MCOPO } from '../../../types/template/props';
import style from './button.pcss';
export default function useButton() {


  const template: MNodeTemplate = {
    type: 'button',
    props: { class: 'm-button' },
    slots: ['default']
  };

  const props: MCOPO<ButtonProps> = {
    text: { type: String, default: '' },
    link: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'default', enum: ['default', 'primary', 'error', 'confirm', 'warning'] }
  };

  return {
    template,
    props,
    style
  };
}
