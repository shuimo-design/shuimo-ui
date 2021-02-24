<template>
  <button :class="['w-button', {'w-button-disabled': disabled}, `w-button-${type}`]" :disabled="disabled">
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

<style scoped>
.w-button {
  cursor: pointer;
  margin: 6px 0 0 10px;
  padding: 0 15px;
  height: 28px;
  border: unset;
  outline: unset;
  line-height: 28px;
  min-width: 70px;
  border: 3px double transparent;
  border-image: url("/lib/assets/button/button-border-blue.png") 10;
  color: #192F6F;
  text-align: center;
}

.w-button-disabled,
.w-button-gray {
  border-image: url("/lib/assets/button/button-border-gray.png") 10;
  color: #333333;
}

.w-button:disabled {
  cursor: not-allowed;
}
</style>
