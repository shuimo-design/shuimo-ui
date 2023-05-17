/**
 * @description core select hook
 * @author 阿怪
 * @date 2023/05/11 17:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { flip, offset, shift } from '@floating-ui/dom';
import { SelectProps } from './index';
import { PopoverProps } from '../../message/popover';
import useSelectTools from './composition/useSelectTools';
import { MRef, MRefValue } from '../../../composition/common/MRef';


export type OptionType = any;

export function useSelect(config: {
  props: Required<SelectProps>,
  value: {
    inputValue: MRefValue<string>,
  }
}) {
  const tools = useSelectTools(config.props);
  const popoverOptions: PopoverProps = {
    placement: 'bottom-start',
    popper: {
      middleware: [offset({ crossAxis: 3 }), flip(), shift()]
    }
  };
  const { props } = config;
  const inputValueRef = MRef(config.value.inputValue);


  const inputProps = {
    readonly: props.readonly,
    disabled: props.disabled,
    placeholder: props.placeholder,
  };

  const isSelected = (o: OptionType) => {
    if (props.toMatch) {
      return props.toMatch(o, props.modelValue);
    }
    return props.modelValue === tools.getModelValue(o);
  };

  const getOptions = () => {
    return props.options.filter(o => {
      if (props.readonly) {return true;}
      if (props.filter) {
        return props.filter(o, inputValueRef.value);
      }
      return true;
    }).map(o => {
      return {
        value: o,
        isSelected: isSelected(o)
      };
    });
  };

  return {
    popoverOptions,
    inputProps,
    getOptions
  };

}
