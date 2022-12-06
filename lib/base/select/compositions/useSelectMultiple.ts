/**
 * @description select多选模式下hook
 * @author Jimmy
 * @date 2022/11/10 00:48
 * @version v1.0.0
 */
import { h, Slots, VNode, withModifiers } from 'vue';
import Printer from '../../../other/printer/Printer';
import { SelectProps } from '../index';
import useSelectTools, { type IsSelectOption } from './useSelectTools';
import { everyNotEmpty } from '../../../dependents/_utils/tools';
import MDeleteIcon from '../../../other/icons/deleteIcon/MDeleteIcon';
import MTag from '../../tag/MTag';
import MBorder from '../../../other/border/MBorder';
import MCheckbox from '../../checkbox/MCheckbox';
import useSelect from './useSelect';
import useDialog from '../../../message/dialog/useDialog';
import { HTMLElementEvent } from '../../../dependents/_types';

export default function useSelectMultiple<T>(
  props: Required<SelectProps>,
  emit: (event: ('update:modelValue' | 'input' | 'select' | 'focus'), ...args: any[]) => void,
  slots: Readonly<Slots>
) {
  type SelectOption = IsSelectOption<T>

  const tools = useSelectTools<T>(props);

  if (!Array.isArray(props.modelValue)) {
    Printer('水墨选择组件').error('multiple开启时必须传入数组！');
  }

  const { visible, showDialog, toggleDialog } = useDialog();

  const optionMatchValue = (option: T) => {
    const value = tools.getModelValue(option);
    return props.toMatch ?
      props.toMatch(value, props.modelValue) :
      props.modelValue.includes(tools.getModelValue(option));
  };

  const emitFocus = (value: FocusEvent) => {
    emit('focus', value, inputValue);
  };

  /**
   * 新增或删除一个条目
   * @param option 条目
   * @param isSelected true 新增 false 删除
   */
  const toggleSelect = (option: SelectOption, isSelected = true) => {
    option.isSelected = isSelected;
    updateModelValue();
    emit('select', option.value);
  };

  // 触发列表选中 多选checkbox  处理checkbox逻辑（选中及取消选中）
  const onClickOption = (option: SelectOption) => {
    option.isSelected ? toggleSelect(option, false) : toggleSelect(option);
    // 点击重置option
    inputValue.value = '';
  };


  const {
    onFocus, onInput,
    selectOptions, inputValue, selectOptionsRender
  } = useSelect<T>(props, emit, {
    emitFocus,
    showDialog,
    input(inputEvent: HTMLElementEvent<HTMLInputElement>) {
      inputValue.value = inputEvent.target.value;
    },
    onClickOption,
    getOptionDisplayInfo: option => {
      // modelValue: inputValue.value,多一个配置选项是否使用checkBox?
      // 获取options-item
      if (!slots.option) {
        return [
          checkBox(option),
          tools.getInfoWithKey(option.value, 'optionParam')
        ] as VNode[];
      }
      return h(
        'div',
        { class: 'm-select-option-wrapper' },
        [checkBox(option), h('div', null, slots.option({ option: option.value }))]
      );
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


  const checkBox = (option: SelectOption) => {
    return h(
      MCheckbox,
      {
        onClick: withModifiers(() => onClickOption(option), ['stop', 'prevent']),
        modelValue: option.isSelected
      }
    );
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
                    () => toggleSelect(multipleValueItem, false),
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


  return {
    visible,
    selectInputRender,
    selectOptionsRender,
    initInputValue
  };
}
