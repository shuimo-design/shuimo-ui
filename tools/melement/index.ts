/**
 * @description m-element index
 * @author 阿怪
 * @date 2022/12/21 02:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import MElement from './lib/MElement';

import { createMElement } from './lib/core/createMElement';


@createMElement({
  name: 'w-button',
  template: {
    type: 'button',
    props: { class: 'm-button' },
    slots: ['default']
  },
  props: {
    type: { type: String, default: 'primary' }
  },
  style: ``
})
class MButton extends MElement {
  public type: string = 'default';

  constructor() {
    super();
    console.log(this.getAttribute('type'));
  }

  afterInit() {
    console.log('%c button after init', 'color:#861717');
  }

  afterMount() {
    console.log('%c button after mount', 'color:#E8B004');
  }

  beforeUpdate() {
    console.log('%c button before update', 'color:#4A9992');
  }

  afterUpdate() {
    console.log(this.getAttribute('type'));
  }

}


export {
  MElement,
  createMElement
};
