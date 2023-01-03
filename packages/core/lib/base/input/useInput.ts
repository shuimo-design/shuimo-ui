/**
 * @description input hook
 * @author 阿怪
 * @date 2023/1/1 00:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '../../../types';
import { MCOPO } from '../../../types/template/props';
import { InputEvents, InputProps } from './index';
import useBorder from '../../template/border/useBorder';
import style from './input.pcss?inline';

export default function useInput() {


  const template: MNodeTemplate = {
    type: 'input',
    props: { class: 'm-input' }
  };

  const { template: borderTemplate, style: borderStyle } = useBorder({ input: template });

  const props: MCOPO<InputProps> = {
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  };

  const initProps = (_props: InputProps, _events: InputEvents) => {
    if (!template.props) {return;}
    Object.keys(props).forEach(key => {
      if (_props.hasOwnProperty(key) &&
        _props[key as keyof InputProps] !== undefined &&
        _props[key as keyof InputProps] !== null) {
        template.props![key] = _props[key as keyof InputProps]!;
      }
    });

    template.props.onInput = _events.onInput;
  };

  return { template: borderTemplate, props, initProps, style: borderStyle + style };

}
