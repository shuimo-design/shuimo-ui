<template>
  <label class="label-244">
    <input type="text" class="input-244" v-model="value"/>
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

.label-244 {
  display: inline-block;
  background-image: url("../assets/input/input244.png") !important;
  width: 244px;
  height: 31px;
}

.textarea {
  background-image: url("../assets/input/textarea.png") !important;
}


.input-244 {
  background-color: unset !important;
  background-repeat: no-repeat !important;
  padding: 0 10px;
  width: 224px;
  height: 31px;
  border: none !important;
  outline: none !important;
}
</style>
