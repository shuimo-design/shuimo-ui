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

export const inputProps: MCOPO<InputProps> = {
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  value: { type: [String, Number], default: '' },
  modelValue: { type: [String, Number], default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
};

export function useInput() {

  const template: MNodeTemplate = <input class="m-input-inner"/>;

  const {
    options: {
      template: borderTemplate, style: borderStyle
    }
  } = useBorder({ input: template });


  const initProps = (_props: InputProps, _events: InputEvents) => {
    if (!template.props) {return;}
    template.initProps!(inputProps, _props);
    if (_props.type === 'textarea') {
      template.type = 'textarea';
      template.props.class = 'm-textarea-inner';
      template.props.rows = 10;
    } else {
      template.type = 'input';
      template.props.class = 'm-input-inner';
      delete template.props.rows;
    }


    template.props.onInput = _events.onInput;
    if (_events.onFocus) {
      template.props.onFocus = _events.onFocus;
    }
    if (_events.onBlur) {
      template.props.onBlur = _events.onBlur;
    }
  };

  return {
    options: {
      template: borderTemplate, props: {
        ...inputProps,
        class: 'm-input'
      }, style: borderStyle + style
    },
    initProps
  };

}
