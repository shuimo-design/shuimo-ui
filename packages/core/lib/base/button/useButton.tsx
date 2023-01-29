/**
 * @description
 * @author 阿怪
 * @date 2022/12/12 14:51
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ButtonProps } from './index';
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import style from './button.pcss';


export const buttonProps: MCOPO<ButtonProps> = {
  text: { type: String, default: '' },
  link: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'default', enum: ['default', 'primary', 'error', 'confirm', 'warning'] }
};

export function useButton() {


  const template: MNodeTemplate = <button class="m-button">
    <slot/>
  </button>;

  const initProps = (_props: ButtonProps) => {
    if (!template.props) {return;}
    template.initProps!(buttonProps, _props, ['text']);
    if (_props.link) {
      template.type = 'a';
    } else {
      template.type = 'button';
    }
    template.props.class = `m-button m-button-${_props.type ?? 'default'}`; // todo use classList
  };

  return {
    options: { template, props: buttonProps, style },
    initProps
  };
}
