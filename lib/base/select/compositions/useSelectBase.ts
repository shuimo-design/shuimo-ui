/**
 * @description select非多选模式下hook
 * @author 阿怪
 * @date 2022/11/10 00:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SelectProps } from "../index";
import { ref, Slots ,h} from "vue";
import useSelectTools from "./useSelectTools";
import { everyNotEmpty } from "../../../dependents/_utils/tools";
import useSelect from "./useSelect";
import useDialog from '../../../message/dialog/useDialog';
import MInput from "../../input/MInput";


export default function useSelectBase<T>(props: Required<SelectProps>,
                                         emit: (event: ("update:modelValue" | "input" | "select" | "focus"), ...args: any[]) => void,
                                         slots: Readonly<Slots>
                                         ) {
                                          
  const tools = useSelectTools<T>(props);

  const inputValue = ref<string>('');

  const propsOptions = ref<any[]>([])
  props.options.map(item=>{
    propsOptions.value.push(item)
  })
  const emitFocus = (value: FocusEvent) => {
    emit('focus', value, inputValue);
  }
  const {visible,closeDialog,toggleDialog,showDialog} = useDialog();
  const { onFocus, onInput } = useSelect(props, emit, {
    emitFocus,
    showDialog,
    input(inputEvent:InputEvent) {
      inputValue.value = (inputEvent.target as HTMLInputElement).value
      // 当修改options的所有数据
      propsOptions.value = tools.selectFuzzyFilter(inputValue.value)
    },
  });

    // 检查是否被选中&&数据是否在modelValue内
  const isChecked = (v: any) => props.options.includes(v);

  const optionMatchValue = (option: T) => {
    const value = tools.getModelValue(option);
    if (props.toMatch) {
      return props.toMatch(value, props.modelValue);
    }

    return value
    ? props.modelValue===value
     :isChecked(props.modelValue)
  }

  const onClickOption = (option: T) => {
    closeDialog();
    inputValue.value = tools.getInputValue(option);
    emit('update:modelValue', tools.getModelValue(option));
    emit('select', option);
    return;
  }

  // 初始化数据
  const initInputValue = () => {
    const { modelValue, options } = props;
    if (everyNotEmpty(modelValue, options)) {
      const optionIndex = options!.findIndex(option => tools.getModelValue(option) === modelValue);
      if (optionIndex > -1) {
        inputValue.value = tools.getInputValue(options[optionIndex]);
        return;
      }
    }
    inputValue.value = props.modelValue;
  }

  const getOptionDisplayInfo = (option: T) => {
    if (!slots.option) {
      return tools.getInfoWithKey(option, 'optionParam') as string; // 其实并不知道用户给的这个参数是不是string
    }
    return slots.option({ option });
  };

  const selectInputRender =()=> h(MInput, {
    modelValue: inputValue.value,
    onClick: props.disabled ? undefined : toggleDialog,
    onInput,
    onFocus,
    placeholder: props.placeholder,
    disabled: props.disabled,
     readonly: props.inputReadonly,
  });

  return {
    visible,
    propsOptions,
    selectInputRender,
    emitFocus,
    optionMatchValue,
    initInputValue,
    onClickOption,
    getOptionDisplayInfo,
  }
}
