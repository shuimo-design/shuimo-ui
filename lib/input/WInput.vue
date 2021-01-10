<template>
  <div :class="['w-input', {'w-textarea':type === 'textarea'}]">
    <input type="text" class="w-input-inner" v-model="value" v-if="type!=='textarea'"/>
    <textarea v-else class="w-textarea-inner" :rows="10" v-model="value"/>
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
    type: {type: String, default: 'text'},
    value: {type: null, default: ''}
  }
};
</script>

<style scoped lang="scss">

.w-input {
  border: 3px double transparent;
  border-image: url("/lib/assets/input/input244.png") 3;
  width: 244px;
  height: 31px;
}

.w-textarea {
  width: 244px;
  height: auto;
}


.w-input-inner {
  background-color: unset !important;
  background-repeat: no-repeat !important;
  padding: 0 10px;
  width: calc(100% - 20px);
  height: 100%;
  border: none !important;
  outline: none !important;
}
.w-textarea-inner {
  padding: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 20px);
  border: none !important;
  outline: none !important;
  resize: none;

  &::-webkit-scrollbar {
    width: 0px;
  }
}
</style>
