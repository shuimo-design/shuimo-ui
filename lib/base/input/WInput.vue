<template>
  <WBorder :class="['w-input', {'w-textarea':type === 'textarea'}]">
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
  </WBorder>
</template>

<script lang="ts">
/**
 * @description
 * @author higuaifan
 * @date 2020/11/17 22:03
 **/
import WBorder from "../../other/border/WBorder";

export default {
  name: "WInput",
  components: { WBorder },
  props: {
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    modelValue: { type: null, default: '' }
  }
};

</script>
