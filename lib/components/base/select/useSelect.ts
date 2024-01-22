/**
 * @description core select hook
 * @author 阿怪
 * @date 2023/05/11 17:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SelectProps } from './index';
import useSelectTools from './composition/useSelectTools';
import useSelectFetch from './useSelectFetch';
import { Options } from '../../../compositions/common/defineCore.ts';
import usePopover from '../../../compositions/common/usePopover.ts';
import { ref } from 'vue';


export type OptionType = any;

export function useSelect(options: Options<{
  props: SelectProps,
  value: {
    inputValue: string,
  }
}>) {
  const tools = useSelectTools(options.props);
  const { popoverOptions } = usePopover();
  const { props } = options;
  const inputValueRef = ref(options.value.inputValue);

  const fetchOptions = useSelectFetch({ props });


  const inputProps = {
    readonly: props.readonly,
    disabled: props.disabled,
    placeholder: props.placeholder
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
    ...fetchOptions,
    popoverOptions,
    inputProps,
    getOptions
  };

}
