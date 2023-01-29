/**
 * @description shuimo menu core hook
 * @author 阿怪
 * @date 2023/1/4 10:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MenuProps } from './index';
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import style from './menu.pcss';

export const menuProps: MCOPO<MenuProps> = {
  menu: { type: Array, default: [] },
  inline: { type: Boolean, default: false }
};

export function useMenu() {

  const template: MNodeTemplate = {
    type: 'ul',
    props: { class: 'm-menu' },
    slots: ['default']
  };

  const initProps = (_props: MenuProps) => {
    if (!template.props) {return;}
    template.props.class = _props.inline ? 'm-menu m-menu-inline' : 'm-menu';
  };

  return {
    options: { template, props: menuProps, style },
    initProps
  };

}
