/**
 * @description input hook
 * @author 阿怪
 * @date 2023/1/1 00:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { InputEvents, InputProps } from './index';
import { useBorder } from '../../template/border/useBorder';
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import style from './input.pcss';
import useDefaultProps from '../../../composition/useDefaultProps';

export const inputProps: MCOPO<InputProps> = {
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  value: { type: [String, Number], default: '' },
  modelValue: { type: [String, Number], default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
};
const { options: { style: borderStyle } } = useBorder();

export function useInput() {

  const getTemplate = (options?: {
    props?: InputProps, events?: InputEvents
  }) => {
    const { props: _props, events: _events } = options ?? {};
    const props = useDefaultProps(inputProps, _props);
    const events = {
      onInput: _events?.onInput ?? undefined,
      onFocus: _events?.onFocus ?? undefined,
      onBlur: _events?.onBlur ?? undefined
    };
    const input: MNodeTemplate = <input {...props} {...events} class="m-input m-input-inner"/>;
    const textarea: MNodeTemplate = <textarea {...props} {...events} rows="10" class="m-input m-textarea-inner"/>;
    const { getTemplate: getBorderTemplate } = useBorder(
      [props.type === 'textarea' ? textarea : input]
    );
    return getBorderTemplate();
  };



  return {
    options: {
      props: {
        ...inputProps,
        class: 'm-input'
      },
      style: borderStyle + style
    },
    getTemplate
  };

}
