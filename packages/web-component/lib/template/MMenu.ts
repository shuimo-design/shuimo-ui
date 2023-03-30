/**
 * @description shuimo menu web component
 * @author 阿怪
 * @date 2023/1/5 01:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { type MenuProps, useMenu } from '@shuimo-design/core';
import { createMElement, MElement } from '@shuimo-design/lit';

@createMElement({
  name: 'menu',
  hookFunc: useMenu
})
export default class MMenu extends MElement implements MenuProps {
  menu?: any[] = [];
  inline?: boolean = false;

}
