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


  beforeUpdate() {


    // if (!shadow) {return;}
    // shadow.children[0].classList.remove('m-button-default');
    // shadow.children[0].classList.remove('m-button-confirm');
    // shadow.children[0].classList.remove('m-button-error');
    // shadow.children[0].classList.add(`m-button-${this.type ?? 'default'}`);
    //
    // if (this.disabled) {
    //   shadow?.children[0].classList.add('m-button-disabled');
    // } else {
    //   shadow?.children[0].classList.remove('m-button-disabled');
    // }
  }

  beforeMount() {
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
    }else{
      delete templateProps.disabled;
    }

    templateProps.class = [...new Set(templateProps.class)];
    this.VNode.template!.props = templateProps;
  }
}
