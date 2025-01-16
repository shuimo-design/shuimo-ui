/**
 * @description checkbox component core hook
 * @author 阿怪
 * @date 2024/12/24 10:58
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref, watch } from 'vue';
import { getNewModelValue, initChecked } from '../../../compositions/input/useBooleanInput.ts';
import { notEmpty } from '../../../tools';
import { defineHook } from '../../../runtime/defineHook.ts';
import { props } from './api.ts';


export const checkboxOptions = {
  name: 'MCheckbox',
  props,
  emits: ['change', 'update:modelValue'],
};

export default defineHook((props, ctx) => {

  const checked = ref(initChecked(props));

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (props.disabled) {
      return;
    }
    checked.value = !checked.value;
    const newVal = getNewModelValue(props, checked.value);
    ctx.emit('change', newVal);
    ctx.emit('update:modelValue', newVal);
  };

  const renderInit = () => {
    const checkboxClass = ['m-checkbox', { 'm-disabled': props.disabled }];

    const label = <label class="m-checkbox-slot">
      {notEmpty(props.label) ? <span>{props.label}</span> : ctx.slots.default?.()}
    </label>;

    const input =
      <input type="checkbox" checked={checked.value}
             disabled={props.disabled} indeterminate={props.indeterminate}/>;

    return {
      checkboxClass,
      input,
      label,
    };
  };

  watch(() => [
    props.modelValue,
    props.checked,
    props.value,
  ], () => {
    checked.value = initChecked(props);
  });



  return {
    checked,
    onClick,
    renderInit,
  };
}, checkboxOptions);
