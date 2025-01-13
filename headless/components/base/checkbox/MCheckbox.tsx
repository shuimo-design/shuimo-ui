/**
 * @description headless checkbox
 * @author 阿怪
 * @date 2024/12/24 11:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { CheckboxCore } from '@shuimo-design/ui-core';
import useCheckbox from '@shuimo-design/ui-core/components/base/checkbox/useCheckbox.ts';
import { CheckboxProps } from '@shuimo-design/ui-core/components/base/checkbox/props';
import { notEmpty } from '@shuimo-design/ui-core/tools';


export default defineComponent((_props: CheckboxProps, { emit, slots }) => {
  const props = _props as Required<CheckboxProps>; // props in setup is Required
  const {
    checkboxClass,
    checked,
    onClick
  } = useCheckbox(props, { emit, slots });



  return () => {
    const label = <label class="m-checkbox-slot">
      {notEmpty(props.label) ? <span>{props.label}</span> : slots.default?.()}
    </label>;

    return <div class={checkboxClass} onClick={onClick}>
      <input type="checkbox" checked={checked.value} disabled={props.disabled}/>
      {label}
    </div>;
  };


}, {
  name: 'MCheckbox',
  props: CheckboxCore.props,
  emits: ['change', 'update:modelValue'],
});
