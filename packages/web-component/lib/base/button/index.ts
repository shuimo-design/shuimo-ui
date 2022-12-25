/**
 * @description button component
 * @author 阿怪
 * @date 2022/12/10 14:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useButton } from '@shuimo-design/core';
import { ButtonProps } from '@shuimo-design/core/lib/base/button';
import { createMElement, MElement } from 'melement';

const { template, props, style } = useButton();
@createMElement({
  name: 'm-button',
  style,
  template,
  props
})
export default class MButton extends MElement implements ButtonProps {

  public disabled: boolean = false;
  public link: boolean = false;
  public text: string | undefined;
  public type: string = 'default';


  constructor() {
    super();
  }

  afterInit(){
    // console.log('%c button after init','color:#861717');
  }

  afterMount() {
    // console.log('%c button after mount','color:#E8B004');
  }

  beforeUpdate() {
    // console.log('%c button before update','color:#4A9992');
  }

  afterUpdate() {
  }


  beforeRender() {
    this.VNode.options.template!.props!.class = `m-button m-button-${this.type??'default'}`;
  }
}
