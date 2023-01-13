/**
 * @description shuimo menu-item web component
 * @author 阿怪
 * @date 2023/1/5 01:26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useMenuItem, type MenuItemProps } from '@shuimo-design/core';
import { createMElement, MElement } from 'moelement';

const { options, initProps } = useMenuItem();

@createMElement({
  name: 'm-menu-item',
  ...options
})
export default class MMenuItem extends MElement implements MenuItemProps {
  active?: boolean;

  constructor() {super();}

  initTemplate(t: MMenuItem) {
    super.initTemplate(t);
    initProps(t);
  }

}
