/**
 * @description 选择框组件
 * @author 阿怪
 * @date 2021/8/27 11:05 上午
 * @version v2.1.0
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
 * v2.0.2 修复inputValue在找不到时不更新数据的问题
 * v2.1.0 hook化并添加multiple属性【施工中版本】
 */
import { defineComponent, h, watch } from 'vue';
import MInput from "../input/MInput";
import MPopover from "../../message/popover/MPopover";
import useDialog from "../../message/dialog/useDialog";
import useSelectBase from "./compositions/useSelectBase";
import useSelect from "./compositions/useSelect";
import useSelectMultiple from "./compositions/useSelectMultiple";
import { props } from "./api";


export default defineComponent({
  name: 'MSelect',
  props,
  emits: ['update:modelValue', 'input', 'select', 'focus'],
  setup(props, { emit, slots }) {

    type OptionType = any;

    const { visible, closeDialog, showDialog, toggleDialog } = useDialog();

    const {
      inputValue,
      emitFocus,
      optionMatchValue,
      initInputValue,
      onClickOption,
      getOptionDisplayInfo
    } = props.multiple ?
      useSelectMultiple<OptionType>(props, emit, slots) :
      useSelectBase<OptionType>(props, emit, slots, { closeDialog });

    const {
      onFocus, onInput,
    } = useSelect<OptionType>(props, emit, { emitFocus, showDialog });


    initInputValue();


    watch(() => props.modelValue, () => {
      initInputValue();
    });

    return () => {

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
