/**
 * @description shuimo menu web component
 * @author 阿怪
 * @date 2023/1/5 01:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { type MenuProps, useMenu } from '@shuimo-design/core';
import { createMElement, MElement } from 'moelement';
import { MInitProps } from 'moelement/types/template';


@createMElement({
  name: 'm-menu',
  hookFunc: useMenu
})
export default class MMenu extends MElement implements MenuProps {

  menu?: any[] = [];
  inline?: boolean = false;


  constructor() {
    super();
  }

  initTemplate(props: MMenu, initProps: MInitProps<MMenu>) {
    super.initTemplate(props);
    initProps(props);
  }

}
