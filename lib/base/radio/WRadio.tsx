/*
 * @Author: 望海潮
 * @Date: 2022-03-23 18:24:55
 * @LastEditTime: 2022-03-24 00:32:35
 * @Description: radio单选框
 */

import { defineComponent } from "vue";

export default defineComponent({
  name: 'WRadio',
  props: {
    modelValue: { type: String, default: '' },
    label: { type: String, default: '' }
  },
  setup(props, { slots, emit }) {
    // 默认插槽内容
    const slotsDefault = slots.default?.();

    // 点击事件
    const handleClick = () => {
      emit('update:modelValue', props.label);
    }

    return () => (
      <label class={'w-radio'}>
        <input type="radio"
               class={'w-radio--former'}
               onClick={handleClick}/>
        <div class={['w-radio--input', props.modelValue === props.label ? 'selected' : '']}></div>
        <span class={'w-radio--label'}>{slotsDefault}</span>
      </label>
    )
  }
})
