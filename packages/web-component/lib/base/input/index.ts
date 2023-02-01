/**
 * @description shuimo web component input
 * @author 阿怪
 * @date 2023/1/1 00:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { type InputProps, useInput } from '@shuimo-design/core';
import { createMElement, MElement } from 'moelement';
import { HTMLElementEvent } from 'moelement/types/template/template';
import { MInitProps } from 'moelement/types/template';

@createMElement({
  name: 'm-input',
  hookFunc: useInput
})
export default class MInput extends MElement implements InputProps {
  public disabled: boolean = false;
  public value: string | number = '';
  public placeholder: string = '';
  public readonly: boolean = false;
  public type: string = 'text';


  constructor() {super();}

  initTemplate(props: MInput, initProps: MInitProps<MInput>) {
    super.initTemplate(props);
    initProps(props, {
      onInput: (e: HTMLElementEvent<HTMLInputElement>) => {
        this.value = e.target.value;
      }
    });
  }

}
