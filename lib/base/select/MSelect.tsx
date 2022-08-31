/**
 * @description 选择框组件
 * @author 阿怪
 * @date 2021/8/27 11:05 上午
 * @version v1.1.2
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 修复moduleValue不更新问题、keyParam默认值改为title 阿怪
 * v1.0.2 keyParam默认值改为value，新增titleParam
 * v1.0.3 修复之前两个版本错误的参数流转问题
 * v1.1.0 代码结构改为使用ts，新增输入框筛选功能
 * v1.1.1 添加slot功能
 * v1.1.2 输入模式添加点击查询功能
 * v2.0.0 重构
 * v2.0.1 添加focus冒泡、dialog添加防抖和仅在option大于0的时候显示判断
 */
import { defineComponent, h, ref, watch } from 'vue';
import MInput from "../input/MInput";
import { props } from "./api";
import MPopover from "../../message/popover/MPopover";
import useDialog from "../../message/dialog/useDialog";
import { everyNotEmpty } from "../../dependents/_utils/tools";
import useDebounceFn from "../../dependents/_composables/useDebounceFn";


export default defineComponent({
  name: 'MSelect',
  props,
  emits: ['update:modelValue', 'input', 'select', 'focus'],
  setup(props, { emit, slots }) {

    const { visible, closeDialog, showDialog, toggleDialog } = useDialog();
    type OptionType = any;

    const inputValue = ref<OptionType>('');

    const getInfoWithKey = (option: OptionType, key: 'optionParam' | 'valueParam' | 'inputParam') => {
      if (!props[key]) {
        return option;
      }
      return option[props[key]];
    }

    const getInputValue = (option: OptionType) => getInfoWithKey(option, 'inputParam');

    const getModelValue = (option: OptionType) => getInfoWithKey(option, 'valueParam');

    const onClickOption = (option: OptionType) => {
      inputValue.value = getInputValue(option);
      emit('update:modelValue', getModelValue(option));
      emit('select', option);
      closeDialog();
    }

    const optionMatchValue = (option: OptionType) => {
      const value = getModelValue(option);
      if (props.toMatch) {
        return props.toMatch(value, props.modelValue);
      }

      return value === props.modelValue;
    }

    const showSelectDialog = () => {
      if (props.options.length > 0) {
        showDialog();
      }
    }

    const debounceShowSelectDialog = useDebounceFn(showSelectDialog, 200);

    const onFocus = (value: FocusEvent) => {
      if (props.inputReadonly) {
        return;
      }
      debounceShowSelectDialog();
      emit('focus', value, inputValue);
    }
    const onInput = (value: InputEvent) => {
      debounceShowSelectDialog();
      emit('input', value);
    }


    // 初始化数据
    const initInputValue = () => {
      const { modelValue, options } = props;
      if (everyNotEmpty(modelValue, options)) {
        const optionIndex = options!.findIndex(option => getModelValue(option) === modelValue);
        if (optionIndex > -1) {
          inputValue.value = getInputValue(options[optionIndex]);
        }
      }
    }
    initInputValue();


    watch(() => props.modelValue, () => {
      initInputValue();
    });

    return () => {

      const getOptionDisplayInfo = (option: OptionType) => {
        if (!slots.option) {
          return getInfoWithKey(option, 'optionParam');
        }
        return slots.option({ option });
      };

      const selectInput = h(MInput, {
        modelValue: inputValue.value,
        onClick: props.disabled ? undefined : toggleDialog,
        onInput,
        onFocus,
        placeholder: props.placeholder,
        disabled: props.disabled,
        readonly: props.inputReadonly
      });

      const options = props.options
        .map(option => h('div', {
          class: ['m-option', { 'm-option-selected': optionMatchValue(option) }],
          onClick: () => onClickOption(option)
        }, getOptionDisplayInfo(option)));

      return h(MPopover,
        {
          class: 'm-select',
          show: visible.value,
          'onUpdate:show': newValue => visible.value = newValue,
        },
        {
          default: () => selectInput,
          content: () => h('div', { class: 'm-select-options' }, options)
        });
    }
  },
})
