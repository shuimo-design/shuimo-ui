<template>
  <button class="w-button" :disabled="disabled">
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
    disabled: { type: Boolean, default: false }
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
  border-image: url("../assets/button/button-border-blue.png") 10;
  color: #192F6F;
  text-align: center;
}

.w-button:disabled {
  cursor: not-allowed;
}
</style>
