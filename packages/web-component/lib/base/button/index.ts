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
import { useButton } from '@shuimo-design/core';
import { ButtonProps } from '@shuimo-design/core/lib/base/button';

const { template, props, style } = useButton();
@customElement({
  name: 'm-button',
  style,
  template,
  props
})
export default class MButton extends ShuimoElement implements ButtonProps {

  public disabled: boolean = false;
  public link: boolean = false;
  public text: string | undefined;
  public type: string = 'default';


  constructor() {
    super();
  }


  update(shadow?: ShadowRoot) {
    if (!shadow) {return;}
    shadow.children[0].classList.remove('m-button-default');
    shadow.children[0].classList.remove('m-button-confirm');
    shadow.children[0].classList.remove('m-button-error');
    shadow.children[0].classList.add(`m-button-${this.type ?? 'default'}`);

    if (this.disabled) {
      shadow?.children[0].classList.add('m-button-disabled');
    } else {
      shadow?.children[0].classList.remove('m-button-disabled');
    }
  }

  render(dom: HTMLElement): Node | undefined {

    if (!dom) return;
    dom.classList.add('m-button-default');
    dom.classList.add(`m-button-${this.type}`);


    if (this.disabled) {
      dom?.classList.add('m-button-disabled');
    }

    return dom;
  }
}
