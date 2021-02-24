<template>
  <button :class="['w-button cursor-brush', {'w-button-disabled': disabled}, `w-button-${type}`]" :disabled="disabled">
    {{ text }}
  </button>
</template>

<script>
/**
 * @description
 * @author higuaifan
 * @date 2020/11/18 22:26
 **/

export default {
  name: "WButton",
  props: {
    text: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'primary' }
  }
};
</script>
