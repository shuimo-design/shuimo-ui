/**
 * @description MRadio
 * @author 望海潮
 * @date 2022-03-23 18:24:55
 * @description radio单选框
 */

import { defineComponent, ref } from 'vue';
import { props } from '@shuimo-design/core/lib/base/radio/api';
import { createRadioId, getNewModelValue, initChecked } from '@shuimo-design/core/lib/base/radio/useRadio';

export default defineComponent({
  name: 'MRadio',
  props,
  setup(props, { emit, slots }) {
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
  }
});
