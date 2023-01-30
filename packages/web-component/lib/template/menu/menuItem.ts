/**
 * @description shuimo menu-item web component
 * @author 阿怪
 * @date 2023/1/5 01:26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { type MenuItemProps, useMenuItem } from '@shuimo-design/core';
import { createMElement, MElement } from 'moelement';
import { MInitProps } from 'moelement/types/template';


@createMElement({
  name: 'm-menu-item',
  hookFunc: useMenuItem
})
export default class MMenuItem extends MElement implements MenuItemProps {
  active?: boolean;

  constructor() {super();}

  initTemplate(props: MMenuItem, initProps: MInitProps<MMenuItem>) {
    super.initTemplate(props);
    initProps(props);
  }

}
