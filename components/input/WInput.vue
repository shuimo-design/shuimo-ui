<template>
  <label class="w-input-label">
    <input type="text" class="w-input" v-model="value"/>
  </label>
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
    type: {type: String, default: 'text'},
    value: {type: null, default: ''}
  }
};
</script>

<style scoped>

.w-input-label {
  display: inline-block;
  border: 3px double transparent;
  border-image: url("../assets/input/input244.png") 3;
  width: 244px;
  height: 31px;
}

.textarea {
  background-image: url("../assets/input/textarea.png") !important;
}


.w-input {
  background-color: unset !important;
  background-repeat: no-repeat !important;
  padding: 0 10px;
  width: 224px;
  height: 31px;
  border: none !important;
  outline: none !important;
}
</style>
