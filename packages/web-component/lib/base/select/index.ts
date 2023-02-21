/**
 * @description web-component version select
 * @author 阿怪
 * @date 2023/1/29 04:23
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useSelect, SelectProps } from '@shuimo-design/core';
import { createMElement, MElement } from '@shuimo-design/lit';
import { createRef, Ref } from 'lit/directives/ref.js';

@createMElement({
  name: 'm-select',
  hookFunc: useSelect
})
export default class MSelect extends MElement implements SelectProps {
  checkbox?: boolean;
  disabled?: boolean;
  inputParam?: string;
  modelValue: any;
  multiple?: boolean;
  optionParam?: string;
  options?: Array<any>;
  placeholder?: string;
  readonly?: boolean;
  valueParam?: string;

  filter(options: any, inputValue: string): boolean {
    return false;
  }

  toMatch(option: any, value: any): boolean {
    return false;
  }

  popoverRef: Ref<HTMLElement> = createRef();

  contentRef: Ref<HTMLElement> = createRef();


}
