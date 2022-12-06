/**
 * @description select多选模式下hook
 * @author Jimmy
 * @date 2022/11/10 00:48
 * @version v1.0.0
 */
import { Slots, h, withModifiers, ref, Ref } from 'vue';
import Printer from '../../../other/printer/Printer';
import { SelectProps } from '../index';
import useSelectTools from './useSelectTools';
import { everyNotEmpty, isFunction } from '../../../dependents/_utils/tools';
import MDeleteIcon from '../../../other/icons/deleteIcon/MDeleteIcon';
import MTag from '../../tag/MTag';
import MBorder from '../../../other/border/MBorder';
import MCheckbox from '../../checkbox/MCheckbox';
import useSelect from './useSelect';
import useDialog from '../../../message/dialog/useDialog';
import { IsSelectOption } from '../compositions/useSelectTools';
import { HTMLElementEvent } from '../../../dependents/_types';

export default function useSelectMultiple<T>(
  props: Required<SelectProps>,
  emit: (event: ('update:modelValue' | 'input' | 'select' | 'focus'), ...args: any[]) => void,
  slots: Readonly<Slots>
) {
  type SelectOption = IsSelectOption<T>

  const tools = useSelectTools<T>(props);
  /**
   * @desc 搜索数据
   */
  const inputValue = ref<string>('');
  /**
   * @desc 所有的options数据
   * @desc 将option和modelValue进行对比，添加`isSelected`标记来区别是否被选中
   */
  const selectOptions: Ref<SelectOption[]> = ref([]);

  if (!Array.isArray(props.modelValue)) {
    Printer('【MSelect】').error('multiple为true,但props.modelValue不符合预期,应为数组[]');
  }

  const { visible, showDialog, toggleDialog } = useDialog();

  const optionMatchValue = (option: T) => {
    const value = tools.getModelValue(option);
    if (props.toMatch) {
      return props.toMatch(value, props.modelValue);
    }
    return props.modelValue.includes(tools.getModelValue(option));
  };

  const emitFocus = (value: FocusEvent) => {
    emit('focus', value, inputValue);
  };

  const { onFocus, onInput } = useSelect(props, emit, {
    emitFocus,
    showDialog,
    input(inputEvent: HTMLElementEvent<HTMLInputElement>) {
      inputValue.value = inputEvent.target.value;
    }
  });

  // 初始化数据
  const initInputValue = () => {
    if (!Array.isArray(props.modelValue)) return;
    if (everyNotEmpty(props.options)) {
      selectOptions.value = props.options.map(item => {
        return {
          value: item,
          isSelected: optionMatchValue(item)
        };
      });
    }
  };

  // 同步更新数据
  const updateModelValue = () => {
    const multipleModelValue = <T[]>[];
    selectOptions.value.map(item => {
      if (item.isSelected) {
        multipleModelValue.push(tools.getModelValue(item.value));
      }
    });
    emit('update:modelValue', multipleModelValue);
  };
  const addValue = (option: SelectOption) => {
    // 新增一个条目
    option.isSelected = true;
    updateModelValue();
    emit('select', option.value);
  };
  const removeValue = (option: SelectOption) => {
    // 删除一个条目
    option.isSelected = false;
    updateModelValue();
    emit('select', option.value);
  };

  // 触发列表选中 多选checkbox  处理checkbox逻辑（选中及取消选中）
  const onClickOption = (option: SelectOption) => {
    option.isSelected ? removeValue(option) : addValue(option);
    // 点击重置option
    inputValue.value = '';
  };

  const checkBox = (option: SelectOption) => {
    return h(
      MCheckbox,
      {
        onClick: withModifiers(() => onClickOption(option), ['stop', 'prevent']),
        modelValue: option.isSelected
      },
      {}
    );
  };

  // modelValue: inputValue.value,多一个配置选项是否使用checkBox?
  // 获取options-item
  const getOptionDisplayInfo = (option: SelectOption) => {
    if (!slots.option) {
      return [
        checkBox(option),
        tools.getInfoWithKey(option.value, 'optionParam') as string
      ];
    }
    return h('div', { class: 'm-select-option-wrapper' }, [
      checkBox(option),
      h('div', null, slots.option({ option: option.value }))
    ]);
  };

  const selectInputRender = () => h(MBorder, {
    class: 'm-border', onClick: props.disabled && visible ? undefined : toggleDialog
  }, {
    default: () =>
      h('div', { class: 'm-select-options-teleport' }, [
        selectOptions.value.map(multipleValueItem => {
          return multipleValueItem.isSelected ? h(MTag, null, {
            default: () =>
              h('div', { class: 'm-tag-del' }, [
                tools.getInputValue(multipleValueItem.value),
                h(MDeleteIcon, {
                  onClick: withModifiers(
                    () => removeValue(multipleValueItem),
                    ['stop']
                  )
                })
              ])
          }) : undefined;
        }),
        h('input', {
          class: 'select-input',
          value: inputValue.value,
          onInput,
          onFocus,
          placeholder: props.placeholder,
          disabled: props.disabled,
          readonly: props.inputReadonly
        })
      ])
  });

  const renderOptions = () => selectOptions.value.filter(option =>
    isFunction(props.filter) ?
      props.filter(option.value, inputValue.value) : tools.selectFilter(option, inputValue.value)
  );

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
    initInputValue
  };
}
