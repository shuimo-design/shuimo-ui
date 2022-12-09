/**
 * @description select基础hook
 * @author Jimmy
 * @date 2022/12/06 17:46
 * @version v1.0.0
 */
import { SelectProps } from '../index';
import useDebounceFn from '../../../dependents/_composables/useDebounceFn';
import { HTMLElementEvent } from '../../../dependents/_types';
import { isFunction } from '../../../dependents/_utils/tools';
import { h, ref, Ref, Slots, VNode } from 'vue';
import useSelectTools, { IsSelectOption } from './useSelectTools';


export default function useSelect<T>(
  props: Required<SelectProps>,
  emit: (event: ('update:modelValue' | 'input' | 'select' | 'focus'), ...args: any[]) => void,
  slots: Readonly<Slots>,
  handler: {
    emitFocus: (value: FocusEvent) => void,
    emitBlur?: (value: FocusEvent) => void,
    showDialog: () => void,
    input?: (value: HTMLElementEvent<HTMLInputElement>) => void,
    onClickOption: (option: IsSelectOption<T>) => void,
    getOptionDisplayInfo: (option: IsSelectOption<T>) => string | VNode[] | VNode
  }) {

  type SelectOption = IsSelectOption<T>;
  const { selectFilter } = useSelectTools<T>(props);

  const showSelectDialog = () => {
    if (props.options.length > 0) {
      handler.showDialog();
    }
  };

  const debounceShowSelectDialog = useDebounceFn(showSelectDialog, 200);

  const onFocus = (value: FocusEvent) => {
    if (props.readonly) {
      return;
    }
    debounceShowSelectDialog();
    handler.emitFocus(value);
  };

  const onBlur = (value: FocusEvent) => {
    if (!props.readonly && handler.emitBlur) {
      handler.emitBlur(value);
    }
  };

  const onInput = (value: HTMLElementEvent<HTMLInputElement>) => {
    debounceShowSelectDialog();
    if (handler.input) {
      handler.input(value);
    }
    emit('input', value);
  };


  /**
   * @description 选中数据的时候input上的model值
   */
  const inputValue = ref<string>('');
  /**
   * @description 所有的options数据
   *              将option和modelValue进行对比，添加`isSelected`标记来区别是否被选中
   */
  const selectOptions: Ref<SelectOption[]> = ref([]);

  const emptyRender = () => h(
    'div',
    { class: 'm-select-empty' },
    slots && slots.empty ? slots.empty() :
      h('span', { class: 'm-select-empty-span' }, '暂无数据...')
  );

  const renderOptions = () => props.readonly ?
    selectOptions.value :
    selectOptions.value.filter(option => isFunction(props.filter) ?
      props.filter(option.value, inputValue.value) : selectFilter(option, inputValue.value)
    );

  const selectOptionsRender = () => {
    const options = renderOptions();
    return h('div', { class: 'm-select-options' },
      options.length > 0 ?
        options.map(option => h('div', {
          class: ['m-option', { 'm-option-selected': option.isSelected }],
          onClick: () => handler.onClickOption(option)
        }, handler.getOptionDisplayInfo(option))) :
        emptyRender()
    );
  };

  return {
    onFocus, onInput, onBlur,
    selectOptions, inputValue, selectOptionsRender
  };
}
