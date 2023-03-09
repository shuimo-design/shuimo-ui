/**
 * @description shuimo menu-item core hook
 * @author 阿怪
 * @date 2023/1/5 01:23
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { liProps, useLi } from '../../base/list/li/useLi';
import { MNodeSlot, MNodeTemplate } from '@shuimo-design/types';
import { MenuItemProps } from './index';
import useDefaultProps from '../../../composition/useDefaultProps';

const style = await import('./menuItem.pcss');

export function useMenuItem() {

  const li = useLi();


  // todo undone
  // const initProps = (_props: MenuItemProps & HTMLElement) => {
  //   if (!template.props) {return;}
  //   const slots = template.slots as Map<string, MNodeSlot> | undefined;
  //   if (slots) {
  //     slots.get('sub')!.if = _props.active ?? false;
  //     slots.get('default')!.props = {
  //       onClick: () => {
  //         _props.active = !_props.active;
  //         _props.dispatchEvent(new CustomEvent('toggled-active', { detail: _props.active }));
  //       }
  //     };
  //   }
  //   template.props.class = ['m-menu-item m-li', _props.active ? 'm-active' : undefined].join(' ');
  // };


  const getTemplate = (
    options?: { props?: MenuItemProps }
  ) => {
    const { props: _props } = options ?? {};
    const props = useDefaultProps(liProps, _props);
    return <li class="m-menu-item m-li">
      <slot name="default"/>
      <slot name="sub"/>
    </li>;
  };

  return {
    options: {
      props: li.options.props,
      style: [li.options.style, style]
    },
    getTemplate
  };

}
