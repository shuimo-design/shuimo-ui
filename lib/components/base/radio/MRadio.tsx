/**
 * @description MRadio
 * @author 望海潮
 * @date 2022-03-23 18:24:55
 * @description radio单选框
 */

import { defineComponent, ref } from 'vue';
import { createRadioId, getNewModelValue, initChecked } from './useRadio.ts';
import { props } from './api.ts';
import './radio.css';
import { RadioProps } from './index';

export default defineComponent((_props: RadioProps, { emit, slots }) => {
  const props = _props as Required<RadioProps>;
  const checked = ref(initChecked(props));
  const onClick = () => {
    checked.value = !checked.value;
    emit('update:modelValue', getNewModelValue(props, checked.value));
  };
  const id = createRadioId();

  return () => {
    const slotsDefault = slots.default ? slots.default() : props.label;

    return <label class="m-radio" for={id}>
      <input type="radio" class="m-radio-input" id={id}
             name={props.name} checked={checked.value} value={props.value}
             onClick={onClick}/>
      {slotsDefault}
    </label>;
  };
}, {
  name: 'MRadio',
  props,
});
