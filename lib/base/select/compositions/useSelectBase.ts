/**
 * @description select非多选模式下hook
 * @author 阿怪
 * @date 2022/11/10 00:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SelectProps } from "../index";
import { ref, Slots } from "vue";
import useSelectTools from "./useSelectTools";
import { everyNotEmpty } from "../../../dependents/_utils/tools";


export default function useSelectBase<T>(props: Required<SelectProps>,
                                         emit: (event: ("update:modelValue" | "input" | "select" | "focus"), ...args: any[]) => void,
                                         slots: Readonly<Slots>,
                                         handler: {
                                           closeDialog: () => void
                                         }) {
  const tools = useSelectTools<T>(props);

  const inputValue = ref<string>('');

  /**
   * 输入框的事件
   * @param value
   *
   * 复选框添加输入的话逻辑可能会不同，所以先放在这
   */
  const emitFocus = (value: FocusEvent) => {
    emit('focus', value, inputValue);
  }

  const optionMatchValue = (option: T) => {
    const value = tools.getModelValue(option);
    if (props.toMatch) {
      return props.toMatch(value, props.modelValue);
    }

    return value === props.modelValue;
  }

  const onClickOption = (option: T) => {
    handler.closeDialog();
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
    inputValue.value = '';
  }

  const getOptionDisplayInfo = (option: T) => {
    if (!slots.option) {
      return tools.getInfoWithKey(option, 'optionParam') as string; // 其实并不知道用户给的这个参数是不是string
    }
    return slots.option({ option });
  };

  return {
    tools,
    inputValue,
    emitFocus,
    optionMatchValue,
    initInputValue,
    onClickOption,
    getOptionDisplayInfo
  }
}
