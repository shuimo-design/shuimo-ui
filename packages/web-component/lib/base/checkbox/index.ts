/**
 * @description
 * @author 阿怪
 * @date 2023/1/3 16:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { createMElement, MElement } from 'moelement';
import { useCheckbox, type CheckboxProps } from '@shuimo-design/core';

const { template, props, style, initProps } = useCheckbox();
@createMElement({
  name: 'm-checkbox',
  template,
  style,
  props
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

  initTemplate(props: MCheckBox) {
    super.initTemplate(props);
    initProps(props, {
      onClick: (e: MouseEvent) => {
        this.checked = !this.checked;
      }
    });
  }

}
