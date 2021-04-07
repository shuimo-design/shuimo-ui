<template>
  <label
      :id="id"
      class="w-checkbox"
      :class="[
      { 'is-disabled': isDisabled },
      { 'is-checked': isChecked }
    ]"
      :aria-controls="indeterminate ? controls : null"
  >
    <span
        class="w-checkbox__input"
        :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
        :tabindex="indeterminate ? 0 : false"
        :role="indeterminate ? 'checkbox' : false"
        :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="w-checkbox__inner">
        <img src="/lib/assets/checkbox/border.png" alt="">
        <span class="w-checkbox__inner_checked"></span>
      </span>
      <input
          v-if="trueLabel || falseLabel"
          v-model="model"
          :checked="isChecked"
          class="w-checkbox__original"
          type="checkbox"
          :aria-hidden="indeterminate ? 'true' : 'false'"
          :name="name"
          :disabled="isDisabled"
          :true-value="trueLabel"
          :false-value="falseLabel"
          @change="handleChange"
          @focus="focus = true"
          @blur="focus = false"
      >
      <input
          v-else
          v-model="model"
          class="w-checkbox__original"
          type="checkbox"
          :aria-hidden="indeterminate ? 'true' : 'false'"
          :disabled="isDisabled"
          :value="label"
          :name="name"
          @change="handleChange"
          @focus="focus = true"
          @blur="focus = false"
      >
    </span>
    <span v-if="$slots.default || label" class="w-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts">
/**
 * @Description 复选框组件
 * @Author: 南歌子
 * @Date 2021/4/6 15:02
 * @version V1.0.0
 *
 * Hello, humor
 */
import { defineComponent } from 'vue';
import { UPDATE_MODEL_EVENT } from "../_utils/constants";
import { useCheckbox } from './useCheckbox';

export default defineComponent({
  name: "WCheckbox",
  props: {
    modelValue: {
      type: [Boolean, Number, String],
      default: () => undefined,
    },
    label: {
      type: [Boolean, Number, String],
    },
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: {
      type: String,
      default: undefined,
    },
    trueLabel: {
      type: [String, Number],
      default: undefined,
    },
    falseLabel: {
      type: [String, Number],
      default: undefined,
    },
    id: {
      type: String,
      default: undefined,
    },
    controls: {
      type: String,
      default: undefined,
    }
  },
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props) {
    return useCheckbox(props)
  }
});
</script>

<style lang="scss" scoped>

</style>
