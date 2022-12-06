/**
 * @description select非多选模式下hook
 * @author Jimmy
 * @date 2022/12/06 17:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SelectProps } from "../index";
import { ref, Slots, h, Ref } from "vue";
import useSelectTools from "./useSelectTools";
import { notEmpty, isFunction } from "../../../dependents/_utils/tools";
import useSelect from "./useSelect";
import useDialog from '../../../message/dialog/useDialog';
import MInput from "../../input/MInput";
import { IsSelectOption } from "../compositions/useSelectTools";
import { HTMLElementEvent } from "../../../dependents/_types";


export default function useSelectBase<T>(props: Required<SelectProps>,
                                         emit: (event: ("update:modelValue" | "input" | "select" | "focus"), ...args: any[]) => void,
                                         slots: Readonly<Slots>
) {

  type SelectOption = IsSelectOption<T>;

  const tools = useSelectTools<T>(props);
  /**
   * @desc 选中数据的时候input上的model值
  * @desc 此值用来筛选功能的值
  * @desc 区别`viewInputValue`是为了在遇到input值一致时，导致视图不更新的问题
  */
  const inputValue = ref<string>('');
  /**
   * @desc 视图上input应该显示的值
   * @desc 区别`inputValue`是为了在遇到input值一致时，导致视图不更新的问题
   */
  const viewInputValue = ref<string>('');
  /**
   * @desc 所有的options数据
   * @desc 将option和modelValue进行对比，添加`isSelected`标记来区别是否被选中
   */
  const selectOptions: Ref<SelectOption[]> = ref([]);

  const optionMatchValue = (option: T) => {
    const value = tools.getModelValue(option);
    if (props.toMatch) {
      return props.toMatch(value, props.modelValue);
    }
    return props.modelValue === tools.getModelValue(option);
  }

  const emitFocus = (value: FocusEvent) => {
    emit('focus', value, inputValue);
  }
  const emitBlur = () => {
    if (!viewInputValue.value) {
      emit('update:modelValue', null);
    }
    const filterValueArr = selectOptions.value.filter(el => el.isSelected);
    viewInputValue.value = filterValueArr.length ? tools.getInputValue(filterValueArr[0].value) : "";
    inputValue.value = "";
  }

  const { visible, closeDialog, toggleDialog, showDialog } = useDialog();

  const { onFocus, onInput, onBlur } = useSelect(props, emit, {
    emitFocus,
    emitBlur,
    showDialog,
    input(inputEvent: HTMLElementEvent<HTMLInputElement>) {
      inputValue.value = inputEvent.target.value;
      viewInputValue.value = inputEvent.target.value;
    },
  });

  const onClickOption = (option: SelectOption) => {
    selectOptions.value.forEach((item, i) => {
      selectOptions.value[i].isSelected = false;
    })
    option.isSelected = true;
    closeDialog();
    inputValue.value = "";
    viewInputValue.value = tools.getInputValue(option.value);
    emit('update:modelValue', tools.getModelValue(option.value));
    emit('select', option.value);
  }

  // 初始化数据
  const initInputValue = () => {
    if (notEmpty(props.options)) {
      selectOptions.value = props.options.map(item => {
        return {
          value: item,
          isSelected: optionMatchValue(item)
        }
      })
    }
    const baseOptionsFilter = selectOptions.value.filter(el => el.isSelected);
    viewInputValue.value = baseOptionsFilter.length ?
      tools.getInputValue(baseOptionsFilter[0].value) : '';
  }

  const getOptionDisplayInfo = (option: SelectOption) => {
    if (!slots.option) {
      return tools.getInfoWithKey(option.value, 'optionParam') as string; // 其实并不知道用户给的这个参数是不是string
    }
    return slots.option({ option: option.value });
  };

  const selectInputRender = () => h(MInput, {
    modelValue: viewInputValue.value,
    onClick: props.disabled ? undefined : toggleDialog,
    onBlur,
    onInput,
    onFocus,
    placeholder: props.placeholder,
    disabled: props.disabled,
    readonly: props.inputReadonly,
  });

  const renderOptions = () => selectOptions.value.filter(option =>
    isFunction(props.filter) ?
      props.filter(option.value, inputValue.value) : tools.selectFilter(option, inputValue.value)
  )

  const selectOptionsRender = () => h('div', { class: 'm-select-options' },
    renderOptions()
      .map(option => h('div', {
        class: ['m-option', { 'm-option-selected': option.isSelected }],
        onClick: () => onClickOption(option)
      }, getOptionDisplayInfo(option))));

  return {
    visible,
    selectInputRender,
    selectOptionsRender,
    initInputValue,
  }
}
