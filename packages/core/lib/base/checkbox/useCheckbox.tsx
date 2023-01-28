/**
 * @description checkbox hook
 * @author 阿怪
 * @date 2023/1/3 16:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { CheckboxEvents, MNodeTemplate } from '../../../types';
import { CheckboxProps } from './index';
import { MCOPO } from '@shuimo-design/types';
import style from './checkbox.pcss';

export const checkboxProps: MCOPO<CheckboxProps> = {
  checked: { type: Boolean, default: undefined },
  modelValue: { type: Boolean, default: undefined },
  defaultChecked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' },
  value: { type: String, default: '' }
};

export function useCheckbox() {


  const input: MNodeTemplate = <input type="checkbox" m-name="input"/>;
  const checkbox: MNodeTemplate = <div class="m-checkbox-checkbox" m-name="checkbox"/>;
  const checkboxInner: MNodeTemplate = <div class="m-checkbox-checkbox-inner" m-if="false" m-name="checkboxInner"/>;
  const labelSlot = <slot></slot>;
  const label = <label class="m-checkbox-slot" m-name="label">
    {labelSlot}
  </label>;

  const template: MNodeTemplate = <div class="m-checkbox">
    {input}
    {checkbox}
    {checkboxInner}
    {label}
  </div>;


  const initProps = (_props: CheckboxProps, _events: CheckboxEvents) => {
    if (!template.props) {return;}

    if (input.props) {
      if (_props.checked !== null && _props.checked !== undefined) {
        input.props.checked = _props.checked;
        checkboxInner.if = _props.checked;
      }
      if (_props.label !== null && _props.label !== undefined && _props.label !== '') {
        label.slots.delete('default');
        label.children = { span: <span>{_props.label}</span> };
      } else {
        label.slots.set('default', labelSlot);
        label.children = {};
      }
    }
    template.props.onClick = _events.onClick;
  };

  return {
    options: { template, props: checkboxProps, style },
    initProps
  };

}
