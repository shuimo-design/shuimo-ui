/**
 * @description shuimo web component input
 * @author 阿怪
 * @date 2023/1/1 00:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { HTMLElementEvent, useInput } from '@shuimo-design/core';
import { InputProps } from '@shuimo-design/core/lib/base/input';
import { createMElement, MElement } from 'moelement';

const { template, props, initProps, style } = useInput();
@createMElement({
  name: 'm-input',
  template,
  props,
  style
})
export default class MInput extends MElement implements InputProps {
  public disabled: boolean = false;
  public value: string | number = '';
  public placeholder: string = '';
  public readonly: boolean = false;
  public type: string = 'text';


  constructor() {super();}

  initTemplate(props: MInput) {
    super.initTemplate(props);
    initProps(props, {
      onInput: (e: HTMLElementEvent<HTMLInputElement>) => {
        this.value = e.target.value;
      }
    });
  }

}
