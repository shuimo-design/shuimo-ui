<template>
  <label
      class="w-radio"
      :class="{
      'is-disabled': isDisabled,
      'is-focus': focus,
      'is-checked': model === label
    }"
      role="radio"
      :aria-checked="model === label"
      :aria-disabled="isDisabled"
      :tabindex="tabIndex"
      @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span
        class="w-radio__input"
        :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="w-radio__inner">
        <img src="/lib/assets/radio/border.png" alt="">
        <span class="w-radio__inner_checked"></span>
      </span>
      <input
          ref="radioRef"
          v-model="model"
          class="w-radio__original"
          :value="label"
          type="radio"
          aria-hidden="true"
          :name="name"
          :disabled="isDisabled"
          tabindex="-1"
          @focus="focus = true"
          @blur="focus = false"
          @change="handleChange"
          @click.stop="beforeClick(label)"
      >
    </span>
    <span class="w-radio__label" @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>
<script lang="ts">
import { computed, nextTick, ref } from "vue";
import { UPDATE_MODEL_EVENT } from "../dependents/_utils/constants";
import { useRadio, useRadioAttrs } from "./useRadio";

export default {
  name: 'WRadio',
  componentName: 'WRadio',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    label: {
      type: [String, Number, Boolean],
      default: '',
    },
    disabled: Boolean,
    name: {
      type: String,
      default: '',
    }
  },
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, ctx) {
    const {
      focus
    } = useRadio();
    const radioRef = ref<HTMLInputElement>();
    const model = computed<string | number | boolean>({
      get() {
        return props.modelValue
      },
      set(val) {
        ctx.emit(UPDATE_MODEL_EVENT, val)
        radioRef.value.checked = props.modelValue === props.label
      }
    });

    const {
      tabIndex,
      isDisabled
    } = useRadioAttrs(props, {
      model
    });

    const handleChange = () => {
      nextTick(() => {
        ctx.emit('change', model.value)
      });
    };

    const beforeClick = (val) => {
      ctx.emit('before', val);
    };

    return {
      focus,
      isDisabled,
      model,
      tabIndex,
      handleChange,
      radioRef,
      beforeClick
    }
  }
};
</script>
