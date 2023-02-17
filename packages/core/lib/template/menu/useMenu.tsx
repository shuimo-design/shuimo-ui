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
import useDefaultProps from '../../../composition/useDefaultProps';

export const menuProps: MCOPO<MenuProps> = {
  menu: { type: Array, default: [] },
  inline: { type: Boolean, default: false }
};

export function useMenu() {

  const getTemplate = (options?: {
    props?: MenuProps
  }): MNodeTemplate => {
    const { props: _props } = options ?? {};
    const props = useDefaultProps(menuProps, _props);
    return <ul class={['m-menu', props.inline ? 'm-menu-inline' : undefined].join('')}>
      <slot/>
    </ul>;
  };

  return {
    options: { props: menuProps, style },
    getTemplate
  };

}
