/**
 * @description select非多选模式下hook
 * @author Jimmy
 * @date 2022/12/06 17:46
 * @version v1.0.0
 */
import { SelectProps } from '../index';
import { ref, Slots, h, Ref } from 'vue';
import useSelectTools, { type IsSelectOption } from './useSelectTools';
import { notEmpty, isFunction } from '../../../dependents/_utils/tools';
import useSelect from './useSelect';
import useDialog from '../../../message/dialog/useDialog';
import MInput from '../../input/MInput';
import { HTMLElementEvent } from '../../../dependents/_types';


export default function useSelectBase<T>(props: Required<SelectProps>,
                                         emit: (event: ('update:modelValue' | 'input' | 'select' | 'focus'), ...args: any[]) => void,
                                         slots: Readonly<Slots>
) {

  type SelectOption = IsSelectOption<T>;

  const tools = useSelectTools<T>(props);
  /**
   * @description 视图上input应该显示的值
   *              区别`inputValue`是为了在遇到input值一致时，导致视图不更新的问题
   */
  const viewInputValue = ref<string>('');

  const optionMatchValue = (option: T) => {
    const value = tools.getModelValue(option);
    if (props.toMatch) {
      return props.toMatch(value, props.modelValue);
    }
    return props.modelValue === tools.getModelValue(option);
  };

  const emitFocus = (value: FocusEvent) => {
    emit('focus', value, inputValue);
  };
  const emitBlur = () => {
    if (!viewInputValue.value) {
      emit('update:modelValue', null);
    }
    const filterValueArr = selectOptions.value.filter(el => el.isSelected);
    viewInputValue.value = filterValueArr.length ? tools.getInputValue(filterValueArr[0].value) : '';
    inputValue.value = '';
  };

  const { visible, closeDialog, toggleDialog, showDialog } = useDialog();

  const onClickOption = (option: SelectOption) => {
    selectOptions.value.forEach((item, i) => {
      selectOptions.value[i].isSelected = false;
    });
    option.isSelected = true;
    closeDialog();
    inputValue.value = '';
    viewInputValue.value = tools.getInputValue(option.value);
    emit('update:modelValue', tools.getModelValue(option.value));
    emit('select', option.value);
  };


  const {
    onFocus, onInput, onBlur,
    selectOptions, inputValue, selectOptionsRender
  } = useSelect<T>(props, emit, {
    emitFocus,
    emitBlur,
    showDialog,
    input(inputEvent: HTMLElementEvent<HTMLInputElement>) {
      inputValue.value = inputEvent.target.value;
      viewInputValue.value = inputEvent.target.value;
    },
    onClickOption,
    getOptionDisplayInfo: option => {
      if (!slots.option) {
        return tools.getInfoWithKey(option.value, 'optionParam') as string; // 其实并不知道用户给的这个参数是不是string
      }
      return slots.option({ option: option.value });
    }
  });


  // 初始化数据
  const initInputValue = () => {
    if (notEmpty(props.options)) {
      selectOptions.value = props.options.map(item => {
        return {
          value: item,
          isSelected: optionMatchValue(item)
        };
      });
    }
    const baseOptionsFilter = selectOptions.value.filter(el => el.isSelected);
    viewInputValue.value = baseOptionsFilter.length ?
      tools.getInputValue(baseOptionsFilter[0].value) : '';
  };


  const selectInputRender = () => h(MInput, {
    modelValue: viewInputValue.value,
    onClick: props.disabled ? undefined : toggleDialog,
    onBlur,
    onInput,
    onFocus,
    placeholder: props.placeholder,
    disabled: props.disabled,
    readonly: props.inputReadonly
  });

  return {
    visible,
    selectInputRender,
    selectOptionsRender,
    initInputValue
  };
}
