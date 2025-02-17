/**
 * @description collapse hook
 * @author 阿怪
 * @date 2025/02/17 20:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineHook } from '../../../runtime/defineHook';
import { props } from './api';
import { CollapseProps } from './props';
import { ref, watch } from 'vue';

export const collapseOptions = {
  name: 'MCollapse',
  props,
  emits: ['update:modelValue', 'change']
};

export const useCollapse = defineHook((props: Required<CollapseProps>, ctx) => {
  const innerValue = ref(props.modelValue);

  watch(() => props.modelValue, (val) => {
    innerValue.value = val;
  });

  const toggle = () => {
    if (props.disabled) return;
    const newValue = !innerValue.value;
    innerValue.value = newValue;
    ctx.emit('update:modelValue', newValue);
    ctx.emit('change', newValue);
  };

  const renderInit = () => {
    const collapseClass = [
      'm-collapse',
      {
        'm-collapse-disabled': props.disabled,
        'm-collapse-arrow-expanded': innerValue.value
      }
    ]

    const context = props.renderContext ? (
      <div class={['m-collapse-content', { 'm-collapse-content-hidden': !innerValue.value }]}>
        {ctx.slots.content?.()}
      </div>
    ) : innerValue.value ? (
      <div class="m-collapse-content">
        {ctx.slots.content?.()}
      </div>
    ) : null;

    return {
      collapseClass,
      context,
    }
  }

  return {
    toggle,
    renderInit
  };
}, collapseOptions);
