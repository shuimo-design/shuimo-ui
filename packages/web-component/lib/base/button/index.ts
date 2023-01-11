/**
 * @description button component
 * @author 阿怪
 * @date 2022/12/10 14:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useButton, type ButtonProps } from '@shuimo-design/core';
import { createMElement, MElement } from 'moelement';

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

  beforeRender() {
    this.template!.props!.class = `m-button m-button-${this.type ?? 'default'}`;
  }
}
