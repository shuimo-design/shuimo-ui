/**
 * @description select多选模式下hook
 * @author 阿怪
 * @date 2022/11/10 00:48
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
 import { Slots, h, withModifiers, ref, nextTick } from "vue";
import Printer from "../../../other/printer/Printer";
import { SelectProps } from "../index";
import useSelectTools from "./useSelectTools";
import { deepClone, everyNotEmpty } from "../../../dependents/_utils/tools";
import MDeleteIcon from "../../../other/icons/deleteIcon/MDeleteIcon";
import MTag from "../../tag/MTag";
import MBorder from "../../../other/border/MBorder";
import MCheckbox from "../../checkbox/MCheckbox";
import useSelect from "./useSelect";
import useDialog from "../../../message/dialog/useDialog";

export default function useSelectMultiple<T>(props: Required<SelectProps>,
                                             emit: (event: ("update:modelValue" | "input" | "select" | "focus"), ...args: any[]) => void,
                                             slots: Readonly<Slots>) {
                                              

  const tools = useSelectTools<T>(props);

  const inputValue = ref<string>('');
  const inputMultipeDom = ref<HTMLInputElement | null>(null)
  const propsOptions = ref<any[]>([])
  props.options.map(item => propsOptions.value.push(item))

  const { visible, showDialog, toggleDialog } = useDialog();

  // 检查是否被选中&&数据是否在modelValue内
  const isChecked = (v: any) => Array.isArray(props.modelValue) ? props.modelValue.includes(v) : undefined;
  let multipleModelValue: Array<T> = []

  if (!Array.isArray(props.modelValue)) {
    Printer('【MSelect】').error('multiple为true,但props.modelValue不符合预期,应为数组[]');
  }

  // 改变input大小
  nextTick(() => {
    tools.selectMultipeInput(inputMultipeDom, inputValue)
  })

  const emitFocus = (value: FocusEvent) => {
    emit('focus', value, inputValue);
  }

  const { onFocus, onInput } = useSelect(props, emit, {
    emitFocus,
    showDialog,
    input(inputEvent: InputEvent) {
      inputValue.value = (inputEvent.target as HTMLInputElement).value
      propsOptions.value = tools.selectFuzzyFilter(inputValue.value)
    },
  });  

  const optionMatchValue = (option: T) => {
    const value = tools.getModelValue(option);
    if (props.toMatch) {
      return props.toMatch(value, props.modelValue);
    }

    return isChecked(value)
  }

  // 初始化数据
  const initInputValue = () => {
    const { modelValue, options } = props;
    if (everyNotEmpty(modelValue, options)) {
      multipleModelValue = props.options.filter(item => {
        return isChecked(tools.getModelValue(item))
      })
    }
  };

    // 同步更新数据
    const addValue = (option: T) => {
      // 新增一个条目
      multipleModelValue.push(option)
      const modelValueArr = deepClone(props.modelValue) as Array<T>;
      typeof option === 'string' ? modelValueArr.push(option) : modelValueArr.push(tools.getModelValue(option));
      emit("update:modelValue", modelValueArr);
      emit("select", multipleModelValue);
    };
    const removeValue = (option: T) => {
      // 删除一个条目
      const modelValueArr = deepClone(props.modelValue) as Array<T>;
      multipleModelValue.splice(multipleModelValue.indexOf(option), 1);
      typeof option === 'string'
        ? modelValueArr.splice(modelValueArr.indexOf(option), 1)
        : modelValueArr.splice(modelValueArr.indexOf(tools.getModelValue(option)), 1);
      emit("update:modelValue", modelValueArr);
      emit("select", multipleModelValue);
    };

  // 触发列表选中 多选checkbox  处理checkbox逻辑（选中及取消选中）
  const onClickOption = (option: T) => {
    isChecked(tools.getModelValue(option)) || isChecked(option)
      ? removeValue(option)
      : addValue(option);
    // 点击重置option
    propsOptions.value = props.options
    inputValue.value = ''
  };

  const checkBox = (option: T) => {
    return h(
      MCheckbox,
      {
        onClick: withModifiers(
          () => onClickOption(option),
          ["stop", "prevent"]
        ),
        modelValue: isChecked(tools.getModelValue(option)),
      },
      {}
    );
  };

  // modelValue: inputValue.value,多一个配置选项是否使用checkBox?
  // 获取options-item
  const getOptionDisplayInfo = (option: T) => {
    if (!slots.option) {
      return [
        checkBox(option),
        tools.getInfoWithKey(option, "optionParam") as string,
      ];
    }
    return h("div", { class: "m-select-option-wrapper" }, [
      checkBox(option),
      h('div', null, slots.option({ option }))
    ]);
  };

  const selectInputRender = () => h(MBorder, {
    class: 'm-border', onClick: props.disabled && visible ? undefined : toggleDialog,
  }, {
    default: () =>
      h('div', { class: 'm-select-options-teleport', }, [
        multipleModelValue.map(tagOptons => {
          return h(MTag, null, {
            default: () =>
              h("div", { class: "m-tag-del" }, [
                tools.getInputValue(tagOptons),
                h(MDeleteIcon, {
                  onClick: withModifiers(
                    () => removeValue(tagOptons),
                    ["stop"]
                  ),
                }),
              ]),
          });
        }),
        h('input', {
          ref: inputMultipeDom,
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
    propsOptions,
    selectInputRender,
    optionMatchValue,
    initInputValue,
    onClickOption,
    getOptionDisplayInfo,
  }
}
