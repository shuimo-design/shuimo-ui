/**
 * @description checkbox hook
 * @author 阿怪
 * @date 2023/1/3 16:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * todo 检查props
 */
import { CheckboxProps, CheckboxEvents } from './index';
import { HTMLElementEvent, MCOPO, MNodeTemplate } from '@shuimo-design/types';
import style from './checkbox.pcss';
import useDefaultProps from '../../../composition/useDefaultProps';

export const checkboxProps: MCOPO<CheckboxProps> = {
  checked: { type: Boolean, default: undefined },
  modelValue: { type: Boolean, default: undefined },
  defaultChecked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' },
  value: { type: String, default: '' }
};

const notEmptyStr = (str: string | undefined | null) => {
  // str.toString() is a magic code for web-component
  return !(str === undefined || str === null || str === '' || str.toString() === undefined);
};

export function useCheckbox() {

  const getTemplate = (options?: {
    props?: CheckboxProps,
    events?: CheckboxEvents
  }): MNodeTemplate => {
    const { props: _props, events: _events } = options ?? {};
    const props = useDefaultProps<CheckboxProps>(checkboxProps, _props);
    const events = _events ?? { onChange: undefined };


    const input: MNodeTemplate = <input type="checkbox" defaultChecked={props.checked}/>;
    const checkbox: MNodeTemplate = <div class="m-checkbox-checkbox"/>;
    const checkboxInner: MNodeTemplate = <div class="m-checkbox-checkbox-inner"/>;
    const labelSlot = <slot></slot>;
    const label = <label class="m-checkbox-slot">
      {notEmptyStr(props.label) ? <span>{props.label}</span> : labelSlot}
    </label>;

    const onClick = (e: HTMLElementEvent<HTMLInputElement>) => {
      onChange(e);
      e.target.dispatchEvent(new Event('change'));
    };

    const onChange = (e: HTMLElementEvent<HTMLInputElement>) => {
      events.onChange?.(e);
    };

    return <div class="m-checkbox"
                onClick={onClick}
                onChange={onChange}>
      {input}
      {checkbox}
      {props.checked ? checkboxInner : null}
      {label}
    </div>;

  };


  return {
    options: { props: checkboxProps, style },
    getTemplate
  };

}
