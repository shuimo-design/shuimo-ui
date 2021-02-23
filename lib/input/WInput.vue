<template>
  <div :class="['w-input', {'w-textarea':type === 'textarea'}]">
    <input v-if="type!=='textarea'"
           :type="type" class="w-input-inner"
           :value="modelValue"
           :placeholder="placeholder"
           @input="$emit('update:modelValue', $event.target.value)"/>
    <textarea v-else class="w-textarea-inner"
              :rows="10"
              :value="modelValue"
              :placeholder="placeholder"
              @input="$emit('update:modelValue', $event.target.value)"/>
  </div>
</template>

<script lang="ts">
/**
 * @description
 * @author higuaifan
 * @date 2020/11/17 22:03
 **/

export default {
  name: "WInput",
  props: {
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    modelValue: { type: null, default: '' }
  }
};
</script>

<style scoped lang="scss">
</style>
