/**
 * @description select多选模式下hook
 * @author Jimmy
 * @date 2022/11/10 00:48
 * @version v1.0.0
 */
import { h, Slots, toRefs, withModifiers } from 'vue';
import Printer from '../../../other/printer/Printer';
import { SelectProps } from '../index';
import useSelectTools, { type IsSelectOption } from './useSelectTools';
import { notEmpty } from '../../../dependents/_utils/tools';
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
  type SelectOption = IsSelectOption<T>;

  const { modelValue } = toRefs(props);

  const { getModelValue, getInputValue, getInfoWithKey } = useSelectTools<T>(props);
  const modelValueIsEmpty = () => {
    return modelValue.value === undefined || modelValue.value === null;
  };
  const needWarn = !modelValueIsEmpty() && !Array.isArray(props.modelValue);
  if (needWarn) {
    Printer('水墨选择组件').error('multiple开启时必须传入数组！');
  }
  if (needWarn || modelValueIsEmpty()) {
    emit('update:modelValue', []);
  }

  const { visible, showDialog, toggleDialog } = useDialog();

  const optionMatchValue = (option: T) => {
    if (needWarn || modelValueIsEmpty()) {
      return false;
    }

    const value = getModelValue(option);
    return props.toMatch ?
      props.toMatch(value, props.modelValue) :
      props.modelValue.includes(getModelValue(option));
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
    toggleSelect(option, !option.isSelected);
    // 点击重置option
    inputValue.value = '';
  };

  const getMultipleModelValue = () => {
    const multipleModelValue = <T[]>[];
    selectOptions.value.map(item => {
      if (item.isSelected) {
        multipleModelValue.push(getModelValue(item.value));
      }
    });
    return multipleModelValue;
  };

  const {
    onFocus, onInput,
    selectOptions, inputValue, selectOptionsRender
  } = useSelect<T>(props, emit, slots, {
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
        return h('div', {
          class: 'm-select-option-wrapper'
        }, [
          props.checkbox ? checkBox(option) : undefined,
          getInfoWithKey(option.value, 'optionParam') as string
        ]);
      }
      return h(
        'div',
        { class: 'm-select-option-wrapper' },
        [
          props.checkbox ? checkBox(option) : undefined,
          h('div', null, slots.option({ option: option.value }))]
      );
    }
  });

  // 初始化数据
  const initInputValue = () => {

    if (Array.isArray(modelValue.value)) {
      const selectOptionsIsSelected = selectOptions.value.filter(o => o.isSelected);
      const modelValueLength = modelValue.value.length;
      const selectOptionsIsSelectedLength = selectOptionsIsSelected.length;

      if (modelValueLength > 0 && selectOptionsIsSelectedLength > 0 && modelValueLength === selectOptionsIsSelectedLength) {
        // 和selectOptions.value比较
        const compareRes = selectOptionsIsSelected
          .every((o, i) => modelValue.value[i] === getModelValue(o.value));
        if (compareRes) {
          return;
        }
      }
    }

    if (notEmpty(props.options)) {
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
    emit('update:modelValue', getMultipleModelValue());
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
                getInputValue(multipleValueItem.value),
                h(MDeleteIcon, {
                  onClick: withModifiers(
                    () => toggleSelect(multipleValueItem, false),
                    ['stop']
                  )
                })
              ])
          }) : undefined;
        }),
        props.readonly ?
          h('span', { class: 'm-select-multiple-placeholder' }, props.placeholder) :
          h('input', {
            class: 'm-select-multiple-input',
            value: inputValue.value,
            onInput,
            onFocus,
            placeholder: props.placeholder,
            disabled: props.disabled,
            readonly: props.readonly
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
