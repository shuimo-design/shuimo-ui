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
import { createMElement } from '../../../m-element';
import MElement from '../../../m-element/lib/MElement';

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
    console.log(this.getAttribute('type'));
  }

  afterInit(){
    console.log('%c button after init','color:#861717');
  }

  afterMount() {
    console.log('%c button after mount','color:#E8B004');
  }

  beforeUpdate() {
    console.log('%c button before update','color:#4A9992');
  }

  afterUpdate() {
    console.log(this.getAttribute('type'));
  }


  beforeRender() {
    const template = this.VNode.template;
    if (!template) {return;}
    const { props: templateProps } = template;
    if (!templateProps) {return;}

    // todo 不太好处理下面的那个清除样式，所以先写死

    // if (typeof templateProps.class === 'string') {
    //   templateProps.class = [templateProps.class];
    // }

    templateProps.class = ['m-button'];

    templateProps.class.push('m-button-default');
    if (this.type) {
      templateProps.class.push(`m-button-${this.type}`);
    }

    if (this.disabled) {
      templateProps.disabled = this.disabled;
    } else {
      delete templateProps.disabled;
    }

    templateProps.class = [...new Set(templateProps.class)];
    this.VNode.template!.props = templateProps;
  }
}
