/**
 * @description
 * @author 阿怪
 * @date 2023/1/3 16:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { createMElement, MElement } from 'moelement';
import { type CheckboxProps, useCheckbox } from '@shuimo-design/core';
import { HTMLElementEvent } from 'moelement/types/template/template';
import { MInitProps } from 'moelement/types/template';

@createMElement({
  name: 'm-checkbox',
  hookFunc: useCheckbox
})
export default class MCheckBox extends MElement implements CheckboxProps {

  checked?: boolean | undefined;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  value?: string | number;
  modelValue?: boolean | undefined;

  constructor() {
    super();
  }

  initTemplate(props: MCheckBox, initProps: MInitProps<MCheckBox>) {
    super.initTemplate(props);
    initProps(props, {
      onClick: (e: HTMLElementEvent<HTMLInputElement>) => {
        this.checked = !this.checked;
      }
    });
  }

}
