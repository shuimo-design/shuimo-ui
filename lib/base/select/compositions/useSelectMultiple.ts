/**
 * @description select多选模式下hook
 * @author 阿怪
 * @date 2022/11/10 00:48
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref, Slots, VNode } from "vue";
import Printer from "../../../other/printer/Printer";
import { SelectProps } from "../index";
import useSelectTools from "./useSelectTools";
import { deepClone, everyNotEmpty, isEmpty } from "../../../dependents/_utils/tools";


export default function useSelectMultiple<T>(props: Required<SelectProps>,
                                             emit: (event: ("update:modelValue" | "input" | "select" | "focus"), ...args: any[]) => void,
                                             slots: Readonly<Slots>) {

  const tools = useSelectTools<T>(props);

  const inputValue = ref<string>(''); // todo 二阶段可能不用string类型
  const splitChar = ','; // 同上，暂时先用下这个

  if (!Array.isArray(props.modelValue)) {
    Printer('【MSelect】').error('multiple开启时必须传入数组！');
  }

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

  // 初始化数据
  const initInputValue = () => {
    const { modelValue, options } = props;
    if (everyNotEmpty(modelValue, options)) {
      const optionIndex = options!.findIndex(option => tools.getModelValue(option) === modelValue);
      if (optionIndex > -1) {
        inputValue.value = tools.getInputValue(options[optionIndex]);
      }
    }
  }


  const onClickOption = (option: T) => {
    // todo 处理checkbox逻辑（选中及取消选中），以及重复选择的问题（同一个）

    let modelValueArr = deepClone(props.modelValue) as Array<T>;
    const inputValueArr: string[] = isEmpty(inputValue.value) ? [] : inputValue.value.split(splitChar);
    const selectArr: T[] = props.options?.filter(o => inputValueArr.includes(tools.getInputValue(o)));

    // 新增一个条目
    inputValueArr.push(tools.getInputValue(option));
    inputValue.value = inputValueArr.join(splitChar);
    modelValueArr.push(tools.getModelValue(option));
    selectArr.push(option)

    emit('update:modelValue', modelValueArr);
    emit('select', selectArr);
  }


  // 多选checkbox
  const checkbox = (option: T) => {
    // todo ...
  }

  const getOptionDisplayInfo = (option: T) => {
    if (!slots.option) {
      return tools.getInfoWithKey(option, 'optionParam') as string;
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
