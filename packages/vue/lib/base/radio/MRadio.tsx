/**
 * @description MRadio
 * @author 望海潮
 * @date 2022-03-23 18:24:55
 * @description radio单选框
 */

import { defineComponent } from 'vue';
import { props } from './api';

export default defineComponent({
  name: 'MRadio',
  props,
  setup(props, { slots, emit }) {
    // 默认插槽内容
    const slotsDefault = slots.default?.();

    // 点击事件
    const handleClick = () => {
      emit('update:modelValue', props.label);
    };

    return () => (
      <label class={'m-radio'}>
        <input type="radio" class={'m-radio--former'} onClick={handleClick} />
        <div class={['m-radio--input', props.modelValue === props.label ? 'selected' : '']}></div>
        <span class={'m-radio--label'}>{slotsDefault}</span>
      </label>
    );
  }
});
