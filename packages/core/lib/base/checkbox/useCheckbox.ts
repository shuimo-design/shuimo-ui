/**
 * @description checkbox hook
 * @author 阿怪
 * @date 2023/1/3 16:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '../../../types';
import style from './checkbox.pcss';
import { MCOPO } from '../../../types/template/props';
import { CheckboxProps } from './index';


export default function useCheckbox() {

  const input: MNodeTemplate = { type: 'input', props: { type: 'checkbox' } };
  const checkbox: MNodeTemplate = { type: 'div', props: { class: 'm-checkbox-checkbox' } };
  const checkboxInner: MNodeTemplate = { type: 'div', props: { class: 'm-checkbox-checkbox-inner' }, if: false };

  const template: MNodeTemplate = {
    type: 'div',
    props: { class: 'm-checkbox' },
    children: {
      input,
      checkbox,
      checkboxInner,
      label: { type: 'div', props: { class: 'm-checkbox-slot' }, slots: ['default'] }
    }
  };

  const props: MCOPO<CheckboxProps> = {
    checked: { type: Boolean, default: undefined },
    defaultChecked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    label: { type: String, default: '' },
    value: { type: String, default: '' },
    modelValue: { type: Boolean, default: undefined }
  };

  const initProps = (_props: CheckboxProps, _events: any) => {
    if (!template.props) {return;}

    if (input.props) {
      if (_props.checked !== null && _props.checked !== undefined) {
        input.props.checked = _props.checked;
        checkboxInner.if = _props.checked;
      }
    }

    template.props.onClick = _events.onClick;
  };

  return { template, style, props, initProps };

}
