/**
 * @description
 * @author 阿怪
 * @date 2024/12/24 10:58
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { EmitsOptions, SlotsType } from '@vue/runtime-core';
import { ref } from 'vue';
import { getNewModelValue, initChecked } from '../../../compositions/input/useBooleanInput.ts';
import { CheckboxProps } from './props';


export default function useCheckbox<
  Props extends Required<CheckboxProps>,
  E extends EmitsOptions = {},
  EE extends string = string,
  S extends SlotsType = {}
  // >(props: Props, ctx: SetupContext<E, S>) {
>(props: Props, ctx: any) {
  const checkboxClass = ['m-checkbox', { 'm-disabled': props.disabled }];

  const checked = ref(initChecked(props));

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    console.log(props.disabled);
    if (props.disabled) {
      return;
    }
    console.log('not return');
    checked.value = !checked.value;
    const newVal = getNewModelValue(props, checked.value);
    ctx.emit('change', newVal);
    ctx.emit('update:modelValue', newVal);
  }

  return {
    checkboxClass,
    checked,
    onClick
  };
}
