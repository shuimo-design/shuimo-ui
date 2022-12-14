/**
 * @description select非多选模式下hook
 * @author Jimmy
 * @date 2022/12/06 17:46
 * @version v1.0.0
 *
 * todo 这里的逻辑是不合理的，不应该使用isSelected，后续需要修复
 */
import { SelectProps } from '../index';
import { computed, h, Slots, toRefs } from 'vue';
import useSelectTools, { type IsSelectOption } from './useSelectTools';
import { isEmpty, notEmpty } from '../../../dependents/_utils/tools';
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

  const { placeholder } = toRefs(props);

  const selectedValue = computed(() => selectOptions.value.find(el => el.isSelected));
  const displayPlaceholder = computed(() => selectedValue.value ?
    tools.getInputValue(selectedValue.value.value) : placeholder.value);

  const optionMatchValue = (option: T) => {
    const value = tools.getModelValue(option);
    if (props.toMatch) {
      return props.toMatch(value, props.modelValue);
    }
    return props.modelValue === tools.getModelValue(option);
  };

  const emitFocus = (value: FocusEvent) => {emit('focus', value, inputValue);};
  const emitBlur = () => {
    if (selectedValue.value && inputValue.value === tools.getInputValue(selectedValue.value.value)) {
      // 如果已经选择过 且输入内容和选择内容一致
      return;
    }
    if (isEmpty(inputValue.value)) {
      // 如果为空
      emit('update:modelValue', undefined);
      return;
    }

    // 查找是否存在能匹配的
    let foundOption: SelectOption | undefined;
    let selectedOptionIndex = -1;
    selectOptions.value.forEach((option, index) => {
      if (option.isSelected) {
        selectedOptionIndex = index;
      }

      if (tools.getInputValue(option.value) === inputValue.value) {
        foundOption = option;
        option.isSelected = true;
        return;
      }
      option.isSelected = false;
    });
    // 如果无法匹配
    if (!foundOption) {
      // 回退上轮结果
      if (selectedOptionIndex > -1) {
        const option = selectOptions.value[selectedOptionIndex];
        option.isSelected = true;
        inputValue.value = tools.getInputValue(option.value);
      } else {
        inputValue.value = '';
        emit('update:modelValue', undefined);
        return;
      }
    } else {
      emit('update:modelValue', foundOption.value);
    }


  };

  const { visible, closeDialog, toggleDialog, showDialog } = useDialog();

  const onClickOption = (option: SelectOption) => {
    selectOptions.value.forEach((item, i) => {
      selectOptions.value[i].isSelected = false;
    });
    option.isSelected = true;
    closeDialog();
    inputValue.value = tools.getInputValue(option.value);
    emit('update:modelValue', tools.getModelValue(option.value));
    emit('select', option.value);
  };


  const {
    onFocus, onInput, onBlur,
    selectOptions, inputValue, selectOptionsRender
  } = useSelect<T>(props, emit, slots, {
    emitFocus,
    emitBlur,
    showDialog,
    input(inputEvent: HTMLElementEvent<HTMLInputElement>) {
      inputValue.value = inputEvent.target.value;
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
    if (selectedValue.value && props.modelValue === selectedValue.value.value) {
      return false;
    }


    if (notEmpty(props.options)) {
      selectOptions.value = props.options.map(item => {
        return {
          value: item,
          isSelected: optionMatchValue(item)
        };
      });
    }
    const baseOptionsFilter = selectOptions.value.filter(el => el.isSelected);
    inputValue.value = baseOptionsFilter.length ? tools.getInputValue(baseOptionsFilter[0].value) : '';
  };


  const selectInputRender = () => h(MInput, {
    modelValue: inputValue.value,
    onClick: props.disabled ? undefined : toggleDialog,
    onBlur,
    onInput,
    onFocus,
    placeholder: String(displayPlaceholder.value), // todo 优化这个交互
    disabled: props.disabled,
    readonly: props.readonly
  });

  return {
    visible,
    selectInputRender,
    selectOptionsRender,
    initInputValue
  };
}
