/**
 * @description button component
 * @author 阿怪
 * @date 2022/12/10 14:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import ShuimoElement from '../../../module/elements/ShuimoElement';
import { customElement } from '../../../module';
import style from '@shuimo-design/core/lib/base/button/button.css?inline';
import { useButton } from '@shuimo-design/core';
import { ButtonProps } from '@shuimo-design/core/lib/base/button';

const { template, props } = useButton();
@customElement({
  name: 'm-button',
  style,
  template,
  props
})
export default class MButton extends ShuimoElement {

  constructor() {
    super();
  }

  render(dom?: HTMLElement) {
    if (!dom) return;
    dom.classList.add('m-button-default');
    dom.classList.add(`m-button-${this.type}`);

    if (this.disabled) {
      dom?.classList.add('m-button-disabled');
    }

    console.log('render over');
    return dom;
  }
}
