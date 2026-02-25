/**
 * @description headless radio
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref } from 'vue';
import { RadioCore } from '@shuimo-design/ui-core';
import { initChecked, getNewModelValue, createRadioId } from '@shuimo-design/ui-core/components/base/radio/useRadio.ts';
import { RadioProps } from '@shuimo-design/ui-core/components/base/radio/props';
import { notEmpty } from '@shuimo-design/ui-core/tools';
import './radio.css';

export default defineComponent((_props: RadioProps, { emit, slots }) => {
  const props = _props as Required<RadioProps>;
  const checked = ref(initChecked(props));
  const id = createRadioId();

  const onClick = () => {
    checked.value = !checked.value;
    emit('update:modelValue', getNewModelValue(props, checked.value));
  };

  return () => {
    const slotsDefault = slots.default ? slots.default() : (notEmpty(props.label) ? <span>{props.label}</span> : null);

    return <label class="m-radio" for={id}>
      <input type="radio" class="m-radio-input" id={id}
             name={props.name} checked={checked.value} value={props.value}
             onClick={onClick}/>
      {slotsDefault}
    </label>;
  };
}, {
  name: 'MRadio',
  props: RadioCore.props,
  emits: ['update:modelValue'],
});
